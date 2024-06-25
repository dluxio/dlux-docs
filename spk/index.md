## SPK Network Documentation

### Prerequisites

* [Hive account](https://signup.hive.io/) with resource credits
* SSH private and .pub key for your computer ([Linux/Debian](https://docs.oracle.com/en/cloud/cloud-at-customer/occ-get-started/generate-ssh-key-pair.html)
* Domain Name Registrar such as [Namecheap](https://namecheap.com/) for your IPFS domain names

---

### Generate Node Key Pair
This is an additional key pair. Since you are not creating a new account, these keys are not tied to any Hive user and are merely a cryptographic key pair that will be tied to your SPK account on layer 2.
1. Go to [Account Creator](https://hivetasks.com/account-creator)
2. Type in anything for Account Name and click `Generate`
3. Save the `Active Private` and `Active Public` keys somewhere

---

### Configure IPFS Domain
1. Login to your DNS manager
2. Go to Advanced DNS for the domain name
3.  Add an `A record` subdomain
   - Host: `ipfs` -> `ipfs.example.com`
   - Value: `IP.ADD.RE.SS` of your server

---

### Get Server (Privex)
You may use any server of your choosing. Privex is chosen because it is Hive friendly, [IPFS](https://ipfs.dlux.io/) friendly, and can be paid in Hive or HBD.

Go to [Privex server](https://www.privex.io) or equivalent of your choosing:

1. Choose a server that meets the following requirements:
   - Region: `Allowed to run IPFS` (currently USA & Sweden)
   - Min specs: `Virtual Dual-Core 1GB / 10GB` (check specific community guidelines)
   - Recommend specs:
     * dual core +
     * 2GB RAM +
     * 20GB+ HD This will be how much IPFS storage you can provide to the system.
2. Enter your details
   - Name: `username` or your preference
   - Email: `your@preferen.ce`
   - Server Hostname: `mynodeserver` or your preference
   - Purpose: `Hive Layer 2 Storage`
   - Operating System: `Ubuntu latest` (currently 22.04)
   - SSH Keys: `sshkey.pub`
3. Login to your server
   - Privex will send an email with IP Address and username
   - Open Terminal or equivalent
   - Locate your SSH private key file
   - Type: `ssh -i "sshkey" user@IP.ADD.RE.SS`
   - Add this connection to the list of known hosts 
4. Update packages
   - Type `sudo apt update` to update repos
   - Type `sudo apt upgrade` to upgrade packages
5. Choose how to install;
   - Install Script
---

### Use Install Script

We've provided an install script that will install everything for you on an ubuntu/debian system.

Always always always understand a script: https://github.com/disregardfiat/trole/blob/main/install.sh This will do some system checks, ensure you are not the root user, ask for your domain name (example.com), ask for your hive username, ask for the previously generated keypair... Then installs caddy, ipfs, trole, and postgres and configure them together to collectively become a storage/upload node.

* From the shell/terminal input the following commands from your home directory:
   * Type `sudo apt install git` to install git
   * Type `cd ~ && git clone https://github.com/disregardfiat/trole.git`
   * `cd trole && ./install.sh`

That's it, it should have configured your .env file, https, added services that maintain the programs running, configured ipfs and trole. 