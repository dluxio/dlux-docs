# dlux Builder 

Integrated with Glitch for free & easy remixing, prototyping, and publishing.

## Add 3D Model
Models must be in glTF format (unpacked `.gltf`, embedded `.gltf`, binary `.glb`)

Use [https://blackthread.io/gltf-converter/](https://blackthread.io/gltf-converter/) to convert other formats to glTF.

1. Click `Add 3D Model`
2. Set your options
3. Drag-and-drop all required files



## Add Images
Max photo resolution is 4096px, and must be in power of 2, such as 512x512px, or 1024x512px (`.png` or `.jpg`)

1. Click `Add Images`
2. Set your options
3. Drag and drop photos (no limit)

If `[X] Add to scene` is checked, the photos dropped in will be applied to box geometry and inserted into your scene. You can then use the inspector to place the photos in your scene.

## Description
Posting to HIVE requires a Title, Body, and Tags. This allows your experience to be discovered and enjoyed by others on the network. Get a HIVE Account.

## Views
We offer the following views:
- Glitch: modify the code in each file of your experience
- dlux Builder: adds a toolbar to the Glitch view
- Asset Upload: Drag-&-Drop asset well
- App View: Live build of your app

Glitch is a collaborative development environment that allows users to quickly duplicate and modify apps. We've built on top of this to offer a social XR boilerplate with drag-and-drop asset upload and HIVE publishing.

**We recommend creating a Glitch account so you can keep track of all your apps and collaborate easily.**

The dlux vr boilerplate is accessible on Glitch here: 

```
App URL: dlux-vr.glitch.me

Build URL: dlux-vr.glitch.me/build.html
```
Remixing it will produce a new, random project-name. Start by remixing the dlux-vr boilerplate above, or any other project posted to dlux.

### Remix a dlux experience on Glitch
1. Click `Remix to edit 🎤` 
2. Click `Show Live 🕶`
3. Click onto the experience to activate it
4. Press `ctl + alt + i` to open the inspector
5. Click the rocket button 🚀

### Remix any experience on dlux
1. Open an XR post on dlux
2. Click onto the experience to activate it
3. Press `ctl + alt + i` to open the inspector
4. Click the rocket button 🚀
5. Follow 1-5 above to remix

### Setup your Glitch options:
  - [ ] Change Theme (user preference)
  - [ ] Refresh App on Changes _**OFF**_
  - [X] Wrap Text _**ON**_

![Screen Shot 2018-07-22 at 3.50.05 PM.png](https://ipfs.busy.org/ipfs/QmTRrAMwyFMN3cyfZUQ3Tx3t9HuSe5Ar2eVMQEuJd79du3)

##

![Screen Shot 2018-07-22 at 4.30.18 PM.png](https://ipfs.busy.org/ipfs/QmetjwhEi1tZDA47iQRNZiQmTBtD77wHQxJQ8YokrK8Ldn)

  * On the left you have a Glitch instance which is collaborative, auto-saves, and has the ability to rewind your code.

  * On the right you have a running version of your app. Changes made to the code on the left are not shown on the right until you click the `Refresh App` button at the top.

  * At the bottom is the browsers web inspector.

#### If you need to edit the HIVE post that contains your dApp, such as update the preview images or html, follow these steps:
* Ensure you are logged in as the owner of the dApp(the username that posted it)
* Navigate to your dapp on dlux.io or localhost
* `/dlux/@username/permLink` in the address bar needs to be changed to `/post/edit/@username/permLink`
  * Now you have the screen to change the metadata that is the ipfs reference to your app. As well as the title and blog post. 

Press Submit at the bottom and your HIVEpost will be updated. This action takes Resource Credits.
Once you're happy with how your app is working, you need to generate the preview so others know what they're clicking on.

For the blog, you need a traditional preview image, and for the portal inside dlux that goes to your experience, you need a 360 preview image.

1. Take a 16x9 traditional photo for the HIVE blog entry by pressing **Ctl-Alt-S**

2. Take a 360 photo for the portal preview by pressing **Ctl-Alt-Shift-S**
