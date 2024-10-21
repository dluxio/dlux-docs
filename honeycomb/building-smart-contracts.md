# Building Smart Contracts
## Environment
### Inputs
The first part of smart contracts on honeycomb you must understand is how, and what, information is stored in memory. Honeycomb is a blockchain, and it gets it's input only from processing Hive blocks. It doesn't have access to Hive data you might access on APIs like account balances. For a blockchain to function correctly it has to be repeatable/provable. Which means if somebody takes a block, and plays it forward, they have to get an identical end state as anybody else. Reaching out to HIVE APIs isn't an option directly, as these values will change over time, and therefore blocks would process differently. 

So, knowing what transactions hive blocks contain is important and found at [Hive's Developer Portal - Broadcast OPS](https://developers.hive.io/apidefinitions/#apidefinitions-broadcast-ops)

Moving on we can look at our Honeycomb State

### Memory Map
Honeycomb keeps everything relatively simple. It's memory is almost identical in form to JSON. The only caveat here is arrays must be stringified. The DB is a standard keypair database, just hidden behind some custom handlers to keep things mostly easy.

#### ah | NFT Auction House
Internal Priced auctions appear here, these auctions don't have collateral requirements to hold bids in escrow.
```json
"hf:3i": { // setname:UID
            "c": 0, // number of accepted bids
            "e": 90064222, // Expiration Block
            "h": "HBD", // Pair
            "i": "hf:3i", // Identifier
            "n": "", // name of high bidder
            "nft": {
               "s": "3aV4X," // NFT state (Base64 list of blocks containing completed Txs)
            },
            "o": "savvytester", // Listing Account
            "p": 8000, // Price ($8.000 HBD)
            "q": "90064222:QmTdej7LZhNKoRsphDKWX1xGyUCwejfEr4LVtSAwxa1GEE", // queue ID (block 90064222, Virtual Op QmTdej7LZhNKoRsphDKWX1xGyUCwejfEr4LVtSAwxa1GEE)
            "t": 7 // time in days
         }
```
#### ahh | NFT Auction House Hive
Hive and HBD priced auctions, these auctions have a collateral requirement to escrow bids.
* UID : Object
```json
"hf:3i": { // setname:UID
            "c": 0, // number of accepted bids
            "e": 90064222, // Expiration Block
            "h": "HBD", // Pair
            "i": "hf:3i", // Identifier
            "n": "", // name of high bidder
            "nft": {
               "s": "3aV4X," // NFT state (Base64 list of blocks containing completed Txs)
            },
            "o": "savvytester", // Listing Account
            "p": 8000, // Price ($8.000 HBD)
            "q": "90064222:QmTdej7LZhNKoRsphDKWX1xGyUCwejfEr4LVtSAwxa1GEE", // queue ID (block 90064222, Virtual Op QmTdej7LZhNKoRsphDKWX1xGyUCwejfEr4LVtSAwxa1GEE)
            "t": 7 // time in days
         }
```
#### balances | Liquid Balances
Tokens that are free to use for DEX, N/FT buys and auctions, settling trades, power or gov ups, etc.
* Account Name : Int
`"disregardfiat": 1000`
#### cbalances | Claim Balances
Tokens ready to be claimed. These will go 50% to balances and 50% to pow (default) or gov (choice with claim)
* Account Name : Int
`"disregardfiat": 1000`
#### chrono | Chron / Scheduled Virtual Operations
Scheduled operations are here. These include things like expiring trades and auctions, down power transactions, and creating NFT mints.
* UID : Object
```json
"90004293:QmbNmMGRsoeYmuEFBArgiiPvuHAryxx1QStXvuBGbL6JGT": { // block : UID
            "block": 90004293, // block
            "from": "quinnertronics", // info rquired for op
            "op": "expire", // operation to perform
            "txid": "DLUXQmSNq1BbrusqHXHFGco1nSGReF7696qHosypQ3NMyQciFi" //info required for op
         },
```
#### contracts | Open DEX Orders by Account
List of Accounts
* Account : Object of Lists of Contracts
```json
"damla": { // acount
    "DLUXQmbDwW8dnzLwXv4Y4BpNGs8kCnH1YdddvSZWzBaHz1GF2h": { // UID of open Trade
        "amount": 1950, // token amount
        "block": 89758300, // open block
        "expire_path": "90622300:QmSVmUx97sJGsdqc5xEJqVNeHPRNJA1zSrkFkvHzXJzRBC", // chron ID of expire op
        "fee": 10, // fee in token
        "from": "damla", // opening account
        "hbd": 0, // hbd (This would indicate an HBD trade)
        "hive": 252, // HIVE (This is a Hive trade)
        "hive_id": "1585f5a9165d80c3ad40e3e90f0e6fb1c0861f15", // TXID of HiveTX to open Trade
        "rate": "0.129231", // Calculated trade price
        "txid": "DLUXQmbDwW8dnzLwXv4Y4BpNGs8kCnH1YdddvSZWzBaHz1GF2h", // UID
        "type": "hive:sell" // type
    }
},
```
#### delegations | Delegated Vests
The delegated vest op can place a static amount into this DB, but it isn't reflective of changes that happen over time, like APR.
* Account Name : Int
`"disregardfiat": 1000`
#### dex | Dex Open Dex Orders By Price
This contains a market centric view of open DEX contracts as well as a compressed market history
* Hive | HBD
  * buyBook | List of orders by price
  * buyOrders | Orders by UID
  * tick | Last price
  * days | History Buckets
#### div | Dividend Information
Information about NFT Dividends
* set | Object
```json
"hf": {
            "b": 1098, // balance remainder from last dividend
            "e": 1970, // number minted in set
            "l": 16, // last dispursement per NFT
            "p": 201600, // dividend period in blocks (7 days)
            "s": "hf" // set
         }
```
#### down | Down Vote Mana Tracking
Used to calculate down power votes
* Account | Object
```json
"markegiles": {
            "last": 80710971, //last downvote
            "max": 50080649550, // last calculated mana size (so changes in power balance can't be gamed)
            "power": 4832154156 // power after downvote
         }
```
#### feed | 24-28 Hour TX Feed
A list of all Hive Transactions that change Token State
* UID | Status Message
```json
"89964774:87e19bcad61a3f46b19ca5fee0088ba7ed6469c3": "@disregardfiat| Claimed 874.515 DLUX - Half powered up." // Block Number:txid
```
#### fts | Sealed NFT Pending Transfers
```json
"t": { // *T*oken | *H*ive | hb*D*
            "dlux:QmPzuKzUqo6zXoLUzXuZvYniR77GuFbJrXgBZvHqWHs6XZ": { //uid of trade
               "i": "dlux:QmPzuKzUqo6zXoLUzXuZvYniR77GuFbJrXgBZvHqWHs6XZ", //uid
               "t": "disregardfiat_forykw_100000" // from_to_price
            },
```
#### gov | Locked Gov Balances
Tokens that are locked to secure the DEX / Multi-Sig Account
* Account Name : Int
`"disregardfiat": 1000`
#### govd | Scheduled Down Powers By Account
List of Chron Ops by Account
* Account | List of Chron Ops
```json
"atexoras.pub": {
            "78513557:QmQKxUWE1RYeBa82B4p8bhfx6v3wCBdBp4atBX2nppxtpt": "78513557:QmQKxUWE1RYeBa82B4p8bhfx6v3wCBdBp4atBX2nppxtpt",
            "78715157:QmeTjDXn9rg8UzMwRJ7cTP5qa2crGsRk6F2oQp1gCSFBcD": "78715157:QmeTjDXn9rg8UzMwRJ7cTP5qa2crGsRk6F2oQp1gCSFBcD",
            "78916757:QmUwLw1ZP7xGKp8XYD7LiTgcVoZHB6LLVrw5SWvvVJuuha": "78916757:QmUwLw1ZP7xGKp8XYD7LiTgcVoZHB6LLVrw5SWvvVJuuha",
            "79118357:Qmcu5hSiNvQ2n9yewuN99wXdZ7bF7gwZ7oohen44tLkqxg": "79118357:Qmcu5hSiNvQ2n9yewuN99wXdZ7bF7gwZ7oohen44tLkqxg"
         },
```
#### granted | Granting Power
List of Accounts that have delegated thier Power and where it went
* Account | List
```json
"make3d": {
            "austindro": 6412581, // to account
            "disregardfiat": 10,
            "t": 6412591 // t tracks total delegated
         },
```
#### granting | Granting Power
List of accounts recieving delegation of Power
* Account | List
```json
"austindro": {
            "make3d": 6412581, // delegating account with amount
            "t": 6412581 // total delegated
         },
```
#### ls | NFTs for Sale
* UID | Object
```json
"hf:7k": {
            "h": "HBD",  // HIVE TOKEN
            "i": "hf:7k", // uid
            "nft": {
               "s": "3aU10," // NFT State String
            },
            "o": "xabi", // Seller
            "p": 1000000 // Price
         }
```
#### lt | FTs for sale in token
```json
"dlux:QmZkaG6eqnMnR6gxFUPqchMDcsjuHTcV9ts41LjvCRHoTL": {
            "i": "dlux:QmZkaG6eqnMnR6gxFUPqchMDcsjuHTcV9ts41LjvCRHoTL",
            "o": "markegiles",
            "p": 10000000
         }
```
#### lth | FTs for sale in Hive/HBD
```json
"dlux:QmRL4xmQqUNFV5kUpiSHhR6S5xvGhL76ekdFfEAN5PRD4Y": { //generating UID
            "b": 0, // bids
            "d": "disregardfiat_5000,markegiles_5000", //distrobution of proceeds ( 50%/50%)
            "h": 100000, 
            "i": "dlux:QmRL4xmQqUNFV5kUpiSHhR6S5xvGhL76ekdFfEAN5PRD4Y",
            "o": "disregardfiat", // seller
            "q": 1996, //quantity for sale
            "s": ""
         },
```
#### markets | Node Status
#### mss | Multi-Sig Transaction Queue (Active Authority)
#### msso | Multi-Sig Transaction Queue (Owner Authority)
#### nfts | NFTs
#### nomention | No Mention Elections
#### pfps | Profile Pictures
#### posts | PoB Active Posts
#### pow | Powered Balances
#### powd | Scheduled Power Downs by Account
#### queue | All nodes in Consensus
#### rnfts | Sealed NFTs by Account
#### runners | Nodes in Consensus with Sufficient Collateral
#### sets | NFT Set Information
#### stats | Honeycomb Status
#### up | Up Vote Mana Tracking

### Chron Operations

## Accessing State

## The Process Chain