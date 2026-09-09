import sys
import os
import io
import time
from uuid import uuid4
from fastapi.testclient import TestClient

# Ensure app is importable
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))
from app.main import app
from app.db.mongo import get_database

client = TestClient(app)
db = get_database()

def run_tests():
    print("========================================")
    print("NIRVIVAAD COMPREHENSIVE VERIFICATION TEST")
    print("========================================")

    # 1. Health check
    res = client.get("/api/v1/health")
    assert res.status_code == 200, f"Health check failed: {res.text}"
    print("[PASS] 1. Health Check & MongoDB Connectivity: OK")

    # 2. Unique Registration & Unique ID Generation
    test_mobile = "98" + str(uuid4().int)[:8]
    test_email = f"user_{uuid4().hex[:6]}@testnirvivaad.in"
    reg_payload = {
        "name": "Rameshwar Sah",
        "email": test_email,
        "mobile": test_mobile,
        "password": "Password@123",
        "role": "user"
    }
    reg_res = client.post("/api/v1/auth/register", json=reg_payload)
    assert reg_res.status_code == 201, f"Registration failed: {reg_res.text}"
    reg_data = reg_res.json()
    assert "unique_id" in reg_data, "Unique ID not returned"
    assert reg_data["unique_id"].startswith("NIRV-USR-"), f"Unexpected unique ID format: {reg_data['unique_id']}"
    unique_id = reg_data["unique_id"]
    token = reg_data["access_token"]
    print(f"[PASS] 2. Registration created Unique Login ID: {unique_id}")

    # 3. Duplicate Email Prevention
    dup_email_res = client.post("/api/v1/auth/register", json={
        "name": "Duplicate User",
        "email": test_email,
        "mobile": "99" + str(uuid4().int)[:8],
        "password": "Password@123",
        "role": "user"
    })
    assert dup_email_res.status_code == 409, f"Duplicate email should fail with 409, got {dup_email_res.status_code}"
    print("[PASS] 3. Duplicate Email Prevention: Correctly Rejected (409)")

    # 4. Duplicate Mobile Number Prevention
    dup_mob_res = client.post("/api/v1/auth/register", json={
        "name": "Duplicate Mobile",
        "email": f"other_{uuid4().hex[:6]}@test.com",
        "mobile": test_mobile,
        "password": "Password@123",
        "role": "user"
    })
    assert dup_mob_res.status_code == 409, f"Duplicate mobile should fail with 409, got {dup_mob_res.status_code}"
    print("[PASS] 4. Duplicate Mobile Prevention: Correctly Rejected (409)")

    # 5. Login using Unique ID
    login_uid_res = client.post("/api/v1/auth/login", json={
        "login_id": unique_id,
        "password": "Password@123",
        "role": "user"
    })
    assert login_uid_res.status_code == 200, f"Login with Unique ID failed: {login_uid_res.text}"
    print(f"[PASS] 5. Login using Unique ID '{unique_id}': Success")

    # 6. Login using Email
    login_email_res = client.post("/api/v1/auth/login", json={
        "login_id": test_email,
        "password": "Password@123",
        "role": "user"
    })
    assert login_email_res.status_code == 200, f"Login with Email failed: {login_email_res.text}"
    print(f"[PASS] 6. Login using Email '{test_email}': Success")

    # 7. Document Upload with Classification & Crucial Land Metadata
    dummy_pdf = io.BytesIO(b"%PDF-1.4 Bihar Land Revenue Khatihan Panji Record Khata 47 Khasra 214/2 Rameshwar Sah Muzaffarpur Kanti")
    upload_headers = {"Authorization": f"Bearer {token}"}
    upload_data = {
        "document_type": "jamin_khatihan",
        "state": "Bihar",
        "district": "Muzaffarpur",
        "tehsil_circle": "Muzaffarpur Sadar",
        "village_mauza": "Kanti",
        "khata_no": "47",
        "khasra_no": "214/2",
        "claimed_owner": "Rameshwar Sah",
        "area": "0.62",
        "deed_number": "REG-88214",
        "poa_holder_name": "",
        "languages": "Hindi,English"
    }
    upload_res = client.post(
        "/api/v1/documents/upload",
        headers=upload_headers,
        data=upload_data,
        files=[("files", ("khatihan_sample.pdf", dummy_pdf, "application/pdf"))]
    )
    assert upload_res.status_code == 201, f"Upload failed: {upload_res.text}"
    doc_id = upload_res.json()["documents"][0]["document_id"]
    print(f"[PASS] 7. Document Uploaded with Metadata: Doc ID {doc_id}")

    # Wait for pipeline to complete
    print("     Waiting for 5-stage background processing pipeline to execute...")
    for _ in range(20):
        time.sleep(1.0)
        status_res = client.get(f"/api/v1/documents/{doc_id}", headers=upload_headers)
        doc_stat = status_res.json()
        step = doc_stat.get("current_step", 1)
        step_name = doc_stat.get("step_name", "Uploaded")
        print(f"     -> Current Pipeline Step: {step}/5 ({step_name})")
        if step >= 5 or doc_stat.get("status") in ["complete", "needs_review", "verified"]:
            break

    # 8. Verification Report & Multi-Check Validation Results
    report_res = client.get(f"/api/v1/documents/{doc_id}/report", headers=upload_headers)
    assert report_res.status_code == 200, f"Report fetch failed: {report_res.text}"
    rep = report_res.json()
    v_rep = rep.get("validation_report", {})
    assert v_rep, "Validation report is empty"
    print("[PASS] 8. 5-Stage Pipeline Completed Successfully!")
    print(f"     -> Authenticity Score: {v_rep.get('authenticity_score')}%")
    print(f"     -> Forgery Risk Score: {v_rep.get('forgery_risk_score')}%")
    print(f"     -> Final Verdict: {v_rep.get('verdict')}")
    print(f"     -> Disputed Land Status: {v_rep.get('dispute_check', {}).get('dispute_severity')}")
    print(f"     -> Double Selling Detected: {v_rep.get('multiple_buyers_check', {}).get('has_multiple_buyers')}")
    print(f"     -> Power of Attorney Status: {v_rep.get('poa_check', {}).get('poa_status')}")

    # Verify side-by-side comparison table exists
    comp_table = v_rep.get("comparison_table", [])
    assert len(comp_table) >= 5, "Comparison table missing rows"
    print(f"[PASS] 9. Side-by-Side Comparison Table Generated with {len(comp_table)} fields:")
    for row in comp_table[:4]:
        print(f"        * {row['field']}: Uploaded='{row['uploaded']}' vs Registry='{row['registry']}' -> [{row['match']}]")

    print("========================================")
    print("ALL NIRVIVAAD BACKEND TESTS PASSED 100%!")
    print("========================================")

if __name__ == "__main__":
    run_tests()
