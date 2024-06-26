import{_ as e,c as n,o as a,a1 as s}from"./chunks/framework.CSTfz1pA.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"honeycomb/new-node.md","filePath":"honeycomb/new-node.md"}'),o={name:"honeycomb/new-node.md"},t=s(`<h2 id="start-a-new-node" tabindex="-1">Start A New Node <a class="header-anchor" href="#start-a-new-node" aria-label="Permalink to &quot;Start A New Node&quot;">​</a></h2><h3 id="prerequisites" tabindex="-1">Prerequisites <a class="header-anchor" href="#prerequisites" aria-label="Permalink to &quot;Prerequisites&quot;">​</a></h3><ul><li><a href="https://signup.hive.io/" target="_blank" rel="noreferrer">Hive account</a> with ~300 Hive Power worth of Resource Credits available for each node you wish to install</li><li>SSH private and .pub key for your computer (<a href="https://docs.oracle.com/en/cloud/cloud-at-customer/occ-get-started/generate-ssh-key-pair.html" target="_blank" rel="noreferrer">Mac/Linux</a>, <a href="https://docs.joyent.com/public-cloud/getting-started/ssh-keys/generating-an-ssh-key-manually/manually-generating-your-ssh-key-in-windows" target="_blank" rel="noreferrer">Windows</a>)</li><li>Domain Name Registrar such as <a href="https://namecheap.com/" target="_blank" rel="noreferrer">Namecheap</a> for your API domain names</li></ul><hr><h3 id="generate-node-key-pair" tabindex="-1">Generate Node Key Pair <a class="header-anchor" href="#generate-node-key-pair" aria-label="Permalink to &quot;Generate Node Key Pair&quot;">​</a></h3><p>This is like a witness key pair and is additional to your account. Since you are not creating a new account, these keys are not tied to any Hive user and are merely a cryptographic key pair.</p><ol><li>Go to <a href="https://hivetasks.com/account-creator" target="_blank" rel="noreferrer">Account Creator</a></li><li>Type in anything for Account Name and click <code>Generate</code></li><li>Save the <code>Active Private</code> and <code>Active Public</code> keys somewhere</li></ol><p>Repeat these steps for each node you wish to install.</p><hr><h3 id="configure-api-domain" tabindex="-1">Configure API Domain <a class="header-anchor" href="#configure-api-domain" aria-label="Permalink to &quot;Configure API Domain&quot;">​</a></h3><ol><li>Login to your DNS manager</li><li>Go to Advanced DNS for the domain name</li><li>Add an <code>A record</code> subdomain</li></ol><ul><li>Host: <code>username</code> or your preference</li><li>Value: <code>IP.ADD.RE.SS</code> of your server</li></ul><p>Repeat these steps for each node you wish to install.</p><hr><h3 id="get-server-privex" tabindex="-1">Get Server (Privex) <a class="header-anchor" href="#get-server-privex" aria-label="Permalink to &quot;Get Server (Privex)&quot;">​</a></h3><p>You may use any server of your choosing. Privex is chosen because it is Hive friendly, <a href="https://ipfs.dlux.io/" target="_blank" rel="noreferrer">IPFS</a> friendly, and can be paid in Hive or HBD.</p><p>Go to <a href="https://www.privex.io" target="_blank" rel="noreferrer">Privex server</a> or equivalent of your choosing:</p><ol><li>Choose a server that meets the following requirements: <ul><li>Region: <code>Allowed to run IPFS</code> (currently USA &amp; Sweden)</li><li>Min specs: <code>Virtual Dual-Core 1GB / 25GB</code> (check specific community guidelines)</li><li>Recommend specs: one core per node + one core for IPFS</li></ul></li><li>Enter your details <ul><li>Name: <code>username</code> or your preference</li><li>Email: <code>your@preferen.ce</code></li><li>Server Hostname: <code>mynodeserver</code> or your preference</li><li>Purpose: <code>Hive Layer 2</code></li><li>Operating System: <code>Ubuntu latest</code> (currently 20.xx)</li><li>SSH Keys: <code>sshkey.pub</code></li></ul></li><li>Login to your server <ul><li>Privex will send an email with IP Address and username</li><li>Open Terminal or equivalent</li><li>Locate your SSH private key file</li><li>Type: <code>ssh -i &quot;sshkey&quot; user@IP.ADD.RE.SS</code></li><li>Add this connection to the list of known hosts</li></ul></li><li>Update packages and install Docker <ul><li>Type <code>sudo apt update</code> to update repos</li><li>Type <code>sudo apt upgrade</code> to upgrade packages</li><li>Type <code>sudo apt install docker docker-compose</code> to install Docker</li></ul></li><li>Reboot the server <ul><li>Type <code>sudo reboot</code> to reboot if needed</li></ul></li></ol><hr><h3 id="docker-deploy" tabindex="-1">Docker Deploy <a class="header-anchor" href="#docker-deploy" aria-label="Permalink to &quot;Docker Deploy&quot;">​</a></h3><p>Once you have an up-to-date ubuntu server with docker, you can install Honeycomb nodes. Do this by cloning the repo for the community you want to run. You can run multiple nodes on a single server, one CPU core per node is recommended (plus one core for IPFS).</p><ol><li>Clone the appropriate Honeycomb repo and move to its directory</li></ol><ul><li><a href="https://github.com/dluxio/dlux_open_token.git" target="_blank" rel="noreferrer">DLUX:</a> Type <code>git clone https://github.com/dluxio/dlux_open_token.git cd dlux_open_token</code></li><li><a href="https://github.com/3speaknetwork/honeycomb-spkcc.git" target="_blank" rel="noreferrer">SPKCC:</a> Type <code>git clone https://github.com/3speaknetwork/honeycomb-spkcc.git cd honeycomb-spkcc</code></li><li><a href="https://github.com/disregardfiat/honeycomb/tree/ragnarok" target="_blank" rel="noreferrer">DUAT:</a> Type <code>git clone https://github.com/disregardfiat/honeycomb.git &amp;&amp; cd honeycomb &amp;&amp; git checkout ragnarok</code><ul><li>To rename the folder (optional), move back to the home directory and type <code>mv old_folder_name new_folder_name</code></li><li>Move back into the directory after you rename it, type <code>cd new_folder_name</code></li></ul></li></ul><ol start="2"><li>Type <code>touch .env &amp;&amp; nano .env</code> to edit the node attributes <ul><li>Type the following into the text editor:</li></ul></li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># This is an example file. Uncomment and change any variables you would like to override.</span></span>
<span class="line"><span># The HIVE account running the node (defaults to disregardfiat)</span></span>
<span class="line"><span>account=&quot;hiveaccount&quot;</span></span>
<span class="line"><span># The HIVE account active private key</span></span>
<span class="line"><span>active=5JactivePrivateKey</span></span>
<span class="line"><span># Your API public address (deafults to http://dlux-token.herokuapp.com)</span></span>
<span class="line"><span>domain=https://api.yourdomain.com</span></span>
<span class="line"><span># Required for Spkcc Network and DUAT</span></span>
<span class="line"><span>msowner=5KadditionalPrivateKey</span></span>
<span class="line"><span>mspublic=STMpublickey</span></span>
<span class="line"><span># Your API port (defaults to 3001)</span></span>
<span class="line"><span>#PORT=3001</span></span>
<span class="line"><span># Your bidRate (defaults to 2500)</span></span>
<span class="line"><span>#BIDRATE=2500</span></span>
<span class="line"><span># Your History based HIVE node for startup purposes</span></span>
<span class="line"><span>#STARTURL=&lt;HIVE_RPC_Node_with_History&gt;</span></span>
<span class="line"><span># Your blockbased HIVE node for getting blocks and broadcasting transactions</span></span>
<span class="line"><span>#APIURL=&lt;Any_HIVE_RPC_Node&gt;</span></span></code></pre></div><ul><li>Optionally you can include <code>discordwebhook=https://discordapp.com/api/webhooks/NUMB3RS/KeYs</code> to stream the feed into a discord channel</li></ul><ol start="3"><li>Save &amp; exit <ul><li>Type <code>ctrl-x</code> then <code>y</code> to save</li></ul></li><li>Type <code>sudo docker-compose build</code> to build the Docker environment</li><li>Deploy OR install another node</li></ol><h4 id="once-the-environment-is-built-you-can-either-deploy-the-single-node-or-install-more-nodes" tabindex="-1">Once the environment is built, you can either deploy the single node, or install more nodes. <a class="header-anchor" href="#once-the-environment-is-built-you-can-either-deploy-the-single-node-or-install-more-nodes" aria-label="Permalink to &quot;Once the environment is built, you can either deploy the single node, or install more nodes.&quot;">​</a></h4><blockquote><p>Do not deploy if you wish to install another node</p></blockquote><ul><li>Option 1: Type <code>cd ~</code> to return home and clone another repo or configure Docker for multiple nodes</li><li>Option 2: Type <code>sudo docker-compose up</code> to deploy a single node on the server <blockquote><p>If you deploy, you must halt the node before adding any others.</p></blockquote><ul><li>Type <code>sudo docker-compose down</code> to halt a deployed node (necessary to deploy multiple nodes)</li></ul></li></ul><hr><h3 id="configure-multiple-nodes-optional" tabindex="-1">Configure Multiple Nodes (optional) <a class="header-anchor" href="#configure-multiple-nodes-optional" aria-label="Permalink to &quot;Configure Multiple Nodes (optional)&quot;">​</a></h3><p>If you installed more than one node on the server, you need to configure Docker to point to each of them. If you only installed one node, this step is unneccessary as your node is already deployed.</p><blockquote><p>Ensure you are in the home directory by typing <code>cd ~</code> first</p></blockquote><ol><li>Type <code>nano docker-compose.yml</code> to create a new Docker compose</li><li>Paste the following code and modify to suit your needs <ul><li>Update the token and directory to whichever nodes you installed</li><li>Here <code>dlux</code> at <code>./dlux</code>, <code>spkcc</code> at <code>./spkcc</code> and <code>duat</code> at <code>./duat</code> and are being used</li><li>Continue incrementing the ports as needed <code>3001:3001</code>, <code>3002:3001</code>, <code>3003:3001</code>, etc</li></ul></li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>version: &#39;3&#39;</span></span>
<span class="line"><span>services:</span></span>
<span class="line"><span>       ipfs:</span></span>
<span class="line"><span>         image: ipfs/go-ipfs:latest</span></span>
<span class="line"><span>         restart: unless-stopped</span></span>
<span class="line"><span>         ports:</span></span>
<span class="line"><span>           - 4001:4001</span></span>
<span class="line"><span>           - 8080:8080</span></span>
<span class="line"><span>           - 5001:5001</span></span>
<span class="line"><span>         volumes:</span></span>
<span class="line"><span>           - ./staging_dir:/export</span></span>
<span class="line"><span>           - ipfs:/data/ipfs</span></span>
<span class="line"><span>       dlux:</span></span>
<span class="line"><span>         build: ./dlux</span></span>
<span class="line"><span>         restart: unless-stopped</span></span>
<span class="line"><span>         ports:</span></span>
<span class="line"><span>           - &quot;3001:3001&quot;</span></span>
<span class="line"><span>         environment:</span></span>
<span class="line"><span>           - ipfshost=ipfs</span></span>
<span class="line"><span>           - ipfsprotocol=http</span></span>
<span class="line"><span>           - ipfsport=5001</span></span>
<span class="line"><span>         logging:</span></span>
<span class="line"><span>           options:</span></span>
<span class="line"><span>             max-size: &quot;10m&quot;</span></span>
<span class="line"><span>             max-file: &quot;3&quot;</span></span>
<span class="line"><span>         stdin_open: true</span></span>
<span class="line"><span>         tty: true</span></span>
<span class="line"><span>       spkcc:</span></span>
<span class="line"><span>         build: ./spkcc</span></span>
<span class="line"><span>         restart: unless-stopped</span></span>
<span class="line"><span>         ports:</span></span>
<span class="line"><span>           - &quot;3002:3001&quot;</span></span>
<span class="line"><span>         environment:</span></span>
<span class="line"><span>           - ipfshost=ipfs</span></span>
<span class="line"><span>           - ipfsprotocol=http</span></span>
<span class="line"><span>           - ipfsport=5001</span></span>
<span class="line"><span>         logging:</span></span>
<span class="line"><span>           options:</span></span>
<span class="line"><span>             max-size: &quot;10m&quot;</span></span>
<span class="line"><span>             max-file: &quot;3&quot;</span></span>
<span class="line"><span>         stdin_open: true</span></span>
<span class="line"><span>         tty: true</span></span>
<span class="line"><span>       duat:</span></span>
<span class="line"><span>         build: ./duat</span></span>
<span class="line"><span>         restart: unless-stopped</span></span>
<span class="line"><span>         ports:</span></span>
<span class="line"><span>           - &quot;3003:3001&quot;</span></span>
<span class="line"><span>         environment:</span></span>
<span class="line"><span>           - ipfshost=ipfs</span></span>
<span class="line"><span>           - ipfsprotocol=http</span></span>
<span class="line"><span>           - ipfsport=5001</span></span>
<span class="line"><span>         logging:</span></span>
<span class="line"><span>           options:</span></span>
<span class="line"><span>             max-size: &quot;10m&quot;</span></span>
<span class="line"><span>             max-file: &quot;3&quot;</span></span>
<span class="line"><span>         stdin_open: true</span></span>
<span class="line"><span>         tty: true</span></span>
<span class="line"><span>volumes:</span></span>
<span class="line"><span>       ipfs:</span></span></code></pre></div><ol start="3"><li>Save &amp; exit <ul><li>Type <code>ctrl-x</code> then <code>y</code> to save</li></ul></li><li>Type <code>sudo docker-compose build</code> to build the Docker environment</li><li>Type <code>sudo docker-compose up</code> to deploy the Docker environment</li></ol><hr><h3 id="deploy-with-pm2-alternative-to-docker" tabindex="-1">Deploy with Pm2 (Alternative to Docker) <a class="header-anchor" href="#deploy-with-pm2-alternative-to-docker" aria-label="Permalink to &quot;Deploy with Pm2 (Alternative to Docker)&quot;">​</a></h3><p><a href="https://hive.blog/hive-163521/@balaz/step-by-step-guide-to-deploy-and-run-honeycomb-node-without-using-docker" target="_blank" rel="noreferrer">https://hive.blog/hive-163521/@balaz/step-by-step-guide-to-deploy-and-run-honeycomb-node-without-using-docker</a></p><h3 id="nginx-setup" tabindex="-1">Nginx Setup <a class="header-anchor" href="#nginx-setup" aria-label="Permalink to &quot;Nginx Setup&quot;">​</a></h3><p>Finally, install certbot to manage the SSL certificate(s) for the API domain(s)</p><ul><li>If your nodes logs are running, press <code>ctrl-z</code> to move them to the background</li><li>They can be recalled to the foreground by typing <code>fg %1</code></li></ul><ol><li>Type <code>sudo apt install nginx certbot python3-certbot-nginx</code><ul><li>Type <code>y</code> if prompted</li><li>Select <code>nginx-full</code> if prompted</li></ul></li><li>Type <code>sudo nano /etc/nginx/sites-availible/default</code> to edit the config file <ul><li>Modify the file to have one server block per node</li></ul></li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>server{</span></span>
<span class="line"><span>        listen 80;</span></span>
<span class="line"><span>        listen [::]:80;</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        server_name location1.yourdomain.io;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        location / {</span></span>
<span class="line"><span>                        proxy_pass http://127.0.0.1:3001;</span></span>
<span class="line"><span>                        proxy_set_header Host            $host;</span></span>
<span class="line"><span>                        proxy_set_header X-Forwarded-For $remote_addr;</span></span>
<span class="line"><span>                   }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>server{</span></span>
<span class="line"><span>        listen 80;</span></span>
<span class="line"><span>        listen [::]:80;</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        server_name location2.yourdomain.io;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        location / {</span></span>
<span class="line"><span>                        proxy_pass http://127.0.0.1:3002;</span></span>
<span class="line"><span>                        proxy_set_header Host            $host;</span></span>
<span class="line"><span>                        proxy_set_header X-Forwarded-For $remote_addr;</span></span>
<span class="line"><span>                   }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>server{</span></span>
<span class="line"><span>        listen 80;</span></span>
<span class="line"><span>        listen [::]:80;</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        server_name location3.yourdomain.io;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        location / {</span></span>
<span class="line"><span>                        proxy_pass http://127.0.0.1:3003;</span></span>
<span class="line"><span>                        proxy_set_header Host            $host;</span></span>
<span class="line"><span>                        proxy_set_header X-Forwarded-For $remote_addr;</span></span>
<span class="line"><span>                   }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ol start="3"><li>Type <code>sudo nginx -t</code> to check the syntax and test the file</li><li>Type <code>sudo systemctl reload nginx</code></li><li>Ensure your DNS information points to your server and type <code>sudo certbot</code></li></ol><ul><li>Type in your email address to receive renewal notifications</li><li>Agree to terms of service</li><li>Leave blank to select all nodes for certification</li><li>Select option 2 redirect http to https</li></ul><p>To test, visit your subdomain in a browser and verify a secure https connection. You should see your API returning data.</p><hr><h3 id="caddy-setup-alternative-to-nginx" tabindex="-1">Caddy Setup (Alternative to NGINX) <a class="header-anchor" href="#caddy-setup-alternative-to-nginx" aria-label="Permalink to &quot;Caddy Setup (Alternative to NGINX)&quot;">​</a></h3><p>This is not a mandatory step for running your node. If your Docker or Pm2 is already running your node, you are done. This step covers hosting your node using Caddy and associating a domain or sub domain to your node.</p><p><a href="https://stemgeeks.net/hive-163521/@balaz/step-by-step-guide-to-associate-a-domain-or-sub-domain-to-your-honeycomb-spkcc-node-using-caddy" target="_blank" rel="noreferrer">https://stemgeeks.net/hive-163521/@balaz/step-by-step-guide-to-associate-a-domain-or-sub-domain-to-your-honeycomb-spkcc-node-using-caddy</a></p><h3 id="governance-and-voting" tabindex="-1">Governance And Voting <a class="header-anchor" href="#governance-and-voting" aria-label="Permalink to &quot;Governance And Voting&quot;">​</a></h3><p>Now that you have a functioning node running, go to <a href="https://vue.dlux.io/dex" target="_blank" rel="noreferrer">dlux.io/dex</a> and choose the token for the community node you installed. Login with the account matching the node <code>.env</code> file.</p><p>If your node has successfully called out, it will bid the state unlocking some new options in the black menu bar at the top:</p><ul><li>A small gear will be visible</li><li>A governance balance will be visible</li></ul><p>Clicking the gear icon opens your vote form (fields are community specific):</p><ul><li>Domain: Your API domain name <code>required</code></li><li>DEX Fee: Vote for how high the transaction fee should be up to 1%</li><li>DEX Max: Vote for the max size relative to the safety limit</li><li>DEX Slope: Vote for the penalty for rates under the tick</li><li>DOA Claim: Vote for the relative size of tokens allocated into the SPK DAO</li></ul><p>Clicking the governance balance opens a form:</p><ul><li>Note the current threshold for becoming a node runner</li><li>Choose how much of your token balance to lock in governance</li></ul><p>The DEX page also shows the token status, along with how many node runners there are. Clicking the status opens the table of runners:</p><ul><li>Node runners are listed in order of locked governance tokens</li><li>There is a max of 25 runners</li><li>The governance threshold is the average of the poorer half of the runners</li><li>Click the API of a runner to load it as the data source for the DEX page</li></ul><hr><h3 id="status" tabindex="-1">Status <a class="header-anchor" href="#status" aria-label="Permalink to &quot;Status&quot;">​</a></h3><p>The pizza team maintains dashboards for the status of Honeycomb tokens. You can see stats here, including whether your node is in concensus, a runner, how much locked governance token it has, and vote status.</p><ul><li><a href="https://hiveuprss.github.io/dluxmonitor/" target="_blank" rel="noreferrer">DLUX Monitor - https://hiveuprss.github.io/dluxmonitor/</a></li><li><a href="https://hiveuprss.github.io/spkccmonitor/" target="_blank" rel="noreferrer">SPKCC Monitor - https://hiveuprss.github.io/spkccmonitor/</a></li><li><a href="https://hiveuprss.github.io/duatmonitor/" target="_blank" rel="noreferrer">DUAT Monitor - https://hiveuprss.github.io/duatmonitor/</a></li></ul>`,66),i=[t];function l(p,r,c,d,u,h){return a(),n("div",null,i)}const g=e(o,[["render",l]]);export{m as __pageData,g as default};
