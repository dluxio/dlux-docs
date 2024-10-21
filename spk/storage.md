# SPK Network Storage

## Storing Files

You can build a storage contract backed by broca for the SPK Network. The difference between storing files for yourself(loading into IPFS) and storing on SPK network is mostly down to proving providence. This is so everybody who stores your files knows that you are ultimately responsible for what was uploaded.

Any SpkNetwork wallet should be able to help you build a file storage contract, explained below.

A Contract is between up to 3 parties as follows. A buyer, noted below as "your-account". A broker, responsible for placing a file into IPFS and updating a channel as complete(full of files). An Uploader, who will send a file to the broker. These three roles can all be the same account. A custom JSON must by signed with the folowing data.

## Unconditional
```js
id: spkcc_channel_open
json: {
  "broca": 100,
  "broker": "dlux-io",
  "to": "any-account",
  "contract": "0"
}
required_auths: [
  "your-account"
]
```
* id: spkcc_channel_open
   * The address of the smart contract
* "broca": 100
   * channel_bytes is the amount of bytes per Broca
   * channel_min is the minimum Broca to open a contract (spam filter)
   * Found at [/stats](https://spktest.dlux.io/stats)
   * @your-account must currently have this amount of Broca
* "broker": "dlux-io"
   * This account must have a registers IPFS service
   * Found at [/services/IPFS](https://spktest.dlux.io/services/IPFS)
* "to": "any-account"
   * This account must have a registered PubKey (for signing the upload offchain)
* "contract": "0"
   * Unconditional Contract
## Conditional
```js
id: spkcc_channel_open
json: {
  "broca": 30000,
  "broker": "dlux-io",
  "to": "disregardfiat",
  "contract": "1",
  "slots": "an-account,1000"
}
required_auths: [
  "your-account"
]
```
* Same as above with Contract Information
* "contract": "1"
   * Conditional Contract
   * Requires "slots" for the conditions
* "slots": "an-account,1000"
   * Any Hive Account before the comma
   * A percent (acctually a per 10 mil) => 1000 = 10.00%
* The condition for type 1 is a Hive post must be made with a beneficiary to "an-account" with at least xxxx fee.
   * "dlux-io,500" => 5% to @dlux-io
   * "spknetwork,1111" => 11.11% to @spknetwork

## And Then
Frontends or your localhost:5050 wallet should be able to see the open contract, and allow an upload to occur. The files must be signed by the uploader, who will verify the uploaded files match the signature, and forward that signature along with theirs to update the network about where the file(s) are stored.