import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  sitemap: {
    hostname: 'https://dlux.io'
  },
  base: '/docs/',
  cleanUrls: true,
  lastUpdated: true,
  title: "Documentation",
  description: "For DLUX Publishing, SPK Network, and Honeycomb L2's",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    editLink: {
      pattern: 'https://github.com/dluxio/dlux-docs/edit/main/:path',
      text: 'Edit this page on GitHub'
    },
    search: {
      provider: 'algolia',
      options: {
        appId: '819ZOMNEN9',
        apiKey: '11294ecec68e8e1ff62c059512953ef4',
        indexName: 'dlux'
      }
    },

    nav: [
      { text: 'DLUX', link: '/dlux/what-is-dlux' },
      { text: 'SPK', link: '/spk' },
      { text: 'Honeycomb', link: '/honeycomb' },
      { text: '1.5.0',
        items: [
          { text: 'Changelog', link: '/changelog' },
          { text: 'Contributing', link: '/contributing' },
        ]
      }
    ],

    sidebar: {
    
    '/':[
      {
        text: 'Example',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: '1.2.0',
        items: [
          { text: 'Changelog', link: '/changelog' },
          { text: 'Contributing', link: '/contributing' }
        ]
      },
    ],

    '/dlux/':[
      {
        text: 'Getting Started',
        items: [
          { text: 'What Is DLUX?', link: '/dlux/what-is-dlux' },
          { text: 'Glitch Quickstart', link: '/dlux/glitch-quickstart' },
          { text: 'DLUX Builder', link: '/dlux/dlux-builder' },
          { text: 'A-Frame Inspector', link: '/dlux/a-frame-inspector' },
        ]
      },
      {
        text: 'Assets',
        items: [
          { text: 'Add Asset', link: '/dlux/assets' },
          { text: '3D Models', link: '/dlux/3d-models' },
          { text: 'Images', link: '/dlux/images' },
          { text: 'Text', link: '/dlux/text' },
          { text: 'Shapes', link: '/dlux/shapes' },
          { text: 'Audio', link: '/dlux/audio' },
          { text: 'Video', link: '/dlux/video' },
        ]
      },
      {
        text: 'Components',
        items: [
          { text: 'Web XR', link: '/dlux/webxr' },
          { text: 'Environment', link: '/dlux/environment' },
          { text: 'Physics', link: '/dlux/physics' },
          { text: 'Navmesh', link: '/dlux/navmesh' },
          { text: 'Player Rig', link: '/dlux/player-rig' },
          { text: 'Controls', link: '/dlux/controls' },
          { text: 'AR Marker', link: '/dlux/ar-marker' },
          { text: 'AR Markerless', link: '/dlux/ar-marker-less' },
          { text: 'UI Overlay', link: '/dlux/ui-overlay' },
          { text: '2D dApps', link: '/dlux/2d-dapps' },
        ]
      },
      {
        text: 'Integrations',
        items: [
          { text: 'DLUX API', link: '/dlux/dlux-api' },
          { text: 'HIVE Blockchain', link: '/dlux/hive' },
        ]
      },
    
      
    ],
    '/spk/':[
      {
        text: 'SPK',
        items: [
          { text: 'Services', link: '/spk/services' },
          { text: 'Storage', link: '/spk/storage' },
          { text: 'Trole', link: '/spk/trole' },
          { text: 'Proof of Access', link: '/spk/poa' }
        ]
      },
    ],
    '/honeycomb/':[
      {
        text: 'Honeycomb',
        items: [
          { text: 'DEX', link: '/honeycomb/dex' },
          { text: 'New Token', link: '/honeycomb/new-token' },
          { text: 'New Node', link: '/honeycomb/new-node' },
          { text: 'Node Voting', link: '/honeycomb/node-voting' },
          { text: 'Smart Contracts', link: '/honeycomb/building-smart-contracts' },
          { text: 'Actions', link: '/honeycomb/actions' },
          { text: 'NFT Actions', link: '/honeycomb/nft-actions' },
          { text: 'API Wiki', link: '/honeycomb/api' }
        ]
      }
    ],
  },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/disregardfiat/honeycomb' }
    ]
  }
})
