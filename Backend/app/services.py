import re
from collections import Counter
from typing import Any
import httpx

# Supports direct diagnostics (`python Backend/app/services.py`) as well as
# normal package imports performed by FastAPI.
if __package__ in (None, ""):
    import sys
    from pathlib import Path

    sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
    from app.core.config import settings
else:
    from .core.config import settings


def deterministic_analysis(text: str) -> dict[str, Any]:
    lowered = text.lower()
    negative = [word for word in ("fraud", "cheat", "stolen", "threat", "never", "refuse", "breach") if word in lowered]
    words = re.findall(r"[a-zA-Z]{4,}", lowered)
    sentences = [value.strip() for value in re.split(r"(?<=[.!?])\\s+", text) if value.strip()]
    return {
        "label": "high_conflict" if len(negative) >= 2 else "needs_review" if negative else "constructive",
        "risk_flags": negative,
        "urgency_detected": any(word in lowered for word in ("urgent", "immediately", "today", "deadline")),
        "summary": " ".join(sentences[:2])[:700] or text[:700],
        "key_topics": [word for word, _ in Counter(words).most_common(5)],
        "suggested_next_steps": ["Confirm facts and documents.", "State acceptable outcomes.", "Assign an owner and due date for each agreement."],
        "provider": "local-deterministic",
    }


async def analyze_dispute_text(text: str, task: str) -> dict[str, Any]:
    """Use an optional hosted model, but preserve a private local fallback."""
    fallback = deterministic_analysis(text)
    if not settings.openai_api_key:
        fallback["task"] = task
        return fallback
    prompt = "Analyze this dispute neutrally. Return concise JSON with summary, key_topics, risk_flags, and suggested_next_steps. Do not provide legal advice.\n\n" + text
    try:
        async with httpx.AsyncClient(timeout=25) as client:
            response = await client.post(
                "https://api.openai.com/v1/responses",
                headers={"Authorization": f"Bearer {settings.openai_api_key}"},
                json={"model": settings.openai_model, "input": prompt, "text": {"format": {"type": "json_object"}}},
            )
            response.raise_for_status()
            output = response.json().get("output_text")
        import json
        hosted = json.loads(output) if output else {}
        return {**fallback, **hosted, "provider": "openai", "task": task}
    except Exception:
        fallback["task"] = task
        fallback["provider"] = "local-deterministic (hosted fallback)"
        return fallback
