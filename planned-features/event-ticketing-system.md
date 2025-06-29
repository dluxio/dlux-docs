# DLUX Event Ticketing System - Planning Document

**Status:** 🚧 **PLANNED FEATURE** - Not yet implemented  
**Target Release:** TBD  
**Priority:** High  
**Complexity:** High  

## Overview

A comprehensive event ticketing system that allows Premium+ subscribers to create and sell tickets to VR events/spaces. The system will support multi-cryptocurrency payments, take a 20% platform commission, and provide secure wallet-based access control.

## Business Model

### Revenue Generation
- **20% platform commission** on all ticket sales
- Available to **Premium, Pro subscribers only** (drives subscription upgrades)
- Multi-crypto support increases payment accessibility
- Leverages existing crypto monitoring infrastructure

### Value Proposition
- **For Event Creators:** Monetize VR events, global crypto audience
- **For Attendees:** Secure, verifiable ticket ownership via blockchain
- **For Platform:** New revenue stream, increased subscription value

## Core Features

### 1. Event Management System
```
Premium subscribers can:
- Create ticketed events/spaces
- Set ticket prices (any supported crypto)
- Configure event capacity and duration
- Manage attendee lists
- Generate event analytics
```

### 2. Multi-Cryptocurrency Payment Processing
```
Supported Payment Methods:
- HIVE/HBD (existing infrastructure)
- Bitcoin (BTC)
- Ethereum (ETH) 
- Solana (SOL)
- Polygon (MATIC)
- BNB Chain (BNB)
- Monero (XMR)
- Any crypto from existing account creation system
```

### 3. Wallet-Based Access Control
```
Security Features:
- Ticket purchase creates cryptographic proof
- Access requires signature from purchasing wallet
- No account creation required for buyers
- Prevents ticket fraud/resale
```

### 4. Event Discovery & Marketplace
```
Public Features:
- Browse upcoming events
- Filter by category, price, date
- Event previews and descriptions
- Creator profiles and ratings
```

## Technical Architecture

### Database Schema Extensions

#### Events Table
```sql
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    creator_account VARCHAR(50) NOT NULL, -- Must be Premium+
    title VARCHAR(255) NOT NULL,
    description TEXT,
    space_type VARCHAR(50) NOT NULL, -- 'post', 'document', 'custom'
    space_id VARCHAR(255) NOT NULL,
    
    -- Ticket Configuration
    ticket_price_crypto DECIMAL(18,8) NOT NULL,
    ticket_currency VARCHAR(10) NOT NULL, -- 'HIVE', 'BTC', 'ETH', etc.
    max_attendees INTEGER,
    tickets_sold INTEGER DEFAULT 0,
    
    -- Event Timing
    event_start TIMESTAMP WITH TIME ZONE NOT NULL,
    event_end TIMESTAMP WITH TIME ZONE NOT NULL,
    sales_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    sales_end TIMESTAMP WITH TIME ZONE,
    
    -- Event Settings
    require_camera BOOLEAN DEFAULT false,
    require_microphone BOOLEAN DEFAULT false,
    age_restriction INTEGER, -- 13+, 18+, etc.
    event_category VARCHAR(50),
    
    -- Status
    status VARCHAR(20) DEFAULT 'active', -- 'active', 'cancelled', 'completed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Ticket Sales Table
```sql
CREATE TABLE ticket_sales (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events(id),
    
    -- Payment Details
    transaction_id VARCHAR(255) UNIQUE NOT NULL,
    buyer_wallet_address VARCHAR(255) NOT NULL,
    crypto_type VARCHAR(10) NOT NULL,
    amount_paid DECIMAL(18,8) NOT NULL,
    platform_commission DECIMAL(18,8) NOT NULL, -- 20% of amount_paid
    creator_payout DECIMAL(18,8) NOT NULL, -- 80% of amount_paid
    
    -- Ticket Details
    ticket_token VARCHAR(255) UNIQUE NOT NULL, -- Cryptographic ticket ID
    access_signature TEXT, -- Signed by our system
    
    -- Usage Tracking
    first_access_at TIMESTAMP WITH TIME ZONE,
    total_access_count INTEGER DEFAULT 0,
    last_access_at TIMESTAMP WITH TIME ZONE,
    
    -- Status
    status VARCHAR(20) DEFAULT 'valid', -- 'valid', 'used', 'refunded', 'cancelled'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Event Attendance Tracking
```sql
CREATE TABLE event_attendance (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events(id),
    ticket_id INTEGER REFERENCES ticket_sales(id),
    wallet_address VARCHAR(255) NOT NULL,
    
    -- Presence Tracking
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    left_at TIMESTAMP WITH TIME ZONE,
    total_duration_minutes INTEGER,
    
    -- Interaction Data
    chat_messages_sent INTEGER DEFAULT 0,
    voice_time_minutes INTEGER DEFAULT 0,
    screen_shared BOOLEAN DEFAULT false
);
```

### Payment Processing Integration

#### Extended Crypto Monitor
```javascript
// Extend existing crypto monitoring for event payments
class EventPaymentMonitor extends CryptoMonitor {
  async handleEventPayment(cryptoType, transaction) {
    // 1. Validate transaction amount
    // 2. Verify event exists and has capacity
    // 3. Generate unique ticket token
    // 4. Calculate 20% platform commission
    // 5. Create ticket record
    // 6. Send access credentials to buyer
    // 7. Schedule creator payout (minus commission)
  }
  
  async validateEventPurchase(eventId, amount, currency) {
    // Check event availability, pricing, capacity
  }
  
  async generateTicketToken(eventId, walletAddress, transactionId) {
    // Create cryptographically secure ticket identifier
  }
}
```

#### Multi-Crypto Memo Parsing
```javascript
// Extended memo format for event purchases
// Format: "event:{eventId}:wallet:{address}"
// Example: "event:123:wallet:bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"

parseMemo(memo) {
  const eventMatch = memo.match(/event:(\d+):wallet:([a-zA-Z0-9]+)/);
  if (eventMatch) {
    return {
      type: 'event_purchase',
      eventId: eventMatch[1],
      walletAddress: eventMatch[2]
    };
  }
  // ... existing subscription parsing
}
```

### Access Control System

#### Ticket Verification API
```javascript
// New API endpoints for event access
app.post('/api/events/:eventId/verify-access', async (req, res) => {
  const { walletAddress, signature, timestamp } = req.body;
  
  // 1. Verify wallet signature
  // 2. Check ticket validity
  // 3. Verify event timing
  // 4. Grant/deny access
  // 5. Log attendance
});

app.get('/api/events/:eventId/attendees', async (req, res) => {
  // Return current attendee list for event creators
});
```

#### Wallet Signature Verification
```javascript
// Support multiple wallet signature formats
class WalletVerifier {
  async verifySignature(walletAddress, signature, message, cryptoType) {
    switch (cryptoType) {
      case 'BTC': return this.verifyBitcoinSignature(walletAddress, signature, message);
      case 'ETH': return this.verifyEthereumSignature(walletAddress, signature, message);
      case 'SOL': return this.verifySolanaSignature(walletAddress, signature, message);
      // ... other crypto types
    }
  }
}
```

### Event Creator Dashboard

#### Creator Analytics
```javascript
// New admin component for event creators
class EventCreatorDashboard {
  async loadEventStats(creatorAccount) {
    // - Total events created
    // - Total tickets sold
    // - Total revenue (after commission)
    // - Upcoming events
    // - Event performance metrics
  }
  
  async loadAttendeeAnalytics(eventId) {
    // - Real-time attendance
    // - Geographic distribution
    // - Engagement metrics
    // - Revenue breakdown
  }
}
```

## User Experience Flows

### Event Creator Flow
```
1. Premium+ user navigates to "Create Event"
2. Selects VR space (existing post/document or custom)
3. Configures event details:
   - Title, description, category
   - Date/time and duration
   - Ticket price and currency
   - Capacity limits
   - Access requirements
4. Publishes event to marketplace
5. Receives real-time analytics
6. Manages attendees during event
7. Receives payout (80% of revenue)
```

### Ticket Buyer Flow
```
1. Browses event marketplace (no account required)
2. Selects event and clicks "Buy Ticket"
3. Chooses payment cryptocurrency
4. Sends payment to generated address with memo
5. Receives ticket confirmation with access token
6. At event time, signs message with purchasing wallet
7. Gains access to VR event space
8. Enjoys event with verified attendee status
```

### Event Attendance Flow
```
1. User clicks event access link
2. System prompts for wallet signature
3. Verifies ticket ownership and validity
4. Grants access to VR space
5. Tracks attendance and engagement
6. Optional: Provides event completion certificate
```

## Platform Commission System

### Revenue Distribution
```
Ticket Sale: $100 USD equivalent in crypto
├── Platform Commission (20%): $20
├── Creator Payout (80%): $80
└── Transaction fees: Deducted from platform commission
```

### Commission Processing
```javascript
// Automated commission calculation
class CommissionProcessor {
  calculateCommission(ticketPrice, currency) {
    const platformCommission = ticketPrice * 0.20;
    const creatorPayout = ticketPrice * 0.80;
    
    return {
      platformCommission,
      creatorPayout,
      currency
    };
  }
  
  async scheduleCreatorPayout(eventId, delayDays = 7) {
    // Schedule delayed payout to handle refunds
  }
}
```

## Implementation Phases

### Phase 1: Core Infrastructure (4-6 weeks)
- [ ] Database schema creation
- [ ] Extended crypto payment monitoring
- [ ] Basic event CRUD operations
- [ ] Ticket generation system
- [ ] Wallet signature verification

### Phase 2: Event Management (3-4 weeks)
- [ ] Event creator dashboard
- [ ] Event marketplace/discovery
- [ ] Ticket purchase workflow
- [ ] Access control integration
- [ ] Basic analytics

### Phase 3: Advanced Features (3-4 weeks)
- [ ] Multi-crypto support expansion
- [ ] Advanced event settings
- [ ] Attendee interaction tracking
- [ ] Revenue analytics
- [ ] Commission automation

### Phase 4: Polish & Optimization (2-3 weeks)
- [ ] UI/UX improvements
- [ ] Performance optimization
- [ ] Security audits
- [ ] Integration testing
- [ ] Documentation

## Technical Challenges & Solutions

### Challenge 1: Multi-Crypto Signature Verification
**Problem:** Different blockchains use different signature formats  
**Solution:** Implement wallet-specific verification adapters

### Challenge 2: Real-time Event Capacity Management
**Problem:** Preventing overselling of limited tickets  
**Solution:** Database locks and atomic ticket allocation

### Challenge 3: Cross-Chain Payment Confirmation
**Problem:** Different confirmation times across blockchains  
**Solution:** Blockchain-specific confirmation requirements

### Challenge 4: Event Access Security
**Problem:** Preventing unauthorized access with stolen credentials  
**Solution:** Time-limited signatures and wallet ownership verification

## Integration Points

### Existing Systems Integration
- **Subscription System:** Verify Premium+ status for event creation
- **Presence System:** Track event attendance in VR spaces
- **Crypto Monitoring:** Extend existing payment infrastructure
- **Admin Panel:** Add event management to subscription dashboard

### External Dependencies
- **Crypto Libraries:** Bitcoin, Ethereum, Solana signature verification
- **Payment Monitoring:** Extend existing blockchain watchers
- **VR Presence:** Integrate with presence.dlux.io for event hosting

## Security Considerations

### Payment Security
- Multi-signature validation for large events
- Commission escrow to prevent disputes
- Refund mechanisms for cancelled events

### Access Control
- Time-based signature validation
- Rate limiting for access attempts
- Audit logging for all event access

### Data Privacy
- Minimal data collection from ticket buyers
- GDPR compliance for EU attendees
- Optional anonymized attendance tracking

## Success Metrics

### Business Metrics
- **Commission Revenue:** Target $X,XXX monthly from 20% fees
- **Subscription Upgrades:** Premium+ subscriber growth
- **Event Volume:** Number of events created monthly
- **Ticket Sales:** Total tickets sold across platform

### Technical Metrics
- **Payment Success Rate:** >99% successful crypto payments
- **Access Reliability:** >99.9% successful event access
- **System Performance:** <2s event access verification
- **Security Incidents:** Zero unauthorized access events

## Future Enhancements

### Advanced Features (Future Phases)
- **NFT Ticket Integration:** Tickets as tradeable NFTs
- **Event Recording:** Save and replay VR events
- **Tiered Ticketing:** VIP/General admission levels
- **Event Sponsorship:** Branded VR spaces and advertising
- **Creator Subscriptions:** Monthly access to creator's events

### Monetization Expansions
- **Event Promotion:** Paid featured event listings
- **Creator Tools:** Premium analytics and marketing tools
- **Corporate Events:** Enterprise pricing for large events
- **Event Insurance:** Protection against technical failures

## Risk Assessment

### High Risk
- **Crypto Payment Failures:** Mitigated by existing infrastructure
- **Wallet Signature Complexity:** Mitigated by gradual crypto rollout
- **Event Access Security:** Mitigated by robust verification system

### Medium Risk
- **Market Adoption:** Mitigated by Premium+ subscriber targeting
- **Scalability Concerns:** Mitigated by proven infrastructure
- **Regulatory Compliance:** Mitigated by existing crypto compliance

### Low Risk
- **Technical Implementation:** Leverages existing systems
- **User Experience:** Builds on proven VR platform
- **Revenue Model:** Established commission-based approach

## Conclusion

The Event Ticketing System represents a significant monetization opportunity that leverages DLUX's existing crypto infrastructure and VR platform. By targeting Premium+ subscribers, it provides additional value that justifies higher subscription tiers while creating a new revenue stream through platform commissions.

The phased implementation approach allows for iterative development and risk mitigation, while the integration with existing systems minimizes technical complexity. Success in this feature could position DLUX as the leading platform for crypto-native VR events.

**Next Steps:**
1. Stakeholder review and approval
2. Technical architecture deep-dive
3. Resource allocation and timeline finalization
4. Phase 1 development kickoff

## Implementation Examples

### Using the Event Ticketing API

#### 1. Basic Event Discovery (dlux-wallet.js)
```javascript
// Show VR presence in navigation
await dluxWallet.requestVRPresence('event-browser');

// Get available events
const events = await dluxWallet.getAvailableEvents({
  limit: 20,
  upcoming: true
});

console.log('Available events:', events);
```

#### 2. Purchase Event Ticket with Crypto
```javascript
// Purchase ticket with Ethereum
const eventId = 'premium-concert-2024';
const paymentMethod = 'eth';
const walletAddress = '0x742d35Cc6C4b35F41a5F89b2A9d0a7C97EfE5b2d';

try {
  const paymentData = await dluxWallet.purchaseEventTicket(
    eventId, 
    paymentMethod, 
    walletAddress
  );
  
  console.log('Payment instructions:', paymentData);
  // Shows: Send 0.05 ETH to address with specific memo
  
} catch (error) {
  console.error('Ticket purchase failed:', error);
}
```

#### 3. Join Event with Ticket Verification
```javascript
// Sign access message with Ethereum wallet
const accessMessage = `Access event ${eventId} at ${Date.now()}`;
const signResult = await dluxWallet.signWithWallet(accessMessage, 'ethereum');

// Join the event
try {
  const joinData = await dluxWallet.joinEvent(
    eventId,
    signResult.address,
    signResult.signature
  );
  
  console.log('Joined event successfully:', joinData);
  // Returns WebRTC credentials and websocket URL
  
} catch (error) {
  console.error('Event join failed:', error);
}
```

#### 4. VR Presence Integration
```javascript
// App requests VR presence when needed
window.addEventListener('load', async () => {
  // Check if this page has VR content or events
  const hasVRContent = document.querySelector('a-scene') || 
                       document.querySelector('[data-vr-event]');
  
  if (hasVRContent) {
    // Show VR presence in navigation
    await dluxWallet.requestVRPresence('vr-content-detected');
  }
});

// Hide VR presence when leaving
window.addEventListener('beforeunload', () => {
  dluxWallet.hideVRPresence('page-unload');
});
```

### Backend API Integration

#### Event Creation (Premium+ Users)
```javascript
// Create new ticketed event
POST /api/events/create
Headers: {
  'Authorization': 'Bearer signature:username',
  'Content-Type': 'application/json'
}
Body: {
  "title": "Premium VR Concert",
  "description": "Exclusive VR music experience",
  "space_type": "post",
  "space_id": "artist/concert-2024",
  "ticket_price": 25.00,
  "ticket_currency": "USD",
  "max_attendees": 500,
  "event_start": "2024-12-31T20:00:00Z",
  "event_end": "2024-12-31T23:00:00Z",
  "supported_crypto": ["HIVE", "BTC", "ETH", "SOL"]
}
```

#### Payment Processing
```javascript
// Generate payment address for ticket purchase
POST /api/events/purchase
Body: {
  "event_id": "premium-concert-2024",
  "payment_method": "btc",
  "wallet_address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  "user_account": "username"
}

Response: {
  "payment_address": "bc1q...",
  "amount": "0.001",
  "currency": "BTC",
  "memo": "event:premium-concert-2024:wallet:bc1qxy2...",
  "expires_at": "2024-12-31T19:00:00Z"
}
```

#### Access Verification
```javascript
// Verify ticket ownership and grant access
POST /api/events/premium-concert-2024/join
Body: {
  "wallet_address": "0x742d35Cc6C4b35F41a5F89b2A9d0a7C97EfE5b2d",
  "signature": "0x1b5e8d0a0cb146d2de0714a72da10ce...",
  "timestamp": 1640995200000
}

Response: {
  "access_granted": true,
  "websocket_url": "wss://presence.dlux.io/event/premium-concert-2024",
  "turn_credentials": {
    "username": "event_user_123",
    "credential": "temp_pass_456"
  },
  "session_token": "jwt_token_here"
}
```

### Frontend Integration Example

#### Event Listing Component
```javascript
class EventBrowser {
  async loadEvents() {
    // Request VR presence display
    await dluxWallet.requestVRPresence('event-browser');
    
    try {
      const events = await dluxWallet.getAvailableEvents();
      this.displayEvents(events);
    } catch (error) {
      console.error('Failed to load events:', error);
    }
  }
  
  async purchaseTicket(event, paymentMethod) {
    try {
      // Get user's wallet address based on payment method
      let walletAddress;
      if (paymentMethod === 'eth') {
        const ethResult = await dluxWallet.signWithWallet('get_address', 'ethereum');
        walletAddress = ethResult.address;
      }
      
      // Generate payment
      const payment = await dluxWallet.purchaseEventTicket(
        event.id, paymentMethod, walletAddress
      );
      
      // Show payment instructions to user
      this.showPaymentModal(payment);
      
    } catch (error) {
      this.showError('Ticket purchase failed: ' + error.message);
    }
  }
  
  async joinEvent(event) {
    try {
      // Sign access message
      const message = `Access ${event.id} at ${Date.now()}`;
      const signature = await dluxWallet.signWithWallet(message, 'ethereum');
      
      // Join event
      const joinData = await dluxWallet.joinEvent(
        event.id, signature.address, signature.signature
      );
      
      // Open VR interface
      this.openVRInterface(joinData);
      
    } catch (error) {
      this.showError('Failed to join event: ' + error.message);
    }
  }
}
```

### A-Frame VR Integration

#### Ticketed VR Event Scene
```html
<!DOCTYPE html>
<html>
<head>
  <title>Premium VR Concert</title>
  <script src="https://aframe.io/releases/1.4.0/aframe.min.js"></script>
  <script src="/js/dlux-wallet.js"></script>
</head>
<body>
  <a-scene 
    networked-scene="
      adapter: wseasyrtc;
      audio: true;
      video: false;
    "
    data-vr-event="premium-concert-2024"
  >
    <!-- VR scene content -->
    <a-sky src="/assets/concert-venue.jpg"></a-sky>
    
    <!-- Event-specific content only visible to ticket holders -->
    <a-entity id="premium-content" visible="false">
      <a-entity gltf-model="/assets/stage.glb" position="0 0 -10"></a-entity>
      <a-entity gltf-model="/assets/artist.glb" position="0 1.6 -8"></a-entity>
    </a-entity>
    
    <!-- Players/avatars -->
    <a-entity id="player" 
      camera 
      look-controls 
      wasd-controls
      networked="template:#avatar-template;attachTemplateToLocal:false;"
    ></a-entity>
  </a-scene>

  <script>
    // Auto-request VR presence and verify event access
    window.addEventListener('load', async () => {
      try {
        // Show VR presence in nav
        await dluxWallet.requestVRPresence('vr-event');
        
        // Get event ID from page
        const eventId = document.querySelector('[data-vr-event]')
                               .getAttribute('data-vr-event');
        
        // Check if user has access
        const urlParams = new URLSearchParams(window.location.search);
        const walletAddress = urlParams.get('wallet');
        const signature = urlParams.get('signature');
        
        if (walletAddress && signature) {
          // Join event with existing credentials
          const joinData = await dluxWallet.joinEvent(eventId, walletAddress, signature);
          
          // Show premium content
          document.getElementById('premium-content').setAttribute('visible', true);
          
          // Connect to event audio/video streams
          setupEventStreams(joinData);
          
        } else {
          // Redirect to purchase/authentication
          window.location.href = `/events/${eventId}`;
        }
        
      } catch (error) {
        console.error('Event access failed:', error);
        showAccessDenied();
      }
    });
    
    function setupEventStreams(joinData) {
      // Setup audio streaming for event
      const audioContext = new AudioContext();
      // Connect to event audio stream using joinData.websocket_url
      // Implementation depends on specific audio streaming setup
    }
    
    function showAccessDenied() {
      document.body.innerHTML = `
        <div style="text-align: center; padding: 50px;">
          <h1>Access Denied</h1>
          <p>Valid event ticket required</p>
          <button onclick="window.location.href='/events'">Browse Events</button>
        </div>
      `;
    }
  </script>
</body>
</html>
```

---

**Document Version:** 1.1  
**Last Updated:** December 2024  
**Author:** DLUX Development Team  
**Review Status:** Implementation Ready 