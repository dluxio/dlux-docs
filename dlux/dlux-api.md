dlux is the ultimate HIVE blockchain infrastructure. Not only does it publish any type of dApp you can imagine to the chain, it allows those posts to make posts!

## Token API
Read-only, allows you to see token stats
```javascript
api:port/markets //json markets (has list of api's)
api:port/stats //json stats
api:port/@username //json balances
```
Writen via customJSON messages.

## Post API
The following API allows users of your dApp to request to post new content to dlux: 
* Triggering the following code from the XR container will prompt the dApp user to make a HIVE post
```javascript
window.parent.postMessage({
            'func': 'advPost',
            'message': postData
          }, "*");
```
```javascript
var postData = {
          title: title, //required
          body: body, //required
          permlink: permLink, //optional: will autogenerate if not supplied
          parentAuthor: '', //optional: make comments
          parentPermlink: '', //optional: make comments | change categories
          beneficiaries: {disregardfiat:1000, markegiles:1000}, //optional: incentivize yourself. (Max 3000)
          customJSON: JSON.stringify({
            tags: otherTags, // you are responsible for tags
            subApp: 'SuperCraftLoader/v0.1', //name the application that will be posted
            xr: false, //if you'd like the XR interface or 
            vrHash: 'QmbDb84sAVJYYw7qHFwiX88QRswWu8d7sf4Wr5sYWHSzJZ', //an ar or vr hash must be specified
            appSpecificData: userVar //anything else needed to make the dApp work
          }),
        }
```
On the user's side a few items will be added to this data, such as the dlux main app and dlux beneficiary information as well as an "attorney" so users will be able to see which users dApp helped them make a this post.
