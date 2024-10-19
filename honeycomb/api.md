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
#### Sample Respone 
### /markets
#### Sample Respone 
### /runners
#### Sample Respone 
### /queue
#### Sample Respone 
### /api/protocol
#### Sample Respone 
### /api/mirrors
#### Sample Respone 
### /api/coin_detail
#### Sample Respone 

## DEX API
All Endpoints in DEX that start with /api are meant to follow [CoinGecko Integration API Standards](https://docs.google.com/document/d/1v27QFoQq1SKT3Priq3aqPgB70Xd_PnDzbOCiuoCyixw/edit?tab=t.0)
* /api/tickers
* /api/orderbook
* /api/orderbook/:ticker_id
* /api/pairs
* /api/historical
* /api/historical/:ticker_id
* /api/recent/:ticker_id
### /dex
Is a call meant to draw the whole market for front ends. It can power charts, order books, and everything else
#### Sample Respone
```
{
   "markets": {
      "hbd": {
         "buyBook": "0.001000_DLUXQmYjbfNgGCnUaBusEn5t6htwt9YSE8Fkz3xZFMggB8xTXo", // price ordered CSV list of orders
         "days": {
            "42658400": {
               "b": 0.002, // low price
               "c": 1, //close
               "d": 3070, // target volume
               "o": 0.166667, // open price
               "t": 1, // high price
               "v": 2000 // base volume
            }, // ... market OCHL 
         },
         "sellBook": "0.990000_DLUXQmf4iqgD1ze4HpiWBgzicQ8Ab76MzVBA1457nT1SXB8CsL",  // price ordered CSV list of orders
         "tick": "0.008000", // last trade price
         "sells": [
            {
               "amount": 500000, // TOKEN for sale
               "block": 89660179, // open block
               "expire_path": "90524179:QmQNx4MShbNP2Dhr7bFeGCHgSD1UuSuJvovhCetQfXP2nj", // block number and internal ID of virtual operation
               "fee": 2501, // fee of full trade => 2.501 TOKEN
               "from": "savvytester", // Account that placed order
               "hbd": 495000, // $495.000 HBD
               "hive": 0, // NOT a HIVE Order
               "hive_id": "50161f90e57943977a9f357d777fa2ed411d5a2a", // TXID of savvytester's Hive transaction to open the order
               "rate": "0.990000", // price
               "txid": "DLUXQmf4iqgD1ze4HpiWBgzicQ8Ab76MzVBA1457nT1SXB8CsL", // Internal order ID
               "type": "hbd:sell", 
               "key": "0.990000:DLUXQmf4iqgD1ze4HpiWBgzicQ8Ab76MzVBA1457nT1SXB8CsL", // Price + TXID
               "hivenai": {
                  "amount": 0,
                  "precision": 3,
                  "token": "HIVE"
               },
               "hbdnai": {
                  "amount": 495000,
                  "precision": 3,
                  "token": "HBD"
               },
               "amountnai": {
                  "amount": 500000,
                  "precision": 3,
                  "token": "DLUX"
               },
               "feenai": {
                  "amount": 2501,
                  "precision": 3,
                  "token": "DLUX"
               } // order data that includes precision detail 
            }
         ],
         "buys": []
      },
      "hive": {
         "buyBook": "0.000014_DLUXQmZ7wzWDgkX6RMwT4sfoNjJ8k8WSX5XbuYZLo2r1VRxusf",
         "days": {
            "42658400": {
               "b": 0.001,
               "c": 1,
               "d": 5001,
               "o": 1,
               "t": 1,
               "v": 2001
            }, // history by dao buckets (roughly days)
         },
         "sellBook": "0.129000_DLUXQmVzNnUNM1USX1zEkYHsoh9S8NhfTBSAUhWwmq5EFgcxaC",
         "sellOrders": {
            "0.129000:DLUXQmVzNnUNM1USX1zEkYHsoh9S8NhfTBSAUhWwmq5EFgcxaC": {
               "amount": 19000000,
               "block": 89753258,
               "expire_path": "90617258:QmWQwRJGXxkdb7XLdg6eNFbsUFa3C4JanJeoCoDsLveP26",
               "fee": 95001,
               "from": "savvytester",
               "hbd": 0,
               "hive": 2451000,
               "hive_id": "5fcdf5e423855960103452152f87dd2abfae8e1c",
               "rate": "0.129000",
               "txid": "DLUXQmVzNnUNM1USX1zEkYHsoh9S8NhfTBSAUhWwmq5EFgcxaC",
               "type": "hive:sell",
               "key": "0.129000:DLUXQmVzNnUNM1USX1zEkYHsoh9S8NhfTBSAUhWwmq5EFgcxaC"
            }, // ...
         },
         "tick": "0.169000",
         "sells": [
            {
               "amount": 997560815,
               "block": 0,
               "expire_path": "NA",
               "fee": 0,
               "from": "ICO",
               "hbd": 0,
               "hive": 997560815,
               "rate": "1.000000",
               "txid": "DLUXICO",
               "type": "hive:sell",
               "key": "1.000000:DLUXICO",
               "hivenai": {
                  "amount": 997560815,
                  "precision": 3,
                  "token": "HIVE"
               },
               "hbdnai": {
                  "amount": 0,
                  "precision": 3,
                  "token": "HBD"
               },
               "amountnai": {
                  "amount": 997560815,
                  "precision": 3,
                  "token": "DLUX"
               },
               "feenai": {
                  "amount": 0,
                  "precision": 3,
                  "token": "DLUX"
               }
            }, // ...
         ],
         "buys": [
            {
               "amount": 196357142,
               "block": 89140334,
               "expire_path": "90004334:QmPc9J8PzB57bLWNnGSQm5qDqMx8AJa212zy2kPVKZ5oC5",
               "fee": 1963572,
               "from": "quinnertronics",
               "hbd": 0,
               "hive": 2749,
               "hive_id": "81eaf404d529b92677219bcb7a518391cbcf5be3",
               "rate": "0.000014",
               "txid": "DLUXQmZ7wzWDgkX6RMwT4sfoNjJ8k8WSX5XbuYZLo2r1VRxusf",
               "type": "hive:buy",
               "key": "0.000014:DLUXQmZ7wzWDgkX6RMwT4sfoNjJ8k8WSX5XbuYZLo2r1VRxusf",
               "hivenai": {
                  "amount": 2749,
                  "precision": 3,
                  "token": "HIVE"
               },
               "hbdnai": {
                  "amount": 0,
                  "precision": 3,
                  "token": "HBD"
               },
               "amountnai": {
                  "amount": 196357142,
                  "precision": 3,
                  "token": "DLUX"
               },
               "feenai": {
                  "amount": 1963572,
                  "precision": 3,
                  "token": "DLUX"
               }
            }, // ...
         ]
      },
      "liq": { // Open order interest for liquidity rewards
         "quinnertronics": 27490
      }
   },
   "stats": {
      // ...
   },
}
```

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

