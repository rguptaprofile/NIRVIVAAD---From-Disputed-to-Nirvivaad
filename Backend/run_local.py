"""Local API launcher. Set PORT=8001 if port 8000 is occupied."""
import os
import uvicorn
if __name__ == '__main__': uvicorn.run('app.main:app', host='127.0.0.1', port=int(os.getenv('PORT','8000')), reload=True)
