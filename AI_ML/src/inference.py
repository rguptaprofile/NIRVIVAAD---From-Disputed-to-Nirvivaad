def classify_text(text: str) -> dict[str, str]:
    """Temporary deterministic baseline; replace with a trained model."""
    if not text.strip():
        return {"label": "unknown", "reason": "No text supplied."}
    return {"label": "needs_review", "reason": "Model has not been trained yet."}
