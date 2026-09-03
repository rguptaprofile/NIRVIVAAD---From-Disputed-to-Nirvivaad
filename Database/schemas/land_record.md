# Land record collections

MongoDB collections: `users`, `documents`, `ocr_results`, `land_records`, `validations`, `verification_tasks`, `feedback`, `audit_logs`, `gis_parcels`, and `reference_land_data`.

`land_records` stores `record_id`, `document_id`, searchable fields, per-field `{value, confidence, page, bbox, model_version}` evidence, lifecycle status, and timestamps. Every review decision saves before/after values in `feedback` and adds an immutable audit event.
