# DLUX Wallet Auto-Injection

The DLUX wallet automatically injects networking capabilities into any post content through intelligent content detection. When visiting a post page (`/@author/permlink`), the wallet scans the content and provides appropriate networking features based on what it finds.

## Auto-Detection System

### Three Integration Modes

1. **Networked A-Frame (NAF)** - Existing A-Frame scenes with NAF get enhanced
2. **A-Frame Auto-Enhancement** - Basic A-Frame scenes get NAF added automatically  
3. **Generic Room API** - Any application gets universal networking capabilities

### Detection Process

```javascript
// 1. Extract post context from URL
const postMatch = window.location.pathname.match(/\/@([^\/]+)\/([^\/]+)/);
const [, author, permlink] = postMatch;

// 2. Scan page content
const aframeScene = document.querySelector('a-scene');
const hasNetworkedScene = aframeScene?.hasAttribute('networked-scene');

// 3. Apply appropriate integration
if (hasNetworkedScene) {
  enhanceExistingNAF(aframeScene, author, permlink);
} else if (aframeScene) {
  autoEnhanceAFrame(aframeScene, author, permlink);
} else {
  exposeGenericRoomAPI(author, permlink);
}
```

## Room API (`window.dluxRoom`)

Universal networking API available in all posts:

```javascript
// Room identification
dluxRoom.author        // "disregardfiat"
dluxRoom.permlink      // "my-awesome-post"
dluxRoom.roomId        // "disregardfiat/my-awesome-post:main"
dluxRoom.subspace      // "main" (default)

// Connection management
dluxRoom.connected     // Boolean connection status
dluxRoom.socket        // WebSocket connection

// Event system
dluxRoom.on(event, callback)
dluxRoom.off(event, callback) 
dluxRoom.emit(event, data)

// Messaging
dluxRoom.send(message)

// Sub-rooms
dluxRoom.joinSubRoom(name)
dluxRoom.getAvailableSubRooms()

// WebRTC
dluxRoom.getWebRTCCredentials()
```

## Sub-Room Architecture

### Main Room
Every post gets a default main room: `author/permlink:main`

### Sub-Rooms
Create specialized rooms for different features:

```javascript
// Chess game sub-room
const chessRoom = await dluxRoom.joinSubRoom('chess-game1');
// Full ID: "author/permlink:main-chess-game1"

// Private chat sub-room  
const privateChat = await dluxRoom.joinSubRoom('private-alice-bob');
// Full ID: "author/permlink:main-private-alice-bob"

// Listening room sub-room
const musicRoom = await dluxRoom.joinSubRoom('listen-music');
// Full ID: "author/permlink:main-listen-music"
```

## A-Frame Integration

### Auto-Enhancement Process

When basic A-Frame is detected:

1. **Load NAF Library** - Inject networked-aframe.js
2. **Add Default Avatar** - Create avatar template
3. **Enhance Camera** - Add networking to camera entity
4. **Configure Scene** - Set up networked-scene attributes
5. **Connect to Server** - Auto-connect to presence.dlux.io

### Enhanced Scene Example

```html
<!-- Before: Basic A-Frame -->
<a-scene>
  <a-entity camera wasd-controls look-controls></a-entity>
  <a-box position="0 1 -5" color="red"></a-box>
</a-scene>

<!-- After: Auto-Enhanced -->
<a-scene networked-scene="app:dlux-vr;room:author-permlink-main">
  <a-assets>
    <template id="avatar-template">
      <a-entity class="avatar">
        <a-sphere class="head" color="#5985ff" scale="0.45 0.5 0.38"></a-sphere>
        <a-cylinder class="body" color="#5985ff" scale="0.25 0.7 0.25"></a-cylinder>
        <a-text class="nametag" align="center" position="0 2.2 0"></a-text>
      </a-entity>
    </template>
  </a-assets>
  
  <a-entity camera wasd-controls look-controls 
            networked="template:#avatar-template;attachTemplateToLocal:false">
  </a-entity>
  
  <a-box position="0 1 -5" color="red" networked></a-box>
</a-scene>
```

### Custom Override

Provide your own templates to override defaults:

```html
<a-scene>
  <a-assets>
    <!-- Your custom avatar overrides default -->
    <template id="avatar-template">
      <a-gltf-model src="#my-avatar-model"></a-gltf-model>
    </template>
  </a-assets>
  
  <a-entity camera networked="template:#avatar-template"></a-entity>
</a-scene>
```

## Application Examples

### Real-Time Chat

```html
<div id="chat-container">
  <div id="messages"></div>
  <input id="message-input" placeholder="Type message...">
  <button onclick="sendMessage()">Send</button>
</div>

<script>
window.addEventListener('vr:generic_room_ready', (event) => {
  const { roomAPI } = event.detail;
  
  // Listen for chat messages
  roomAPI.on('chat-message', (event) => {
    const { user, message, timestamp } = event.detail;
    displayMessage(user, message, timestamp);
  });
});

function sendMessage() {
  const input = document.getElementById('message-input');
  const message = input.value.trim();
  
  if (message) {
    dluxRoom.send({
      type: 'chat-message',
      user: dluxRoom.author,
      message: message,
      timestamp: Date.now()
    });
    
    input.value = '';
  }
}
</script>
```

### Collaborative Canvas

```html
<canvas id="canvas" width="800" height="600"></canvas>
<div id="tools">
  <input type="color" id="color" value="#000000">
  <input type="range" id="size" min="1" max="50" value="5">
</div>

<script>
window.addEventListener('vr:generic_room_ready', (event) => {
  const { roomAPI } = event.detail;
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  
  // Receive drawing data
  roomAPI.on('draw-data', (event) => {
    const { x, y, color, size } = event.detail;
    drawPoint(ctx, x, y, color, size);
  });
  
  // Send drawing data
  canvas.addEventListener('mousemove', (e) => {
    if (e.buttons === 1) { // Left mouse button
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      roomAPI.send({
        type: 'draw-data',
        x: x,
        y: y,
        color: document.getElementById('color').value,
        size: document.getElementById('size').value
      });
    }
  });
});
</script>
```

### Multi-Player Game

```html
<canvas id="game-canvas" width="800" height="600"></canvas>
<div id="game-ui">
  <div id="player-list"></div>
  <div id="score">Score: <span id="score-value">0</span></div>
</div>

<script>
let players = {};
let localPlayer = { x: 400, y: 300, score: 0 };

window.addEventListener('vr:generic_room_ready', (event) => {
  const { roomAPI } = event.detail;
  
  // Player movements
  roomAPI.on('player-move', (event) => {
    const { user, x, y } = event.detail;
    if (user !== roomAPI.author) {
      players[user] = { x, y };
      updateGameDisplay();
    }
  });
  
  // Score updates
  roomAPI.on('score-update', (event) => {
    const { user, score } = event.detail;
    players[user].score = score;
    updatePlayerList();
  });
  
  // Game input
  document.addEventListener('keydown', (e) => {
    let moved = false;
    
    switch(e.code) {
      case 'ArrowUp': localPlayer.y -= 10; moved = true; break;
      case 'ArrowDown': localPlayer.y += 10; moved = true; break;
      case 'ArrowLeft': localPlayer.x -= 10; moved = true; break;
      case 'ArrowRight': localPlayer.x += 10; moved = true; break;
    }
    
    if (moved) {
      roomAPI.send({
        type: 'player-move',
        user: roomAPI.author,
        x: localPlayer.x,
        y: localPlayer.y
      });
      
      updateGameDisplay();
    }
  });
});

function updateGameDisplay() {
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw local player
  ctx.fillStyle = 'blue';
  ctx.fillRect(localPlayer.x - 10, localPlayer.y - 10, 20, 20);
  
  // Draw other players
  ctx.fillStyle = 'red';
  Object.values(players).forEach(player => {
    ctx.fillRect(player.x - 10, player.y - 10, 20, 20);
  });
}
</script>
```

## WebRTC Voice Integration

Voice communication is automatically available:

```javascript
window.addEventListener('vr:generic_room_ready', async (event) => {
  const { roomAPI } = event.detail;
  
  // Get WebRTC credentials
  const credentials = await roomAPI.getWebRTCCredentials();
  
  // Set up peer connection
  const peerConnection = new RTCPeerConnection({
    iceServers: [
      { urls: 'stun:presence.dlux.io:3478' },
      {
        urls: 'turn:presence.dlux.io:3478',
        username: credentials.username,
        credential: credentials.credential
      }
    ]
  });
  
  // Add local audio stream
  const stream = await navigator.mediaDevices.getUserMedia({ 
    audio: true, 
    video: false 
  });
  
  stream.getTracks().forEach(track => {
    peerConnection.addTrack(track, stream);
  });
  
  // Handle remote audio streams
  peerConnection.ontrack = (event) => {
    const remoteAudio = document.createElement('audio');
    remoteAudio.srcObject = event.streams[0];
    remoteAudio.autoplay = true;
    document.body.appendChild(remoteAudio);
  };
});
```

## Events Reference

### Connection Events
- `vr:generic_room_ready` - Room API is available
- `vr:aframe_enhanced` - A-Frame scene enhanced with NAF
- `vr:naf_ready` - NAF connection established

### Room Events
- `connected` - Connected to room
- `disconnected` - Disconnected from room
- `user-joined` - User joined room
- `user-left` - User left room
- `message` - Message received
- `error` - Connection error

### Custom Events
Any event type can be sent/received:
```javascript
// Send custom event
dluxRoom.send({
  type: 'custom-event',
  data: { /* any data */ }
});

// Listen for custom event
dluxRoom.on('custom-event', (event) => {
  console.log('Custom event:', event.detail);
});
```

## Best Practices

### 1. Wait for Ready Events

```javascript
function initializeApp() {
  if (window.dluxRoom) {
    setupNetworking();
  } else {
    window.addEventListener('vr:generic_room_ready', setupNetworking);
  }
}

document.addEventListener('DOMContentLoaded', initializeApp);
```

### 2. Handle Disconnections

```javascript
dluxRoom.on('disconnected', () => {
  // Show offline indicator
  document.getElementById('status').textContent = 'Offline';
  
  // Attempt reconnection
  setTimeout(() => {
    if (!dluxRoom.connected) {
      dluxRoom.socket.reconnect();
    }
  }, 5000);
});
```

### 3. Validate Messages

```javascript
dluxRoom.on('message', (event) => {
  const message = event.detail;
  
  // Validate required fields
  if (!message.type || !message.user) {
    console.warn('Invalid message:', message);
    return;
  }
  
  // Check timestamp (prevent old messages)
  if (Date.now() - message.timestamp > 30000) {
    console.warn('Old message discarded:', message);
    return;
  }
  
  // Process valid message
  handleMessage(message);
});
```

### 4. Clean Up Resources

```javascript
window.addEventListener('beforeunload', () => {
  if (dluxRoom?.connected) {
    dluxRoom.disconnect();
  }
});
```

## Troubleshooting

### Common Issues

**Room API Not Available**
- Check if on valid post page (`/@author/permlink`)
- Verify network connectivity
- Wait for `vr:generic_room_ready` event

**A-Frame Not Enhanced**
- Ensure `<a-scene>` exists before wallet loads
- Check browser console for errors
- Verify scene is visible

**Voice Chat Not Working**
- Check microphone permissions
- Verify HTTPS (required for WebRTC)
- Test TURN connectivity

### Debug Information

```javascript
// Check room status
console.log('Room ID:', dluxRoom?.roomId);
console.log('Connected:', dluxRoom?.connected);
console.log('Socket state:', dluxRoom?.socket?.readyState);

// Monitor all events
dluxRoom.on('*', (event) => {
  console.log('Room event:', event.type, event.detail);
});
```

The DLUX wallet auto-injection system provides seamless networking capabilities to any post content, enabling rich collaborative experiences without manual setup or external dependencies. 