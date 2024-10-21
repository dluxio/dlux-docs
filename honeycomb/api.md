# API Guide

All calls contain the responding APIs configured account name, as well as where it believes it is in processing blocks.
* "behind": 0, // Head block - last processed block. Updated once per minute. Values around head height indicate a restart in the last minute.
* "node": "dlux-io", // Configured Account. Useful if a mirror is redirecting and you are polling APIs
* "VERSION": "v1.4.5" // Nodes Version of Honeycomb.

## Standard API

 ### /stats and / 
 Returns the current running parameters.

#### Sample Respone 
```json
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
```json
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
* @account| message
#### Sample Response
```json
{
   "feed": {
      "89895386:vop_QmeC8Bhy4ccy3ewJP2a9JVFqnWsEZPz5uhWVH5YQK9sd8H": "@kriptonik| powered down 7.166 DLUX",
      "89899053:1cebe9faef8e9dd1898b60c259a1e13643ecffad": "@forykw| Claimed 277.790 DLUX - Half powered up.",
      "89899063:308228397851b320539adbc8f4db646cf0f22059": "@forykw| Powered up 138.895 DLUX",
      "89911475:b306d696c67950eb6856e69b3eaf0f73df0f6a77": "@savvytester| Claimed 0.292 DLUX - Half locked in gov",
      "89964774:87e19bcad61a3f46b19ca5fee0088ba7ed6469c3": "@disregardfiat| Claimed 874.515 DLUX - Half powered up."
   }
}
```

### /api/status/:txid
This api provides a limited amount of transaction specific feedback. If a transaction made it into the feed above, you can pull the status message associated with the TXID. This API is used to get feedback for hive transactions that have a honeycomb processing requirement. Each node can set how much history they'll carry, and if their node restarts it will start again at about 100 block back from HEAD. Therefore, this is best used for near instant feedback.
#### Sample Respone 
* `/api/status/87e19bcad61a3f46b19ca5fee0088ba7ed6469c3`
```json
{
   "txid": "87e19bcad61a3f46b19ca5fee0088ba7ed6469c3",
   "status": "@disregardfiat| Claimed 874.515 DLUX - Half powered up."
}
```
### /markets
This API provides the current details of the nodes, as well as the stats object. The name is a hold over from the days when the node runners provided an escrow market for atomic swaps. 
#### Sample Respone 
```json
{
   "markets": {
      "node": {
         "actifit-dlux": {
            "attempts": 98054, // number of block submissions
            "bidRate": 2000, //vote on node inflation share 20%
            "contracts": 0, // unused with new dex
            "dm": 10000, // dex max vote
            "domain": "https://dlux-actifit.herokuapp.com/", //registered public API
            "ds": 0, //dex slope vote
            "escrow": true, // unused with new DEX
            "escrows": 0, //unused with new DEX
            "g": 0, // gov balance
            "lastGood": 63263300, // last block in consensus
            "liquidity": 0, // liquidity balance
            "marketingRate": 0, // may also be daoRate ... vote for percent to put toward dao.
            "mirror": false, // if this node will make the same daily posts as the leader
            "moved": 0, // old escrow swap data
            "report": { // last report
               "block": 66895301,
               "block_num": 70002752,
               "escrow": true,
               "hash": 0,
               "prand": "1f627e8f468f0d27a437a9a835947a6143de72033f32ab4588c2b7c4984c6431c07268121d0c5d4074813cdefce3c9333370a3a695c2eec47ee45205b0291cd4d8",
               "sig": "",
               "sig_block": 66831350,
               "transaction_id": "a45e9e4f297c3f522adbbf814c4c0bcca5bcbf79",
               "version": "v1.2.8"
            },
            "self": "actifit-dlux", 
            "tw": 207, // total wins (blocks)
            "ty": 207, // total attempts
            "wins": 0, // todays wins
            "yays": 0 // todays attempts
         }, ...
      }
      stats: { ... }
```
### /runners
Runners is all nodes who are in consensus and have provided a meaningful amount of collateral in their gov balance. For instance, if 10 people have 1000, and 20 more come with 1. the overall colateral would have fallen significantly as the multisig is secured by several nodes who have little stake. 
#### Sample Respone 
```json
{
   "result": [
      {
         "api": "http://121.99.241.161:5300", // public API
         "g": 14498084, // gov balance
         "l": 100, // liquidity vote
         "account": "atexoras.witness" //node name
      },
      {
         "api": "https://dlux.tekraze.com",
         "g": 9669052,
         "l": 100,
         "account": "balvinder294"
      },
      {
         "api": "https://dlux.c0ff33a.uk",
         "g": 8658837,
         "l": 100,
         "account": "c0ff33a"
      },
      {
         "api": "token.dlux.io",
         "g": 502726019,
         "l": 100,
         "account": "dlux-io"
      },
      {
         "api": "http://dlux-token.herokuapp.com",
         "g": 49348687,
         "l": 100,
         "account": "make3d"
      }
   ],
   "runners": { // the same information, but in keypair form.
      "atexoras.witness": {
         "api": "http://121.99.241.161:5300",
         "g": 14498084,
         "l": 100,
         "account": "atexoras.witness"
      },
      "balvinder294": {
         "api": "https://dlux.tekraze.com",
         "g": 9669052,
         "l": 100,
         "account": "balvinder294"
      },
      "c0ff33a": {
         "api": "https://dlux.c0ff33a.uk",
         "g": 8658837,
         "l": 100,
         "account": "c0ff33a"
      },
      "dlux-io": {
         "api": "token.dlux.io",
         "g": 502726019,
         "l": 100,
         "account": "dlux-io"
      },
      "make3d": {
         "api": "http://dlux-token.herokuapp.com",
         "g": 49348687,
         "l": 100,
         "account": "make3d"
      }
   },
   "latest": [
      {
         "api": "https://token.dlux.io" // Before the one block irreversibility, this node would run latest blocks instead of irreversible blocks to provide faster feedback for front ends. 
      }
   ]
}
```
### /queue
Much like runners above, this was a list of all nodes qualified to do escrow based atomic swaps. It still calculates the same data, but shows all nodes in consensus regardless of gov balance.
#### Sample Respone 
```json
{
   "queue": {
      "atexoras.witness": {
         "api": "http://121.99.241.161:5300",
         "g": 14498084,
         "l": 100
      },
      "balvinder294": {
         "api": "https://dlux.tekraze.com",
         "g": 9669052,
         "l": 100
      },
      "c0ff33a": {
         "api": "https://dlux.c0ff33a.uk",
         "g": 8658837,
         "l": 100
      },
      "dlux-io": {
         "api": "token.dlux.io",
         "g": 502726019,
         "l": 100
      },
      "make3d": {
         "api": "http://dlux-token.herokuapp.com",
         "g": 49348687,
         "l": 100
      }
   },
   "node": "dlux-io",
   "behind": 0,
   "VERSION": "v1.4.5"
}
```
### /api/protocol
Protocol is used by frontend to know how to interact with each honeycomb instance. 
* Shows all consensus public API and Gov totals.
* Tells the front end things like token prefix, so it can inteligently interact with differeing honeycomb communities.
#### Sample Respone 
```json
{
   "consensus": {
      "atexoras.witness": {
         "api": "http://121.99.241.161:5300",
         "g": 14498084,
         "l": 100
      },
      "balvinder294": {
         "api": "https://dlux.tekraze.com",
         "g": 9669052,
         "l": 100
      },
      "c0ff33a": {
         "api": "https://dlux.c0ff33a.uk",
         "g": 8658837,
         "l": 100
      },
      "dlux-io": {
         "api": "token.dlux.io",
         "g": 502726019,
         "l": 100
      },
      "make3d": {
         "api": "http://dlux-token.herokuapp.com",
         "g": 49348687,
         "l": 100
      }
   },
   "prefix": "dlux_",
   "node": "dlux-io",
   "multisig": "dlux-cc",
   "jsontoken": "dlux",
   "memoKey": "STM5GNM3jpjWh7Msts5Z37eM9UPfGwTMU7Ksats3RdKeRaP5SveR9",
   "features": {
      "claim_id": "claim",
      "claim_S": "Airdrop",
      "claim_B": false,
      "claim_json": "drop",
      "rewards_id": "claim",
      "rewards_S": "Rewards",
      "rewards_B": true,
      "rewards_json": "claim",
      "rewardSel": true,
      "reward2Gov": true,
      "send_id": "send",
      "send_S": "Send",
      "send_B": true,
      "send_json": "send",
      "powup_id": "power_up",
      "powup_B": true,
      "pow_val": "",
      "powdn_id": "power_down",
      "powdn_B": true,
      "powsel_up": true,
      "govup_id": "gov_up",
      "govup_B": true,
      "gov_val": "",
      "govsel_up": true,
      "govdn_id": "gov_down",
      "govdn_B": true,
      "node": {
         "id": "node_add",
         "opts": [
            {
               "S": "Domain",
               "type": "text",
               "info": "https://no-trailing-slash.com",
               "json": "domain",
               "val": ""
            },
            {
               "S": "DEX Fee Vote",
               "type": "number",
               "info": "500 = .5%",
               "max": 1000,
               "min": 0,
               "json": "bidRate",
               "val": ""
            },
            {
               "S": "DEX Max Vote",
               "type": "number",
               "info": "10000 = 100%",
               "max": 10000,
               "min": 0,
               "json": "dm",
               "val": ""
            },
            {
               "S": "DEX Slope Vote",
               "type": "number",
               "info": "10000 = 100%",
               "max": 10000,
               "min": 0,
               "json": "ds",
               "val": ""
            }
         ]
      }
   },
   "behind": 0,
   "info": "/markets will return node information and published APIs for the consensus nodes, you may check these other APIs to ensure that the information in the API is in consensus.\nThe prefix is used to address this tokens architecture built on Hive.",
   "VERSION": "v1.4.5"
}
```
### /api/mirrors
The smallest API for finding consensus mirrors. 
#### Sample Respone 
```json
{
   "apis": [
      {
         "api_url": "http://121.99.241.161:5300",
         "node": "atexoras.witness"
      },
      {
         "api_url": "https://dlux.tekraze.com",
         "node": "balvinder294"
      },
      {
         "api_url": "https://dlux.c0ff33a.uk",
         "node": "c0ff33a"
      },
      {
         "api_url": "token.dlux.io",
         "node": "dlux-io"
      },
      {
         "api_url": "http://dlux-token.herokuapp.com",
         "node": "make3d"
      }
   ],
   "node": "dlux-io",
   "behind": 1,
   "VERSION": "v1.4.5"
}
```

## DEX API
All Endpoints in DEX that start with /api are meant to follow [CoinGecko Integration API Standards](https://docs.google.com/document/d/1v27QFoQq1SKT3Priq3aqPgB70Xd_PnDzbOCiuoCyixw/edit?tab=t.0)
* /api/tickers
* /api/orderbook
* /api/orderbook/:ticker_id
* /api/pairs
* /api/historical
* /api/historical/:ticker_id
* /api/recent/:ticker_id
* /api/coin_detail
### /dex
Is a call meant to draw the whole market for front ends. It can power charts, order books, and everything else
#### Sample Respone
```json
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
The following API suite features all of the NFT and FT(Fungible or "sealed" Tokens) data.
### /api/nfts/:user
#### Sample Response
* `/api/nfts/disregardfiat`
```json
{
   "result": [
      {
         "uid": "0SL5C", // unique ID
         "info": "3X9NA,", // Base64 Encoded blocknumber for all changes made to NFT (ownership, claim, etc)
         "set": "bz", // set 
         "script": "QmUM2sBkUtuzUUj2kUJzSTD7Wz2S4hCqVoeBKzSBDjTb3L", // script set IPFS 
         "type": 1, // type 1 - choses a number in the set range.
         "encoding": "svg" // type of output file
      }, ...
   ],
   "mint_tokens": [ // sealed tokens, they haven't been unwrapped and gotten a unique ID
      {
         "qty": 8794, // qty in set owned
         "set": "bz", // set name
         "script": "QmUM2sBkUtuzUUj2kUJzSTD7Wz2S4hCqVoeBKzSBDjTb3L", // script of set in IPFS
         "type": 1, 
         "encoding": "svg"
      }, ...
   ],
   "user": "disregardfiat",
}
```
### /api/nft/:set/:item
Get information of a specific NFT
#### Sample Response
* `/api/nft/bz/0SL5C`
```json
{
   "item": {
      "uid": "0SL5C",
      "set": "bz",
      "last_modified": 59020746, // plain text last info block.
      "info": "3X9NA,",
      "type": 1,
      "owner": "disregardfiat", // may be ah for auction house, or hh for hive auctions
      "lien": "No Lien" // unused, meant for collateral 
   },
   "set": {
      "set": "bz",
      "link": "disregardfiat/bees", // nft announcement post
      "fee": {
         "amount": 10301020,
         "precision": 3,
         "token": "DLUX"
      }, // amount paid to mint set
      "bond": {
         "amount": 0,
         "precision": 3,
         "token": "DLUX"
      }, // amount that will be returned if the NFT is destroyed
      "permlink": "bees", // announcement post permlink
      "author": "disregardfiat", // announcement post author
      "script": "QmUM2sBkUtuzUUj2kUJzSTD7Wz2S4hCqVoeBKzSBDjTb3L",
      "name_long": "Beez", // Long name of set.
      "encoding": "svg",
      "type": 1,
      "royalty": 0, // 2nd hand sales percentage that goes to set author
      "name": "bz",
      "minted": "7v", // Base64 number of minted in the set.
      "max": 1073741823 // the range of supported numbers in the set ( claiming a sealed NFT chooses a unique number in this range, which becomes the Base64 UID)
   },
   "node": "dlux-io",
   "behind": 1,
   "VERSION": "v1.4.5"
}
```
### /api/sets
Get a list of all sets in honeycomb
#### Sample Response
```json
{
   "result": [
      {
         "set": "bz",
         "link": "disregardfiat/bees",
         "fee": {
            "amount": 10301020,
            "precision": 3,
            "token": "DLUX"
         },
         "bond": {
            "amount": 0,
            "precision": 3,
            "token": "DLUX"
         },
         "permlink": "bees",
         "author": "disregardfiat",
         "script": "QmUM2sBkUtuzUUj2kUJzSTD7Wz2S4hCqVoeBKzSBDjTb3L",
         "encoding": "svg",
         "type": 1,
         "royalty": 0,
         "royalty_allocation": "disregardfiat_10000", // 0% 100% to disregardfiat
         "name": "bz",
         "name_long": "Beez",
         "minted": "7v",
         "max": 10000,
         "max_exe_length": 0, // prepaid bytes of storage per NFT
         "max_opt_length": 0, // prepaid bytes of storage per NFT
         "total_div": {
            "amount": 0,
            "precision": 3,
            "token": "DLUX"
         }, // dividends
         "last_div": {
            "amount": 0,
            "precision": 3,
            "token": "DLUX"
         } // last dividend payment
      },
      {
         "set": "dlux",
         "link": "disregardfiat/dlux-founders-set-nft",
         "fee": {
            "amount": 3950240,
            "precision": 3,
            "token": "DLUX"
         },
         "bond": {
            "amount": 100000,
            "precision": 3,
            "token": "DLUX"
         },
         "permlink": "dlux-founders-set-nft",
         "author": "disregardfiat",
         "script": "QmYSRLiGaEmucSXoNiq9RqazmDuEZmCELRDg4wyE7Fo8kX",
         "encoding": "svg",
         "type": 1,
         "royalty": "100",
         "royalty_allocation": "disregardfiat_5000,markegiles_5000", // 1%: 50% of disregardfiat, 50% to markegiles
         "name": "dlux",
         "name_long": "DLUX Founders",
         "minted": "1y",
         "max": 4096,
         "max_exe_length": 0,
         "max_opt_length": 0,
         "total_div": {
            "amount": 0,
            "precision": 3,
            "token": "DLUX"
         },
         "last_div": {
            "amount": 0,
            "precision": 3,
            "token": "DLUX"
         }
      },
      {
         "set": "hf",
         "link": "hivefolks/hive-folks-launch-announcement-tomorrow-3-pm-utc-1282021",
         "fee": {
            "amount": 591400,
            "precision": 3,
            "token": "DLUX"
         },
         "bond": {
            "amount": 0,
            "precision": 3,
            "token": "DLUX"
         },
         "permlink": "hive-folks-launch-announcement-tomorrow-3-pm-utc-1282021",
         "author": "hivefolks",
         "script": "QmSPm13knazJsN4C8b7mWqT8tG2CeFCRvbW1PifYZV9dVN",
         "encoding": "img",
         "type": 1,
         "royalty": 700,
         "royalty_allocation": "disregardfiat_3000,lordbutterfly_3000,d_4000", // 7% 30% to disregardfiat, 30% to lord butterfly, 40% distributed as dividends
         "name": "hf",
         "name_long": "Hive Folks",
         "minted": "86",
         "max": 564,
         "max_exe_length": 0,
         "max_opt_length": 0,
         "total_div": {
            "amount": 1970,
            "precision": 3,
            "token": "DLUX"
         },
         "last_div": {
            "amount": 16,
            "precision": 3,
            "token": "DLUX"
         }, // 0.016 DLUX paid per NFT for transfer royalties
         "period_div": 201600 // dividends paid every 201600 blocks (7 days)
      }
   ],
   "node": "dlux-io",
   "behind": 1,
   "VERSION": "v1.4.5"
}
```
### /api/set/:set
Whole Set Data.
Every
* minted UID
* owner
* data to compile
#### Sample Response
* `\api/set/hf`
```json
{
   "result": [
      {
         "uid": "2S",
         "set": "hf",
         "script": "QmSPm13knazJsN4C8b7mWqT8tG2CeFCRvbW1PifYZV9dVN",
         "owner": "whatsup"
      }, ...
      {
         "uid": "7W",
         "set": "hf",
         "script": "QmSPm13knazJsN4C8b7mWqT8tG2CeFCRvbW1PifYZV9dVN",
         "owner": "hh" // Hive Auction
      }
   ],
   "set": {
      "set": "hf",
      "link": "hivefolks/hive-folks-launch-announcement-tomorrow-3-pm-utc-1282021",
      "fee": {
         "amount": 591400,
         "precision": 3,
         "token": "DLUX"
      },
      "bond": {
         "amount": 0,
         "precision": 3,
         "token": "DLUX"
      },
      "permlink": "hive-folks-launch-announcement-tomorrow-3-pm-utc-1282021",
      "author": "hivefolks",
      "script": "QmSPm13knazJsN4C8b7mWqT8tG2CeFCRvbW1PifYZV9dVN",
      "encoding": "img",
      "type": 1,
      "royalty": 700,
      "royalty_accounts": "disregardfiat_3000,lordbutterfly_3000,d_4000",
      "name": "hf",
      "name_long": "Hive Folks",
      "minted": 518,
      "max": 564,
      "max_opt_length": 0,
      "max_exe_length": 0,
      "total_div": {
         "amount": 0,
         "precision": 3,
         "token": "DLUX"
      },
      "last_div": {
         "amount": 0,
         "precision": 3,
         "token": "DLUX"
      }
   },
   "node": "dlux-io",
   "behind": 0,
   "VERSION": "v1.4.5"
}
```
### /api/auctions
All NFTs at Auction
### Sample Response
```json
{
   "result": [
      {
         "uid": "3i",
         "set": "hf",
         "price": { // current bid
            "amount": 28000,
            "precision": 3,
            "token": "HBD"
         },
         "initial_price": { // starting bid
            "amount": 8000,
            "precision": 3,
            "token": "HBD"
         },
         "time": "2024-10-24T03:22:47.975Z", // auction expiration
         "by": "savvytester",
         "bids": 20, //number of bids
         "bidder": "disregardfiat", // highest bidder
         "script": "QmSPm13knazJsN4C8b7mWqT8tG2CeFCRvbW1PifYZV9dVN",
         "name_long": "Hive Folks",
         "days": 7,
         "buy": "" // if there is a buy it now price.
      }, ...
   ],
   "node": "dlux-io",
   "behind": 1,
   "VERSION": "v1.4.5"
}
```
### /api/auctions/:set
A list of NFT auctions that only includes one set.
### /api/mintauctions
A list of FT auctions.
### /api/mintauctions/:set
A list of FT auctions that only include one set
### /api/sales
A list of NFTs for Sale
### /api/sales/:set
A list of NFTs for sale from one set
### /api/mintsales
A list of FTs for sale
#### Sample Response
```json
{
   "result": [
      {
         "uid": "QmZkaG6eqnMnR6gxFUPqchMDcsjuHTcV9ts41LjvCRHoTL",
         "set": "dlux",
         "price": {
            "amount": 10000000,
            "precision": 3,
            "token": "DLUX"
         },
         "by": "markegiles",
         "script": "QmYSRLiGaEmucSXoNiq9RqazmDuEZmCELRDg4wyE7Fo8kX",
         "name_long": "DLUX Founders"
      }
   ],
   "node": "dlux-io",
   "behind": 0,
   "VERSION": "v1.4.5"
}
```
### /api/mintsales/:set
A list of FTs for sale from one set
### /api/mintsupply
A comprehensive list of FTs from all sources
#### Sample Response
```json
{
   "result": [
      {
         "set": "dlux",
         "script": "QmYSRLiGaEmucSXoNiq9RqazmDuEZmCELRDg4wyE7Fo8kX",
         "auctions": [],
         "sales": [
            {
               "uid": "QmZkaG6eqnMnR6gxFUPqchMDcsjuHTcV9ts41LjvCRHoTL",
               "set": "dlux",
               "price": 10000000,
               "qty": 1,
               "pricenai": {
                  "amount": 10000000,
                  "precision": 3,
                  "token": "DLUX"
               },
               "by": "markegiles",
               "script": "QmYSRLiGaEmucSXoNiq9RqazmDuEZmCELRDg4wyE7Fo8kX",
               "name_long": "DLUX Founders"
            },
            {
               "uid": "QmRL4xmQqUNFV5kUpiSHhR6S5xvGhL76ekdFfEAN5PRD4Y",
               "set": "dlux",
               "price": 100000,
               "qty": 1996,
               "pricenai": {
                  "amount": 100000,
                  "precision": 3,
                  "token": "HIVE"
               },
               "by": "disregardfiat",
               "script": "QmYSRLiGaEmucSXoNiq9RqazmDuEZmCELRDg4wyE7Fo8kX",
               "name_long": "DLUX Founders",
               "max": 1996,  // max purchase per account
               "pb": "" // depreciated, periodic block for max purchase 
            },
            {
               "uid": "QmZJRXVw85Mz6XL8X6bLjNogs3EhxJMbTHBo2GknzgozHA",
               "set": "dlux",
               "price": 99000,
               "qty": 1,
               "pricenai": {
                  "amount": 99000,
                  "precision": 3,
                  "token": "HIVE"
               },
               "by": "markegiles",
               "script": "QmYSRLiGaEmucSXoNiq9RqazmDuEZmCELRDg4wyE7Fo8kX",
               "name_long": "DLUX Founders",
               "max": 1,
               "pb": ""
            },
            {
               "uid": "QmbNvfN3yXhnRD3kiqHEbhZZNdsBkP595KuiSgwJvLd7sv",
               "set": "dlux",
               "price": 75000,
               "qty": 1,
               "pricenai": {
                  "amount": 75000,
                  "precision": 3,
                  "token": "HBD"
               },
               "by": "markegiles",
               "script": "QmYSRLiGaEmucSXoNiq9RqazmDuEZmCELRDg4wyE7Fo8kX",
               "name_long": "DLUX Founders",
               "max": 1,
               "pb": ""
            },
            {
               "uid": "QmdBcXSU3bqJMCJpdkmeMPq6wyj4e1yQ2iCKzp91YEZ1YD",
               "set": "dlux",
               "price": 99500,
               "qty": 2,
               "pricenai": {
                  "amount": 99500,
                  "precision": 3,
                  "token": "HIVE"
               },
               "by": "disregardfiat",
               "script": "QmYSRLiGaEmucSXoNiq9RqazmDuEZmCELRDg4wyE7Fo8kX",
               "name_long": "DLUX Founders",
               "max": 2, 
               "pb": ""
            }
         ],
         "qty_sales": 2001,
         "qty_auctions": 0,
         "qty": 2001
      }
   ],
   "node": "dlux-io",
   "behind": 2,
   "VERSION": "v1.4.5"
}
```
### /api/mintsupply/:set
A comprehensive list of FTs from all sources in one set
### /api/pfp/:user
A registered NFT used as their profile picture. API to prove ownership and get the NFT badge on frontends like Peak-D
#### Sample Response
* ``
```json
{
   "result": [
      {
         "pfp": "hf:00", // hive folks - 00
         "nft": {
            "s": "3cLTc," // raw nft data
         },
         "set": { //raw set data
            "a": "hivefolks",
            "b": 0,
            "d": 270,
            "e": "img",
            "f": 591400,
            "i": "86",
            "j": "8q",
            "m": "8X",
            "n": "hf",
            "nl": "Hive Folks",
            "o": "0",
            "p": "hive-folks-launch-announcement-tomorrow-3-pm-utc-1282021",
            "r": 700,
            "ra": "disregardfiat_3000,lordbutterfly_3000,d_4000",
            "s": "QmSPm13knazJsN4C8b7mWqT8tG2CeFCRvbW1PifYZV9dVN",
            "t": 1,
            "u": "abachon,2S_whatsup,3G_5m_4J_lordbutterfly,6b_hetty-rowan,1C_45_75_brianoflondon,4N_5=_0m_7F_7p_acidyo,7E_20_17_ervin-lemark,6m_1g_6P_hivegc,0s_1F_0Q_strawhat,43_tonyz,7Z_7m_jongolson,2y_hiveqa,4Q_5C_5M_taskmaster4450,0p_neoxian,2R_6q_7A_dalz,4X_meesterboom,6M_6s_surya1adiga,1k_1L_4T_trumpman,6r_0t_4l_7b_71_markegiles,5L_mistakili,1P_47_6a_enforcer48,6E_3H_traciyork,7l_6I_5W_basilmarples,65_5O_dagger212,6B_zartisht,24_bil.prag,3E_theb0red1,55_54_elgeko,53_1E_2D_00_disregardfiat,5P_anthonyadavisii,4W_1Q_5y_mcoinz79,1r_5G_0l_oceanbee,4x_jeanlucsr,0I_0z_2T_pusen,2A_mawit07,7V_rufans,4Y_4s_6C_2F_2P_6Z_0V_4k_5g_7c_flauwy,1S_knowhow92,2l_25_3D_hiddenblade,6N_7H_1H_4f_05_82_4g_04_shmoogleosukami,0Z_2X_52_3q_ecoinstant,2O_3Q_4y_snook,3w_0M_0x_2c_7G_chronocrypto,4D_stayoutoftherz,35_57_6=_revisesociology,4E_6+_3F_ecoinstats,3C_77_xawi,1G_56_6n_quintaesencia,4R_olebulls,4U_crimsonclad,7C_1c_8F_mahdiyari,2w_trumpikas,0n_5p_5S_jarvie,7z_2d_1y_namelessnameless,3Z_raymondspeaks,2o_6h_isaria,1n_4z_0w_steemauto,7M_5A_daltono,1d_6O_5D_galenkp,7Q_26_84_michealb,1=_doze,7D_reseller,5l_tarazkp,58_hivefest,1W_steevc,02_gungunkrishu,0P_4C_22_empoderat,4Z_yameen,7q_2C_6Q_63_therealwolf,23_balte,6A_stortebeker,2U_0b_7v_sanjeevm,0f_eddiespino,6U_grisvisa,5o_howweroll,7n_moeenali,1R_3d_penderis,4r_4v_6k_0i_fw206,0O_6z_3v_thebluewin,5H_dreemsteem,70_89_2i_1M_7O_2Q_singhcapital,13_dera123,0r_devan604,2z_pedro83,6p_pandaparker,76_grey580,1T_dandays,0v_5E_1s_4b_59_6F_3z_27_4F_28_69_blocktrades,7I_7T_niallon11,3B_7Y_14_46_2G_pharesim,1l_3t_3l_3y_splatts,2j_01_0c_alpha,2E_detlev,5q_forykw,0o_fredrikaa,48_thethoughtpolice,6i_khan.dayyanz,29_7S_1N_2V_5N_6o_1z_44_7k_4q_ls,2W_steemstreems,8O_hivefolks,06_0+_03_07_08_09_0=_0A_0B_0C_0J_0R_0S_0T_0U_0W_0X_0Y_0a_0g_0j_0k_0q_0u_0y_1+_10_11_12_15_18_19_1A_1B_1D_1I_1J_1K_1O_1U_1V_1X_1Y_1Z_1a_1b_1e_1f_1h_1i_1j_1m_1o_1p_1q_1t_1u_1v_1w_1x_2+_21_2=_2I_2J_2K_2L_2M_2N_2Y_2Z_2b_2e_2f_2g_2h_2k_2m_2n_2p_2q_2r_2s_2t_2u_2v_2x_3+_30_31_33_34_36_37_38_39_3=_3A_3I_3J_3K_3L_3M_3N_3O_3P_3R_3S_3T_3U_3V_3W_3Y_3a_3b_3c_3e_3f_3g_3h_3j_3k_3m_3n_3o_3p_3r_3s_3u_3x_4+_40_41_42_49_4=_4A_4B_4G_4I_4K_4L_4M_4O_4P_4S_4V_4a_4d_4e_4h_4i_4j_4m_4n_4o_4p_4t_4w_5+_50_51_5B_5F_5I_5J_5K_5Q_5R_5T_5U_5V_5Y_5Z_5a_5b_5c_5d_5e_5f_5h_5i_5j_5k_5n_5r_5s_5t_5u_5v_5w_5x_5z_60_61_62_64_66_67_68_6D_6G_6H_6J_6K_6L_6R_6S_6T_6V_6X_6Y_6c_6d_6e_6f_6g_6j_6l_6t_6u_6v_6w_6x_6y_72_73_74_78_79_7B_7J_7K_7L_7N_7P_7R_7U_7X_7a_7g_7h_7i_7o_7t_7u_7x_7y_81_83_85_86_87_88_8A_8B_8D_8E_8G_8J_8K_8L_8M_8N_8P_8Q_8R_8T_8U_D,4u_2a_7j_32_5X_oneup-cartel,2H_ausbitbank,2B_unorgmilitia,3X_dibblers.dabs,4c_meveronicas,0F_myanmarkoko,3i_4H_7W_hh,"
         }
      }
   ],
   "node": "dlux-io",
   "behind": 1,
   "VERSION": "v1.4.5"
}
```
### /api/trades/:kind/:user
List of pending trades per user
* `/api/trades/ft/disregardfiat`
* `/api/trades/nft/disregardfiat`
#### Sample Response
* `/api/trades/ft/disregardfiat`
```json
{
   "result": [
      {
         "from": "disregardfiat",
         "to": "forykw",
         "price": 100000,
         "nai": {
            "amount": 100000,
            "precision": 3
         },
         "item": "dlux:QmPzuKzUqo6zXoLUzXuZvYniR77GuFbJrXgBZvHqWHs6XZ",
         "kind": "fts",
         "set": "dlux",
         "uid": "QmPzuKzUqo6zXoLUzXuZvYniR77GuFbJrXgBZvHqWHs6XZ",
         "script": "QmYSRLiGaEmucSXoNiq9RqazmDuEZmCELRDg4wyE7Fo8kX"
      },
      {
         "from": "disregardfiat",
         "to": "markegiles",
         "price": 1000,
         "nai": {
            "amount": 1000,
            "precision": 3
         },
         "item": "dlux:QmRBgJdCwQjgvmaoL6vrr9ctwaznjfrh9GM754mfPSjxkQ", //fts are given internal IDs will in limbo, these are not UIDs, but are used to accept or reject transfers.
         "kind": "fts",
         "set": "dlux",
         "uid": "QmRBgJdCwQjgvmaoL6vrr9ctwaznjfrh9GM754mfPSjxkQ",
         "script": "QmYSRLiGaEmucSXoNiq9RqazmDuEZmCELRDg4wyE7Fo8kX"
      }
   ],
   "kind": "fts",
   "node": "dlux-io",
   "behind": 1,
   "VERSION": "v1.4.5"
}
```
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

```json
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

