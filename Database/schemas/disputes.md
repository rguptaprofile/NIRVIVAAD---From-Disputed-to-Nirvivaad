# `disputes` collection

```json
{
  "title": "Payment disagreement",
  "description": "Brief summary of the issue",
  "status": "open",
  "created_by": "user ObjectId as string",
  "participant_ids": ["user ObjectId as string"],
  "category": "general",
  "created_at": "ISO-8601 datetime",
  "updated_at": "ISO-8601 datetime"
}
```

Recommended index: `{ "status": 1, "createdAt": -1 }`.
