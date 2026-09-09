from typing import Literal, Optional
from pydantic import BaseModel, EmailStr, Field

class LoginRequest(BaseModel):
    login_id: str = Field(min_length=3, max_length=120, description="Email address or Unique User ID (e.g. NIRV-USR-XXXXX)")
    password: str = Field(min_length=6, max_length=128)
    role: Literal['user', 'admin'] = 'user'

class RegisterRequest(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    mobile: str = Field(min_length=10, max_length=15, description="10-digit mobile number")
    password: str = Field(min_length=8, max_length=128)
    role: Literal['user', 'admin'] = 'user'
    admin_code: str = ''
    gov_amin_id: Optional[str] = Field(default='', description="Government Unique Amin ID for Admin/Revenue Officer verification")

class VerificationFlowRequest(BaseModel):
    api_key: Optional[str] = Field(default='NIRV-KEY-GOV-2026', description="API Key for verification")
    state: str = 'Bihar'
    district: str = 'Muzaffarpur'
    circle: str = 'Muzaffarpur Sadar'
    village: str = 'Kanti'
    khata_no: str = '47'
    khasra_no: str = '214/2'
    claimed_owner: Optional[str] = None
    claimed_area: Optional[str] = None
    document_type: Optional[str] = 'jamin_khatihan'

class DocumentUploadMetadata(BaseModel):
    document_type: str = 'jamin_khatihan'  # jamin_khatihan, jamin_rasid, power_of_attorney, kewala_registry, dakhil_kharij
    state: str = ''
    district: str = ''
    tehsil_circle: str = ''
    village_mauza: str = ''
    khata_no: str = ''
    khasra_no: str = ''
    claimed_owner: str = ''
    area: str = ''
    deed_number: str = ''
    poa_holder_name: str = ''

class VerificationDecision(BaseModel):
    decision: Literal['approve', 'reject']
    fields: dict[str, dict] = Field(default_factory=dict)
    reason: str = Field(min_length=2, max_length=500)
