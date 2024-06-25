import{_ as e,c as t,o as i,a1 as o}from"./chunks/framework.CSTfz1pA.js";const h=JSON.parse('{"title":"HoneyComb","description":"","frontmatter":{},"headers":[],"relativePath":"honeycomb/index.md","filePath":"honeycomb/index.md"}'),n={name:"honeycomb/index.md"},a=o('<h1 id="honeycomb" tabindex="-1">HoneyComb <a class="header-anchor" href="#honeycomb" aria-label="Permalink to &quot;HoneyComb&quot;">​</a></h1><p>This is a Decentralized Autonomous Organization built on the HIVE ecosystem. Customize it as you need</p><p>Powering: dlux.io (DLUX), and the 3speak.tv (SPK Claim Chain)</p><p>This software builds a network of peers that use HIVE to post and interpret transactions. This allows these peers to come to a consensus and elect peers to run tasks. Distributing computing in this way allows a vast amount of potential applications, DeFi, and oracle services. By distributing authority to perform transactions we can have a frictionless(no intermediate tokens, no central authority, no intrinsic fees) way to cross asset boundaries(HIVE/COMB) with no information asymmetries, ie Finance without securities by definition... just free speech: As no party is required to perfom any function, or prevented from performing any function, no promises are made by peers. Network Incentives (COMB) alone are enough to maintain trust.</p><ul><li>Send: Use custom_json with active permission, &quot;ACJ&quot; to send OPEN_TOEK tokens</li><li>Illiquid voting state. Power up and down TOKEN for voting and delegation with ACJ</li><li>Illiquid governance token for determining consensus and collateral.</li><li>Chron to execute virtual operations: expire trades, powerdown stake, enforce penalties etc...</li><li>Hive posts that benefit the configured account at &gt; the configured % are: <ul><li>entered into a voting eligible content pool</li><li>optionally have their IPFS content pinned with rtrades(3rd party service)</li><li>can be programmed for any other function</li></ul></li><li>Users can vote on content with weight, using custom json with posting permissions.</li><li>Have a daily pool of 10 full votes, and 1 in 10000 fine control of voting stake.</li><li>State is saved to IPFS every 5 minutes for fast automatic starts and restarts, also used to determine consensus</li><li>LevelDB with custom transactional handlers for transactional writes</li><li>JSON express server API</li><li>Token sales from the configured account with HIVE transfers</li><li>Token sales set with pricing feedback.</li><li>2/3rds consensus algorithm</li><li>automatic messaging to join network ad-hoc</li><li>ability to delete node from list(turn off escrow queue)</li><li>report consensus</li><li>distribute TOKENS to configured account delegators and keep running total <ul><li>Used for auto voting on content with delegation</li></ul></li><li>pay nodes for processing trusted state, facilitating an escrow/dex transaction or running a smart contract. <ul><li>Effectively mining TOKENS with Hive Resource Credits</li></ul></li><li>establishes a 5%(configurable) inflation rate and distributes rewards to run the network</li><li>Automated accounting post from configured account or mirrors</li><li>Track interactions on a rolling feed via block_num and TXID.</li><li>Automates IPFS pinning for OPEN_TOKEN votable content from configured account or mirrors</li><li>2 way DEX <ul><li>HIVE:OPEN_TOKEN &amp; HBD:OPEN_TOKEN pairs</li><li>On state trade history with daily reductions to high/low/volume</li><li>Price/collateral controls from Volume Weighted Moving Average</li><li>Enforcement of collateral</li></ul></li><li>Partial fills of DEX orders <code>1.0.0</code></li><li>Multi-signature deterministic control of community capital</li><li>NFT/smart contract system</li></ul><hr><p>This software is meant to be run as a public API for decentralized token data.</p><p>While it runs it verifies other nodes are operating correctly and confirms this by posting a customJson transaction to Hive. 288(configurable) messages will be required per day per node operator. More Resource Credits will be required to handle escrow transactions and transfers.</p><p>Deploy from heroku or similar and set ENV variables with a hive name and active key. Deploy from home computer for maximum account security.</p><ul><li><code>account</code> - dlux-io</li><li><code>active</code> - active posting key (will run escrow transactions for rewards) !! <em>caution while in testing</em> !!</li><li><code>domain</code> - <code>https://&lt;token-api&gt;.&lt;a-domain&gt;.com</code> or <code>http://&lt;static-ip&gt;:&lt;port&gt;</code></li></ul>',10),r=[a];function s(l,c,d,u,m,p){return i(),t("div",null,r)}const g=e(n,[["render",s]]);export{h as __pageData,g as default};