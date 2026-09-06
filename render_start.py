import sys
from pathlib import Path

# Ensure repository root and Backend directory are both on sys.path for Render deployment
_root_dir = Path(__file__).resolve().parent
_backend_dir = _root_dir / "Backend"
for _p in (str(_root_dir), str(_backend_dir)):
    if _p not in sys.path:
        sys.path.insert(0, _p)

from Backend.app.main import app

