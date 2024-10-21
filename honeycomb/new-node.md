## Start A New Node

### Prerequisites

* [Hive account](https://signup.hive.io/) with ~300 Hive Power worth of Resource Credits available for each node you wish to install
* SSH private and .pub key for your computer ([Mac/Linux](https://docs.oracle.com/en/cloud/cloud-at-customer/occ-get-started/generate-ssh-key-pair.html), [Windows](https://docs.joyent.com/public-cloud/getting-started/ssh-keys/generating-an-ssh-key-manually/manually-generating-your-ssh-key-in-windows))
* Domain Name Registrar such as [Namecheap](https://namecheap.com/) for your API domain names

---

### Generate Node Key Pair
This is like a witness key pair and is additional to your account. Since you are not creating a new account, these keys are not tied to any Hive user and are merely a cryptographic key pair.
1. Go to [Account Creator](https://hivetasks.com/account-creator)
2. Type in anything for Account Name and click `Generate`
3. Save the `Active Private` and `Active Public` keys somewhere

Repeat these steps for each node you wish to install.

---

### Configure API Domain
1. Login to your DNS manager
2. Go to Advanced DNS for the domain name
3.  Add an `A record` subdomain
   - Host: `username` or your preference
   - Value: `IP.ADD.RE.SS` of your server

Repeat these steps for each node you wish to install.

---

### Get Server (Privex)
You may use any server of your choosing. Privex is chosen because it is Hive friendly, [IPFS](https://ipfs.dlux.io/) friendly, and can be paid in Hive or HBD.

Go to [Privex server](https://www.privex.io) or equivalent of your choosing:

1. Choose a server that meets the following requirements:
   - Region: `Allowed to run IPFS` (currently USA & Sweden)
   - Min specs: `Virtual Dual-Core 1GB / 25GB` (check specific community guidelines)
   - Recommend specs: one core per node + one core for IPFS
2. Enter your details
   - Name: `username` or your preference
   - Email: `your@preferen.ce`
   - Server Hostname: `mynodeserver` or your preference
   - Purpose: `Hive Layer 2`
   - Operating System: `Ubuntu latest` (currently 20.xx)
   - SSH Keys: `sshkey.pub`
3. Login to your server
   - Privex will send an email with IP Address and username
   - Open Terminal or equivalent
   - Locate your SSH private key file
   - Type: `ssh -i "sshkey" user@IP.ADD.RE.SS`
   - Add this connection to the list of known hosts 
4. Update packages and install Docker
   - Type `sudo apt update` to update repos
   - Type `sudo apt upgrade` to upgrade packages
   - Type `sudo apt install docker docker-compose` to install Docker
5. Reboot the server
   - Type `sudo reboot` to reboot if needed

---

### Docker Deploy
Once you have an up-to-date ubuntu server with docker, you can install Honeycomb nodes. Do this by cloning the repo for the community you want to run. You can run multiple nodes on a single server, one CPU core per node is recommended (plus one core for IPFS).

1. Clone the appropriate Honeycomb repo and move to its directory
- [DLUX:](https://github.com/dluxio/dlux_open_token.git) Type `git clone https://github.com/dluxio/dlux_open_token.git cd dlux_open_token`
- [SPKCC:](https://github.com/3speaknetwork/honeycomb-spkcc.git) Type `git clone https://github.com/3speaknetwork/honeycomb-spkcc.git cd honeycomb-spkcc`
- [DUAT:](https://github.com/disregardfiat/honeycomb/tree/ragnarok) Type `git clone https://github.com/disregardfiat/honeycomb.git && cd honeycomb && git checkout ragnarok`
    - To rename the folder (optional), move back to the home directory and type `mv old_folder_name new_folder_name`
    - Move back into the directory after you rename it, type `cd new_folder_name`

2. Type `touch .env && nano .env` to edit the node attributes
   - Type the following into the text editor: 
```sh
# This is an example file. Uncomment and change any variables you would like to override.
# The HIVE account running the node (defaults to disregardfiat)
account="hiveaccount"
# The HIVE account active private key
active=5JactivePrivateKey
# Your API public address (deafults to http://dlux-token.herokuapp.com)
domain=https://api.yourdomain.com
# Required for Spkcc Network and DUAT
msowner=5KadditionalPrivateKey
mspublic=STMpublickey
# Your API port (defaults to 3001)
#PORT=3001
# Your bidRate (defaults to 2500)
#BIDRATE=2500
# Your History based HIVE node for startup purposes
#STARTURL=<HIVE_RPC_Node_with_History>
# Your blockbased HIVE node for getting blocks and broadcasting transactions
#APIURL=<Any_HIVE_RPC_Node>
```
   - Optionally you can include `discordwebhook=https://discordapp.com/api/webhooks/NUMB3RS/KeYs` to stream the feed into a discord channel
3. Save & exit
   - Type `ctrl-x` then `y` to save
4. Type `sudo docker-compose build` to build the Docker environment
5. Deploy OR install another node
#### Once the environment is built, you can either deploy the single node, or install more nodes.
   > Do not deploy if you wish to install another node
   - Option 1: Type `cd ~` to return home and clone another repo or configure Docker for multiple nodes
   - Option 2: Type `sudo docker-compose up` to deploy a single node on the server
       > If you deploy, you must halt the node before adding any others.
       - Type `sudo docker-compose down` to halt a deployed node (necessary to deploy multiple nodes)

---

### Configure Multiple Nodes (optional)
If you installed more than one node on the server, you need to configure Docker to point to each of them. If you only installed one node, this step is unneccessary as your node is already deployed.

> Ensure you are in the home directory by typing `cd ~` first

1. Type `nano docker-compose.yml` to create a new Docker compose
2. Paste the following code and modify to suit your needs
   - Update the token and directory to whichever nodes you installed
   - Here `dlux` at `./dlux`, `spkcc` at `./spkcc` and `duat` at `./duat` and are being used
   - Continue incrementing the ports as needed `3001:3001`, `3002:3001`, `3003:3001`, etc
```yaml
version: '3'
services:
       ipfs:
         image: ipfs/go-ipfs:latest
         restart: unless-stopped
         ports:
           - 4001:4001
           - 8080:8080
           - 5001:5001
         volumes:
           - ./staging_dir:/export
           - ipfs:/data/ipfs
       dlux:
         build: ./dlux
         restart: unless-stopped
         ports:
           - "3001:3001"
         environment:
           - ipfshost=ipfs
           - ipfsprotocol=http
           - ipfsport=5001
         logging:
           options:
             max-size: "10m"
             max-file: "3"
         stdin_open: true
         tty: true
       spkcc:
         build: ./spkcc
         restart: unless-stopped
         ports:
           - "3002:3001"
         environment:
           - ipfshost=ipfs
           - ipfsprotocol=http
           - ipfsport=5001
         logging:
           options:
             max-size: "10m"
             max-file: "3"
         stdin_open: true
         tty: true
       duat:
         build: ./duat
         restart: unless-stopped
         ports:
           - "3003:3001"
         environment:
           - ipfshost=ipfs
           - ipfsprotocol=http
           - ipfsport=5001
         logging:
           options:
             max-size: "10m"
             max-file: "3"
         stdin_open: true
         tty: true
volumes:
       ipfs:
```
3. Save & exit
   - Type `ctrl-x` then `y` to save
4. Type `sudo docker-compose build` to build the Docker environment
5. Type `sudo docker-compose up` to deploy the Docker environment

---

### Deploy with Pm2 (Alternative to Docker)

https://hive.blog/hive-163521/@balaz/step-by-step-guide-to-deploy-and-run-honeycomb-node-without-using-docker

### Nginx Setup
Finally, install certbot to manage the SSL certificate(s) for the API domain(s)

- If your nodes logs are running, press `ctrl-z` to move them to the background
- They can be recalled to the foreground by typing `fg %1`

1. Type `sudo apt install nginx certbot python3-certbot-nginx`
   - Type `y` if prompted
   - Select `nginx-full` if prompted
2. Type `sudo nano /etc/nginx/sites-availible/default` to edit the config file
   - Modify the file to have one server block per node
```js
server{
        listen 80;
        listen [::]:80;
        
        server_name location1.yourdomain.io;

        location / {
                        proxy_pass http://127.0.0.1:3001;
                        proxy_set_header Host            $host;
                        proxy_set_header X-Forwarded-For $remote_addr;
                   }
}
server{
        listen 80;
        listen [::]:80;
        
        server_name location2.yourdomain.io;

        location / {
                        proxy_pass http://127.0.0.1:3002;
                        proxy_set_header Host            $host;
                        proxy_set_header X-Forwarded-For $remote_addr;
                   }
}
server{
        listen 80;
        listen [::]:80;
        
        server_name location3.yourdomain.io;

        location / {
                        proxy_pass http://127.0.0.1:3003;
                        proxy_set_header Host            $host;
                        proxy_set_header X-Forwarded-For $remote_addr;
                   }
}
```
3. Type `sudo nginx -t` to check the syntax and test the file 
4. Type `sudo systemctl reload nginx`
5.  Ensure your DNS information points to your server and type `sudo certbot`
   - Type in your email address to receive renewal notifications
   - Agree to terms of service
   - Leave blank to select all nodes for certification
   - Select option 2 redirect http to https

To test, visit your subdomain in a browser and verify a secure https connection. You should see your API returning data.

---

### Caddy Setup (Alternative to NGINX)

This is not a mandatory step for running your node. If your Docker or Pm2 is already running your node, you are done. This step covers hosting your node using Caddy and associating a domain or sub domain to your node. 

https://stemgeeks.net/hive-163521/@balaz/step-by-step-guide-to-associate-a-domain-or-sub-domain-to-your-honeycomb-spkcc-node-using-caddy

### Governance And Voting
Now that you have a functioning node running, go to [dlux.io/dex](https://vue.dlux.io/dex) and choose the token for the community node you installed. Login with the account matching the node `.env` file.

If your node has successfully called out, it will bid the state unlocking some new options in the black menu bar at the top:
   - A small gear will be visible
   - A governance balance will be visible

Clicking the gear icon opens your vote form (fields are community specific):
   - Domain: Your API domain name `required`
   - DEX Fee: Vote for how high the transaction fee should be up to 1%
   - DEX Max: Vote for the max size relative to the safety limit
   - DEX Slope: Vote for the penalty for rates under the tick
   - DOA Claim: Vote for the relative size of tokens allocated into the SPK DAO

Clicking the governance balance opens a form:
   - Note the current threshold for becoming a node runner
   - Choose how much of your token balance to lock in governance

The DEX page also shows the token status, along with how many node runners there are. Clicking the status opens the table of runners:
   - Node runners are listed in order of locked governance tokens
   - There is a max of 25 runners
   - The governance threshold is the average of the poorer half of the runners
   - Click the API of a runner to load it as the data source for the DEX page

---

### Status
The pizza team maintains dashboards for the status of Honeycomb tokens. You can see stats here, including whether your node is in concensus, a runner, how much locked governance token it has, and vote status.
- [DLUX Monitor - https://hiveuprss.github.io/dluxmonitor/](https://hiveuprss.github.io/dluxmonitor/)
- [SPKCC Monitor - https://hiveuprss.github.io/spkccmonitor/](https://hiveuprss.github.io/spkccmonitor/)
- [DUAT Monitor - https://hiveuprss.github.io/duatmonitor/](https://hiveuprss.github.io/duatmonitor/)
