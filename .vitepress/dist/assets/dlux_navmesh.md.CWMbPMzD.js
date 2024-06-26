import{_ as s,c as i,o as a,a1 as t}from"./chunks/framework.C2mR__yb.js";const c=JSON.parse('{"title":"What & Why","description":"","frontmatter":{},"headers":[],"relativePath":"dlux/navmesh.md","filePath":"dlux/navmesh.md"}'),n={name:"dlux/navmesh.md"},e=t(`<h1 id="what-why" tabindex="-1">What &amp; Why <a class="header-anchor" href="#what-why" aria-label="Permalink to &quot;What &amp; Why&quot;">​</a></h1><p>As the player moves around the world, we must define where the player may and may not go. The best way to achieve high performance is by defining a navmesh.</p><blockquote><p>A navigation mesh, or navmesh, is an abstract data structure used in artificial intelligence applications to aid agents in pathfinding through complicated spaces. This approach has been known since at least the mid-1980s in robotics, where it has been called a meadow map, and was popularized in video game AI in 2000. <a href="https://en.wikipedia.org/wiki/Navigation_mesh" target="_blank" rel="noreferrer"><em>Wikipedia</em></a></p></blockquote><p>A navmesh is a simplified version of the floor, and can be used for collision detection with teleportation controls, as well as constraining movement controls.</p><h3 id="built-into-dlux" tabindex="-1">Built into dlux <a class="header-anchor" href="#built-into-dlux" aria-label="Permalink to &quot;Built into dlux&quot;">​</a></h3><p>Navmesh comes built into dlux boilerplates, and should be updated as the scene changes. Once you build your scene, create a navmesh, then reference it in the scene by linking to it in this line of code:</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a-entity</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> gltf-model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;navmesh.gltf&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> nav-mesh</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a-entity</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h1 id="how-to-create-a-navmesh" tabindex="-1">How to Create a Navmesh <a class="header-anchor" href="#how-to-create-a-navmesh" aria-label="Permalink to &quot;How to Create a Navmesh&quot;">​</a></h1><blockquote><p>In the easiest case, a nav mesh can just be a simple mesh covering parts of the scene where characters are allowed to travel. Stairs become ramps, and obstacles are holes in the mesh. <a href="https://medium.com/@donmccurdy/creating-a-nav-mesh-for-a-webvr-scene-b3fdb6bed918" target="_blank" rel="noreferrer"><em>Don McCurdy</em></a></p></blockquote><p>There are many different ways to create the glTF for your navmesh. Here are some of the workflows we have had success with.</p><h2 id="navigation-mesh-a-frame-inspector-plugin-github-source" tabindex="-1">Navigation Mesh A-Frame Inspector Plugin (<a href="https://github.com/donmccurdy/aframe-inspector-plugin-recast" target="_blank" rel="noreferrer">GitHub Source</a>) <a class="header-anchor" href="#navigation-mesh-a-frame-inspector-plugin-github-source" aria-label="Permalink to &quot;Navigation Mesh A-Frame Inspector Plugin ([GitHub Source](https://github.com/donmccurdy/aframe-inspector-plugin-recast))&quot;">​</a></h2><p>Don McCurdy&#39;s plugin for the A-Frame Inspector allows creating of a navigation mesh from an existing A-Frame scene</p><p><img src="https://user-images.githubusercontent.com/1848368/40598442-a2d92fac-61fc-11e8-9dfe-4de1c56ee6e6.gif" alt="A-Frame Inspector Plugin Recast"></p><blockquote><p><a href="https://poly.google.com/view/dC70BOz1Ju-" target="_blank" rel="noreferrer">Kitchen v2</a> by Jerad Bitner, on Google Poly.</p></blockquote><ol><li>Create your scene</li><li>Use <a href="https://github.com/donmccurdy/aframe-inspector-plugin-recast" target="_blank" rel="noreferrer">this</a> plugin to create and test a navigation mesh</li></ol><ul><li>Add this to your scene head:</li></ul><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> src</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://recast-api.donmccurdy.com/aframe-inspector-plugin-recast.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><ul><li>Add <code>inspector-plugin-recast</code> to your <code>&lt;a-scene&gt;</code> tag:</li></ul><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a-scene</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> inspector-plugin-recast</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; ...</span></span></code></pre></div><ul><li>Press <strong>Ctl-Alt-I</strong> to access the inspector</li><li>Click <code>Build</code> to see the mesh</li><li>Adjust parameters and click <code>Build</code> until desired mesh is achieved</li></ul><ol start="3"><li>Export the navigation mesh as a glTF file</li><li>Load the final navigation mesh into your scene as a normal model</li></ol><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a-entity</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> gltf-model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;navmesh.gltf&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> nav-mesh</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a-entity</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h2 id="in-tinkercad" tabindex="-1">In Tinkercad <a class="header-anchor" href="#in-tinkercad" aria-label="Permalink to &quot;In Tinkercad&quot;">​</a></h2><ol><li>Create your scene</li><li>Create a <strong><em>seperate</em></strong> floor model for your scene. It will be invisible later</li></ol><ul><li>Draw planes (flat, angled, etc) to represent where players can walk</li><li>Leave gaps for walls and areas the player can&#39;t go</li><li>Then group all planes into one model</li></ul><ol start="3"><li>Isolate and export only the floor model as OBJ</li><li>Convert the OBJ to glTF with <a href="http://52.4.31.236/convertmodel.html" target="_blank" rel="noreferrer">Cesium</a></li><li>Load the final navigation mesh into your scene as a normal model</li></ol><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a-entity</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> gltf-model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;navmesh.gltf&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> nav-mesh</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a-entity</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h2 id="in-blender" tabindex="-1">In Blender <a class="header-anchor" href="#in-blender" aria-label="Permalink to &quot;In Blender&quot;">​</a></h2><p>See Don McCurdy&#39;s post here: <a href="https://medium.com/@donmccurdy/creating-a-nav-mesh-for-a-webvr-scene-b3fdb6bed918" target="_blank" rel="noreferrer">https://medium.com/@donmccurdy/creating-a-nav-mesh-for-a-webvr-scene-b3fdb6bed918</a></p><h2 id="using-a-frame-primitives" tabindex="-1">Using A-Frame Primitives <a class="header-anchor" href="#using-a-frame-primitives" aria-label="Permalink to &quot;Using A-Frame Primitives&quot;">​</a></h2><p>You can make a navigation mesh in A-Frame using a primitive, but only one navmesh is supported in a scene. This works fine for a big flat floor, but being limited to one primitive doesn&#39;t work for building varied terrain, which instead requires one of the other methods of generating a glTF to use for the navmesh.</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a-scene</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> renderer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;gammaOutput: true&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> background</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;color: lightblue;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  &lt;!-- CAMERA --&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a-entity</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;rig&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> movement-controls</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;constrainToNavMesh: true;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a-entity</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> camera</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> look-controls</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;pointerLockEnabled: true;&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> position</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;0 1.6 0&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a-entity</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a-entity</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  &lt;!-- STAGE --&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a-entity</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> scale</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;0.5 1 1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a-entity</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> geometry</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;primitive: plane; height: 10; width: 10;&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">              material</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;color: indigo; side: double;&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">              rotation</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;-90 0 0&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">              nav-mesh</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a-entity</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a-entity</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a-scene</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h1 id="how-to-test-a-navmesh" tabindex="-1">How to Test a Navmesh <a class="header-anchor" href="#how-to-test-a-navmesh" aria-label="Permalink to &quot;How to Test a Navmesh&quot;">​</a></h1><p>Go to <a href="https://gltf-viewer.donmccurdy.com" target="_blank" rel="noreferrer">https://gltf-viewer.donmccurdy.com</a> and drop in your glTF file.</p><p>Click on the Performance disclosure triangle to view performance stats. Your navmesh.gltf should achieve 60 fps or higher for smooth performance.</p><h1 id="how-to-use-a-navmesh" tabindex="-1">How to Use a Navmesh <a class="header-anchor" href="#how-to-use-a-navmesh" aria-label="Permalink to &quot;How to Use a Navmesh&quot;">​</a></h1><p>Now that you have created a navmesh for your scene, you must reference it in your scene.</p><h3 id="built-in-to-dlux" tabindex="-1">Built in to dlux <a class="header-anchor" href="#built-in-to-dlux" aria-label="Permalink to &quot;Built in to dlux&quot;">​</a></h3><p>If you&#39;re working from a dlux boilerplate, this is as simple as linking to it in the line</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a-entity</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> gltf-model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;navmesh.gltf&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> nav-mesh</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a-entity</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h3 id="start-from-scratch" tabindex="-1">Start from scratch <a class="header-anchor" href="#start-from-scratch" aria-label="Permalink to &quot;Start from scratch&quot;">​</a></h3><p>If you&#39;re not, here are some step-by-step instructions to get navmesh working in A-Frame.</p><p>We will be using:</p><ul><li>Pathfinding in A-Frame Extras by Don McCurdy (<a href="https://github.com/donmccurdy/aframe-extras/tree/master/src/pathfinding" target="_blank" rel="noreferrer">GitHub Source</a>)</li><li>Controls in A-Frame Extras by Don McCurdy (<a href="https://github.com/donmccurdy/aframe-extras/tree/master/src/controls" target="_blank" rel="noreferrer">GitHub Source</a>)</li><li>A-Frame Teleport Controls by Fernando Serrano (<a href="https://github.com/fernandojsg/aframe-teleport-controls" target="_blank" rel="noreferrer">GitHub Source</a>)</li></ul><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">html</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">head</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> src</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://rawgit.com/donmccurdy/aframe-extras/master/dist/aframe-extras.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> src</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://rawgit.com/fernandojsg/aframe-teleport-controls/master/dist/aframe-teleport-controls.min.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">head</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p>Define the navmesh in your scene</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">body</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a-scene</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a-entity</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> gltf-model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;navmesh.gltf&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> nav-mesh</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a-entity</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p>Your player should be set up as a camera rig, with the head being your camera, and look something like this:</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a-entity</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;player&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">     position</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;0 0 0&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">     movement-controls</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;constrainToNavMesh: true&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a-entity</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> camera</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;head&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">     position</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;0 1.6 0&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">     look-controls</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;pointerLockEnabled: true&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a-cursor</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> nav-pointer</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">           raycaster</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;objects: [nav-mesh]&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a-cursor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a-entity</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a-entity</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> laser-controls</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;hand: left;&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        teleport-controls</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;button: trigger; collision-entities: [nav-mesh]; cameraRig: #rig; teleportOrigin: [camera];&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a-entity</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a-entity</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> laser-controls</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;hand: right;&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">         teleport-controls</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;button: trigger; collision-entities: [nav-mesh]; cameraRig: #rig; teleportOrigin: [camera];&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a-entity</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a-entity</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a-scene</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">body</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">html</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p>Finally, you need to add a bit of script for <code>nav-pointer</code>. This is already done in dlux.js, and can be added to an existing file, or inline:</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">head</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">AFRAME</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">registerComponent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;nav-pointer&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  init</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> el</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.el;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // On click, send the NPC to the target location.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    el.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;click&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">e</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ctrlEl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> el.sceneEl.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">querySelector</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;[nav-agent]&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      ctrlEl.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setAttribute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;nav-agent&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        active: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        destination: e.detail.intersection.point</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    });</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // When hovering on the nav mesh, show a green cursor.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    el.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;mouseenter&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      el.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setAttribute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;material&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, {color: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;green&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    el.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;mouseleave&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      el.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setAttribute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;material&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, {color: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;crimson&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // Refresh the raycaster after models load.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    el.sceneEl.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;object3dset&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.el.components.raycaster.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">refreshObjects</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">head</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p><a href="https://right-volcano.glitch.me" target="_blank" rel="noreferrer">Remix this example on Glitch</a></p>`,52),h=[e];function l(p,k,r,E,d,o){return a(),i("div",null,h)}const y=s(n,[["render",l]]);export{c as __pageData,y as default};
