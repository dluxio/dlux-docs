# DLUX Presence Infrastructure

DLUX Presence provides the backend infrastructure for networked VR and collaborative experiences. It runs at `presence.dlux.io` and includes STUN/TURN servers for WebRTC, Socket.IO signaling, and database integration.

## Architecture

```
Frontend (dlux-wallet) ◄──► data.dlux.io ◄──► presence.dlux.io
                             Main API         STUN/TURN + Socket.IO
```

### Services

- **Coturn Server**: STUN/TURN for WebRTC NAT traversal
- **Socket.IO API**: Real-time WebSocket communication  
- **Caddy Proxy**: Reverse proxy with automatic HTTPS
- **Database Replica**: Local PostgreSQL for performance
- **Redis Cache**: Session management

## WebRTC Infrastructure

**STUN/TURN Server (presence.dlux.io:3478/5349)**
```
stun:presence.dlux.io:3478    - STUN server
turn:presence.dlux.io:3478    - TURN UDP/TCP  
turns:presence.dlux.io:5349   - TURN over TLS
```

**Socket.IO Events:**
- `join-space` - Join content-based room
- `webrtc-offer/answer/ice-candidate` - WebRTC signaling
- `aframe-update` - VR entity synchronization
- `chat-message` - Real-time messaging

## API Endpoints

```
GET /api/spaces                    - List VR spaces
GET /api/spaces/{type}/{id}        - Get space details  
POST /api/spaces/{type}/{id}/join  - Join VR space
GET /api/turn-credentials          - WebRTC credentials
```

## Database Schema

**Core Tables:**
- `presence_sessions` - Active user sessions
- `presence_permissions` - Access control
- `presence_space_settings` - Room configuration
- `chat_messages` - Real-time messaging
- `presence_audit_log` - Activity logging

**Replicated Content:**
- `posts` - Hive posts as VR spaces
- `collaboration_documents` - Collaborative docs

## Configuration

**Environment Variables:**
```bash
DB_PRIMARY_HOST=data.dlux.io
DB_REPLICA_HOST=db_replica
REDIS_HOST=redis
TURN_SECRET=your_secret
DLUX_API_URL=https://data.dlux.io
```

## Deployment

```bash
# Deploy presence infrastructure
git clone https://github.com/dlux-io/presence.git
cd presence
cp .env.example .env
docker-compose up -d

# Verify
curl https://presence.dlux.io/api/health
```

## Integration

The presence infrastructure integrates with DLUX through:

1. **Auto-Injection**: `dlux-wallet.js` connects automatically
2. **Content-Based**: Rooms created from posts/documents  
3. **Shared Auth**: Uses DLUX Hive authentication
4. **Real-Time**: Socket.IO for live collaboration

See [Wallet Auto-Injection](./wallet-injection.md) for frontend integration.

## Troubleshooting

**TURN Server Issues:**
```bash
telnet presence.dlux.io 3478
docker-compose logs coturn
```

**Database Connection:**
```bash
docker-compose exec api node -e "require('./services/database').testConnection()"
```

**WebSocket Issues:**
```bash
curl -H "Connection: Upgrade" -H "Upgrade: websocket" https://presence.dlux.io/socket.io/
```

The DLUX Presence infrastructure provides scalable networking for VR and collaborative experiences. 