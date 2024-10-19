# API Guide

All calls contain the responding APIs configured account name, as well as where it believes it is in processing blocks.
* "behind": 0, // Head block - last processed block. Updated once per minute. Values around head height indicate a restart in the last minute.
* "node": "dlux-io", // Configured Account. Useful if a mirror is redirecting and you are polling APIs
   "VERSION": "v1.4.5" // Nodes Version of Honeycomb.

## Standard API

 ### /stats and / 
 Returns the current running parameters.

#### Sample Respone 
```
{
   "result": {
      "MSHeld": {
         "HBD": 902, // 0.902 HBD in multi-sig account
         "HIVE": 87574 // 87.574 Hive in multi-sig account
      },
      "chaos": 0, // number of 100 block periods with out consensus
      "delegationRate": 2000, // 20% of inflation directed to delegators to voting account.
      "dex_fee": "0.00000", // DEX feed
      "dex_max": "100.00", // MAX Open trade size
      "dex_slope": "0.00", // MAX Open trade size by curent rate.
      "gov_threshhold": 0, // Gov tokens required to be in consensus
      "hashLastIBlock": "QmbJW6yEvTd3Em2pbzMvXkcr6W1SU4E2mH6K58YnKuPJkJ", // 
      "icoPrice": 1000, // ICO info - unsupported
      "icoRound": 0, // ICO info - unsupported
      "interestRate": 2100000,
      "lastBlock": "QmYsTg1DrYPMQHjqr6wntik95ngnx8UAAtLNqcP5S6hqMg",
      "lastIBlock": 89106200, // Irreversible Block hash and height
      "liq_reward": 100, // Inflation allocation to reward quality open hive interest
      "daoRate": 500, // For planned DAO feature
      "maxBudget": 1000000000, // Max Size of DAO
      "movingWeight": {
         "dailyPool": 1307354,
         "running": 0
      }, //Proof of Brain pool smoothing data
      "ms": {
         "active_account_auths": {
            "dlux-io": 1,
            "east.autovote": 1,
            "make3d": 1
         },
         "active_threshold": 2,
         "memo_key": "STM5GNM3jpjWh7Msts5Z37eM9UPfGwTMU7Ksats3RdKeRaP5SveR9",
         "owner_key_auths": {
            "STM5Rp1fWQMS7tAPVqatg8B22faeJGcKkfsez3mgUwGZPE9aqWd6X": 1,
            "STM6fVgnYQfJ3EwoeKkYRsDQ22bUmdXoSWxDcoWrb8DHnFpZNqKyp": 1,
            "STM8Y7tuUpDkZ6KT9dgvryoDDXnYLmGF9ZFnZP3V8VouA5yGVu719": 1
         },
         "owner_threshold": 2,
         "posting_threshold": 1
      }, // Multi-sig key information
      "multiSigCollateral": 584900679, // Tokens held by consensus nodes
      "nft_byte_cost": 20, // Tokens required to mint NFTs per byte
      "nft_fee_1": 100000, // Base fee to mint an NFT
      "nodeRate": 1000, // 10% inflation allocated to consensus nodes
      "safetyLimit": 18327889, // Tokens held to secure DEX account (price * colateral = max Hive open)
      "tokenSupply": 14669701682 
   }
```
 ### /@:user
Gets a hive accounts honeycomb data
#### Sample Respone 
* GET`/@disregardfiat`
```
{
   "balance": 74253606, // Liquid Balance
   "claim": 836594, // Availible to claim
   "poweredUp": 1006951669, // Power Balance
   "granted": 0, // Power Delegations IN
   "granting": 0, // Power delegations OUT
   "contracts": [], // Open DEX orders
   "up": { // Upvoting Mana
      "last": 74356302,
      "max": 50040652850,
      "power": 49039839793
   },
   "down": {}, // Downvoting Mana
   "power_downs": {}, // Scheduled Power Downs
   "gov": 106435494, // Balance held in GOV
   "tick": "0.169000", // Last Hive/Token price for client $ calculations
}

```

### /feed
List of all processed user transactions. Some Internal transactions.
* "Block:TXID" for Block Explorer linking
* vop_ is a scheduled operation. the TXID is internally generated.
* @account| messageMessage
#### Sample Response
```
{
   "feed": {
      "89895386:vop_QmeC8Bhy4ccy3ewJP2a9JVFqnWsEZPz5uhWVH5YQK9sd8H": "@kriptonik| powered down 7.166 DLUX",
      "89899053:1cebe9faef8e9dd1898b60c259a1e13643ecffad": "@forykw| Claimed 277.790 DLUX - Half powered up.",
      "89899063:308228397851b320539adbc8f4db646cf0f22059": "@forykw| Powered up 138.895 DLUX",
      "89911475:b306d696c67950eb6856e69b3eaf0f73df0f6a77": "@savvytester| Claimed 0.292 DLUX - Half locked in gov"
   }
}```

### /api/status/:txid
### /markets
 //for finding node runner and tasks information
### /runners
 //list of accounts that determine consensus... will also be the multi-sig accounts
### /queue
### /api/protocol
### /api/mirrors
### /api/coin_detail

## DEX API

### /dex', API.dex);
### /api/tickers', API.tickers);
### /api/orderbook', API.orderbook);
### /api/orderbook/:ticker_id', API.orderbook);
### /api/pairs', API.pairs);
### /api/historical', API.historical_trades);
### /api/historical/:ticker_id', API.historical_trades);
### /api/recent/:ticker_id', API.chart);

## NFT API

### /api/nfts/:user
### /api/nft/:set/:item
### /api/sets
### /api/set/:set
### /api/auctions
### /api/auctions/:set
### /api/mintauctions
### /api/mintauctions/:set
### /api/sales
### /api/sales/:set
### /api/mintsales
### /api/mintsales/:set
### /api/mintsupply
### /api/mintsupply/:set
### /api/pfp/:user
### /api/trades/:kind/:user
  }
## Proof of Brain API

[Docker Data](https://github.com/dluxio/docker-data) Must be configured on the responding node to access these requests.

### /blog/@:un

Pulls the blog data for a hive username

#### Example

`/blog/@disregardfiat`

### /dapps/@:author

Pulls dApps for @author. 

### /blog/@:un

Pulls votable content from a user

#### Example

`/blog/@disregardfiat`

### /new

### /trending

### /promoted

### /posts/:author/:permlink

### /posts

Call to list all currently votable content. (Does not require Docker Data)

#### Response

```
{
   "feed": {
      "bezkresu/art-workshops-in-the-kingdom": {
         "author": "bezkresu",
         "block": 57517805,
         "customJSON": {
            "Hash360": "QmVsdhg6pN55mDNdqVNqgJepGjBheTfhGxrWrNibhkqUfG",
            "app": "dlux/0.0.9",
            "assets": {
               "0": {
                  "hash": "QmVsdhg6pN55mDNdqVNqgJepGjBheTfhGxrWrNibhkqUfG",
                  "name": "1",
                  "pin": true,
                  "size": 8405586,
                  "thumbHash": "QmVsdhg6pN55mDNdqVNqgJepGjBheTfhGxrWrNibhkqUfG",
                  "type": "ts"
               },
               "1": {
                  "hash": "QmXoKG8brYK9ffWu9dSqNraNJRhwDw2BZHTyv3t89eDZUw",
                  "name": "2",
                  "pin": true,
                  "size": 8344849,
                  "thumbHash": "QmXoKG8brYK9ffWu9dSqNraNJRhwDw2BZHTyv3t89eDZUw",
                  "type": "ts"
               }
            },
            "format": "markdown",
            "tags": {
               "0": "dlux",
               "1": "vr",
               "2": "polish",
               "3": "hive",
               "4": "art"
            },
            "vrHash": "QmNby3SMAAa9hBVHvdkKvvTqs7ssK4nYa2jBdZkxqmRc16",
            "xr": true
         },
         "meta": {
            "Hash360": "QmVsdhg6pN55mDNdqVNqgJepGjBheTfhGxrWrNibhkqUfG",
            "app": "dlux/0.0.9",
            "assets": {
               "0": {
                  "hash": "QmVsdhg6pN55mDNdqVNqgJepGjBheTfhGxrWrNibhkqUfG",
                  "name": "1",
                  "pin": true,
                  "size": 8405586,
                  "thumbHash": "QmVsdhg6pN55mDNdqVNqgJepGjBheTfhGxrWrNibhkqUfG",
                  "type": "ts"
               },
               "1": {
                  "hash": "QmXoKG8brYK9ffWu9dSqNraNJRhwDw2BZHTyv3t89eDZUw",
                  "name": "2",
                  "pin": true,
                  "size": 8344849,
                  "thumbHash": "QmXoKG8brYK9ffWu9dSqNraNJRhwDw2BZHTyv3t89eDZUw",
                  "type": "ts"
               }
            },
            "format": "markdown",
            "image": {
               "0": "https://images.ecency.com/DQmNcXJwGhdnziS8nqL4MftujYzXd3RPPbEwjbBjofiEN68/obraz.png"
            },
            "links": {
               "0": "https://dlux.io/dlux/@bezkresu/art-workshops-in-the-kingdom"
            },
            "tags": {
               "0": "dlux",
               "1": "vr",
               "2": "polish",
               "3": "hive",
               "4": "art"
            },
            "vrHash": "QmNby3SMAAa9hBVHvdkKvvTqs7ssK4nYa2jBdZkxqmRc16",
            "xr": true
         },
         "permlink": "art-workshops-in-the-kingdom",
         "votes": {
            "disregardfiat": {
               "b": 57517891,
               "v": 1000000000
            },
            "fw206": {
               "b": 57533373,
               "v": 4010295
            },
            "nervi": {
               "b": 57517810,
               "v": 126
            }
         }
      } ...
   },
   "node": "dlux-io",
   "behind": 1,
   "VERSION": "v1.4.5"
}
```
## Testing API

Enabling STATE on your node unlocks powerful APIs, but Powerful APIs come with a hefty CPU price.

###  /state
Full State Dump to JSON
### /coin
Counts tokens in standard locations and returns a balance. Useful for troubleshooting TokenSupply leaks.
### /pending
Shows nodes broadcast operations, transaction signer, and consensus queue.

