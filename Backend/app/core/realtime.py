from collections import defaultdict
from fastapi import WebSocket


class ConnectionManager:
    def __init__(self) -> None:
        self.connections: dict[str, set[WebSocket]] = defaultdict(set)

    async def connect(self, room_id: str, websocket: WebSocket) -> None:
        await websocket.accept()
        self.connections[room_id].add(websocket)

    def disconnect(self, room_id: str, websocket: WebSocket) -> None:
        self.connections[room_id].discard(websocket)
        if not self.connections[room_id]:
            self.connections.pop(room_id, None)

    async def broadcast(self, room_id: str, event: dict) -> None:
        stale: list[WebSocket] = []
        for socket in self.connections.get(room_id, set()).copy():
            try:
                await socket.send_json(event)
            except Exception:
                stale.append(socket)
        for socket in stale:
            self.disconnect(room_id, socket)


manager = ConnectionManager()
