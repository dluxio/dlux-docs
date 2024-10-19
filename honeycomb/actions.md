# Actions Available

## Standard Actions

token_ in the ids is the config.prefix.
dlux_ => dlux_send on DLUX for example

### Send (id: token_send)

This action transfers an liquid TOKEN from one account to another. Account verification must be performed client side.

#### params:
* to = string representing the wallet to receive the transfer
* amount = integer (excluding precision) so 1000 is 1.000 if precision is 3.
* memo = string, not required

#### example:
```json
`json:{
    to: 'alice',
    amount: 1000,
    memo: 'Lunch'
}`
```

### Claim (id: token_claim)

This action moves any earned rewards to the account. 50% Liquid and 50% into either Power (default) or Gov

#### params:
* gov = BOOL if present half of the earned amount will go to the account's GOV balance instead of their POW balance.

#### example:
```json
`json:{
    gov: false,
}`
```

### Claim (id: token_claim)

This action moves any earned rewards to the account. 50% Liquid and 50% into either Power (default) or Gov

#### params:
* gov = BOOL if present half of the earned amount will go to the account's GOV balance instead of their POW balance.

#### example:
```json
`json:{
    gov: false,
}`
```

### Node Add (id: token_node_add)

This action is sent by new nodes to join the network. It can also be used to change node parameters such as their API advertizement. 

#### params:
* domain = string => where to find your public API
* mskey = string => the public MultiSig key (Node does this automatically)
* mschallenge = string => verifies a challenge was signed with the private key matching the public key (node does this automatically)
* bidRate = int => 500 = 5.00% The nodes vote on inflation towards node operators.
* dm = int => 10000 = 100.00% The max dex trade size given the current collateral.
* ds = int => 10000 = 100.00% The max trade slope. For instance at 50% the max trade size of 1/2 the market price is 50% of the collateral. 

#### example:
```json
`json:{
    domain: "token.dlux.io",
    bidRate: 500,
}`
```

### Gov Up (id: token_gov_up)

Move Liquid TOKEN to GOV state

#### params:
* amount = integer (excluding precision) => 1000 is 1.000 if precision is 3.

#### example:
```json
`json:{
    amount: 1000,
}`
```

### Gov Down (id: token_gov_down)

Schedules a withdrawl to liquid from GOV Balance

#### params:
* amount = integer (excluding precision) => 1000 is 1.000 if precision is 3.

#### example:
```json
`json:{
    amount: 1000,
}`
```

### Power Up (id: token_power_up)

Move Liquid TOKEN to Power state

#### params:
* amount = integer (excluding precision) => 1000 is 1.000 if precision is 3.

#### example:
```json
`json:{
    amount: 1000,
}`
```

### Power Down (id: token_power_down)

Schedules a withdrawl to liquid from Power Balance

#### params:
* amount = integer (excluding precision) => 1000 is 1.000 if precision is 3.

#### example:
```json
`json:{
    amount: 1000,
}`
```

### Power Grant (id: token_power_grant)

Delegates Power to a different account. Set amount to 0 to undelegate.

#### params:
* amount = integer (excluding precision) => 1000 is 1.000 if precision is 3.
* to = string 

#### example:
```json
`json:{
    amount: 1000,
    to: "disregardfiat"
}`
```

### Queue For Daily (id: token_queueForDaily)

Allows Multi-Sig holders to put simple news into the daily posts. Near the top.

#### params:
* title = string > Will be a md heading
* text = string > will be placed in a < paragraph >

#### example:
```json
`json:{
    title: "Fearless Leader Recruits Aliens",
    text: "He's done it again, onboarding reaches a new all time high."
}`
```

## DEX and Multi-Sig interactions

### DEX Sell (id: token_dex_sell)

Places a trade for Tokens

#### params:
* config.jsonTokenName : integer (excluding precision) => 1000 is 1.000 if precision is 3.
* hours = int 1 to 720, default 720
* hive OR hbd
* pair = "HBD" or "HIVE" : Builds market orders

#### example:
```json
`json:{
    dlux: 1000,
    pair: "HBD"
}` // market sells 1.000 DLUX for HBD
```

```json
`json:{
    dlux: 1000,
    hbd: 100,
    hours: 24,

}` // Places a limit order of 1.000 DLUX for 0.100 HBD
```

```json
`json:{
    dlux: 1000,
    hive: 100,
    hours: 24,

}` // Places a limit order of 1.000 DLUX for 0.100 HIVE
```

### DEX Buy (HIVE Send with Memo)

Places Market or Limit orders to buy TOKEN

#### params

* amount : Hive or HBD
* to : Multi-Sig Account
* memo: see below

##### memo 

Placed as a JSON.stringify including:

* type : "LIMIT" or "MARKET"
* rate : float, 0.000001 increments


##### memo = IGNORE

And from is a multisig account holder, places HIVE or HBD into the multisig wallet with no further action. Has been used to replace doubled DEX pays in the past.

### DEX Clear (id: token_dex_clear)

Cancels an open DEX order

#### params:
* txid = string > The txid of the open order

#### example:
```json
`json:{
    txid: "DLUXQmakoljfblwsikgblaksjdfgasd",
}`
```

## Autonomous Actions

Several actions occur internally for network coordination. Such as reports, multi-signature submits, and reading account updates. These are not covered here.