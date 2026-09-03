from Backend.app.services import deterministic_analysis


def classify_text(text: str) -> dict:
    """Run the shared, safe local dispute-analysis baseline."""
    return deterministic_analysis(text)
