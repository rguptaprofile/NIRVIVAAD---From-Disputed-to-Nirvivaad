# `disputes` collection

```json
{
  "title": "Payment disagreement",
  "description": "Brief summary of the issue",
  "status": "open",
  "createdAt": "ISO-8601 datetime",
  "updatedAt": "ISO-8601 datetime"
}
```

Recommended index: `{ "status": 1, "createdAt": -1 }`.
