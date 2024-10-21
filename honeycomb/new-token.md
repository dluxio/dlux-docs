# Create A New Token

Use the [token creator](https://www.dlux.io/new/token) to help set up a multi-sig account and configure the community variables.

As of version 1.5 community variables are stored in the profile data of the DEX account, allowing the community to change variables with voting and not having to worry about keeping nodes configured.

The following are an explanation of the Community Variables, that will be part of the Token Creators output. Only the initializing account will need to run these, everybody else will just have to put:
`msaccount=dlux-cc` in their .env, the name of the multi-sig account... normally tokenname-cc

## The Variables
```js
const starting_block = 49988008; //from what block does your token start
const prefix = 'dlux_' //Community token name for Custom Json IDs
const TOKEN = 'DLUX' //Token name
const precision = 3 //precision of token 3 => 1.000
const tag = 'dlux' //the front-end.com/<tag>/@<leader>/<permlink>
const jsonTokenName = 'dlux' //what customJSON in Escrows and sends is looking for
const leader = 'dlux-io' //The first account to run a node
const ben = 'dlux-io' //if features.pobTag is false, this account must have benificary reward set (hive reward share model)
// This account will... if controled by a node, vote on content so it will earn both honeycomb and hive rewards
const delegation = 'dlux-io' //account people can delegate to for rewards
const delegationWeight = 1000 //when to trigger community rewards with bens => 1000 = 10.00%
const msaccount = 'dlux-cc' //account controlled by community leaders ie. DEX account
const msPubMemo = 'STM5GNM3jpjWh7Msts5Z37eM9UPfGwTMU7Ksats3RdKeRaP5SveR9' //memo key for msaccount
const msPriMemo = '5KDZ9fzihXJbiLqUCMU2Z2xU8VKb9hCggyRPZP37aprD2kVKiuL' //allows signed messages to the community verifiable offchain. unimplemented currently
const msmeta = '' //profile data for DEX account. Will auto generate this list.
const mainAPI = 'token.dlux.io' //leaders API probably
const mainRender = 'data.dlux.io' //pob index data and nft render server
const mainFE = 'dlux.io' //frontend for content
const mainIPFS = 'a.ipfs.dlux.io' //IPFS service
const mainICO = 'robotolux' //Account collecting ICO HIVE - not supported
const hive_service_fee = 100 //HIVE service fee for transactions in Hive/HBD in centipercents (1% = 100) Hive NFT auctions for example
const features = {
    pob: true, //proof of brain
    pobTag: false, //accept PoB on posts with config.tag
    delegate: true, //delegation - unsupported
    daily: true, // daily post
    liquidity: true, //liquidity - unsupported
    ico: true, //ico - unsupported
    inflation: true, // uses a value in stats to mint new tokens
    dex: true, //dex
    nft: true, //nfts
    state: true, //api dumps - useful for testing
    claimdrop: false //claim drops - unsupported
}
const footer = `\n[Find us on Discord](https://discord.gg/Beeb38j)` // last section of the daily post
const adverts = [
    'https://camo.githubusercontent.com/954558e3ca2d68e0034cae13663d9807dcce3fcf/68747470733a2f2f697066732e627573792e6f72672f697066732f516d64354b78395548366a666e5a6748724a583339744172474e6b514253376359465032357a3467467132576f50'
] // a list of pictures to cycle through in daily status posts.
```
## API Details
This will populate a CoinMarketCap compliant API with the token details. Name, SYMBOL, Icon, Supply Info, Whitepaper, Website, BlockExplorer, Info Text.
```js
const detail = {
                name: 'Decentralized Limitless User eXperiences',
                symbol: TOKEN,
                icon: 'https://www.dlux.io/img/dlux-hive-logo-alpha.svg',
                supply:'5% Fixed Inflation, No Cap.',
                wp:`https://docs.google.com/document/d/1_jHIJsX0BRa5ujX0s-CQg3UoQC2CBW4wooP2lSSh3n0/edit?usp=sharing`,
                ws:`https://www.dlux.io`,
                be:`https://hiveblockexplorer.com/`,
                text: `DLUX is a Web3.0 technology that is focused on providing distribution of eXtended (Virtual and Augmented) Reality. It supports any browser based applications that can be statically delivered through IPFS. The DLUX Token Architecture is Proof of Stake as a layer 2 technology on the HIVE blockchain to take advantage of free transactions. With the first WYSIWYG VR Builder of any blockchain environment and the first Decentralized Exchange on the Hive Blockchain, DLUX is committed to breaking any boundaries for adoption of world changing technologies.`
            }
```
## Smart Contracts
Smart Contracts go here. These are a little more advanced, but anything here will replace the current version. Discussed on their own.
```js
const CustomJsonProcessing = []
const CustomOperationsProcessing = []
const CustomAPI = []
const CustomChron = []
```
## Dynamic UI
Last, a feature model can drive dynamically updating User Interfaces (UI) on compliant websites like DLUX IO
```js
const featuresModel = {
            claim_id: 'claim',
            claim_S: 'Airdrop',
            claim_B: false,
            claim_json: 'drop',
            rewards_id: 'claim',
            rewards_S: 'Rewards',
            rewards_B: true,
            rewards_json: 'claim',
            rewardSel: true,
            reward2Gov: true,
            send_id: 'send',
            send_S: 'Send',
            send_B: true,
            send_json: 'send',
            powup_id: 'power_up',
            powup_B: true,
            pow_val: '',
            powdn_id: 'power_down',
            powdn_B: true,
            powsel_up: true,
            govup_id: 'gov_up',
            govup_B: true,
            gov_val: '',
            govsel_up: true,
            govdn_id: 'gov_down',
            govdn_B: true,
            node: {
              id: 'node_add',
              opts: [{
                  S: 'Domain',
                  type: 'text',
                  info: 'https://no-trailing-slash.com',
                  json: 'domain',
                  val: ''
                },
                {
                  S: 'DEX Fee Vote',
                  type: 'number',
                  info: '500 = .5%',
                  max: 1000,
                  min: 0,
                  json: 'bidRate',
                  val: ''
                },
                {
                  S: 'DEX Max Vote',
                  type: 'number',
                  info: '10000 = 100%',
                  max: 10000,
                  min: 0,
                  json: 'dm',
                  val: ''
                },
                {
                  S: 'DEX Slope Vote',
                  type: 'number',
                  info: '10000 = 100%',
                  max: 10000,
                  min: 0,
                  json: 'ds',
                  val: ''
                }
              ],
            }
          }
          ```