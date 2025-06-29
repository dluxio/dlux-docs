import { defineConfig } from 'vitepress'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  sitemap: {
    hostname: 'https://dlux.io'
  },
  base: '/docs/',
  vite: {
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: 'img', // Source folder
            dest: ''     // Destination folder in `dist`
          }
        ]
      })
    ]
  },
  cleanUrls: true,
  lastUpdated: true,
  title: "Honeycomb L2",
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
      { text: 'SPK', link: '/spk/what-is-spk' },
      { text: 'Honeycomb', link: '/honeycomb/what-is-honeycomb' },
      {
        text: '1.5.0',
        items: [
          { text: 'Changelog', link: 'https://github.com/disregardfiat/honeycomb/blob/master/RELEASE.md' },
        ]
      }
    ],
    sidebar: {
      '/dlux/': [
        {
          text: 'DLUX Publishing',
          collapsed: false,
          items: [
            { text: 'What Is DLUX?', link: '/dlux/what-is-dlux' },
            { text: 'Glitch Quickstart', link: '/dlux/glitch-quickstart' },
            { text: 'DLUX Builder', link: '/dlux/dlux-builder' },
            { text: 'A-Frame Inspector', link: '/dlux/a-frame-inspector' },
          ]
        },
        {
          text: 'Assets',
          collapsed: true,
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
          collapsed: true,
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
          text: 'Networking',
          collapsed: true,
          items: [
            { text: 'Wallet Auto-Injection', link: '/dlux/wallet-injection' },
            { text: 'Presence Infrastructure', link: '/dlux/presence' },
          ]
        },
        {
          text: 'Integrations',
          collapsed: true,
          items: [
            { text: 'DLUX API', link: '/dlux/dlux-api' },
            { text: 'HIVE Blockchain', link: '/dlux/hive' },
          ]
        },
      ],
      '/spk/': [
        {
          text: 'SPK Network',
          collapsed: false,
          items: [
            { text: 'What is SPK?', link: '/spk/what-is-spk' },
            { text: 'Getting Started', link: '/spk/getting-started' },
          ]
        },
        {
          text: 'Reference',
          collapsed: false,
          items: [
            { text: 'Services', link: '/spk/services' },
            { text: 'Storage', link: '/spk/storage' },
            { text: 'Trole', link: '/spk/trole' },
            { text: 'Proof of Access', link: '/spk/poa' }
          ]
        },
      ],
      '/honeycomb/': [
        {
          text: 'Honeycomb',
          collapsed: false,
          items: [
            { text: 'What is Honeycomb?', link: '/honeycomb/what-is-honeycomb' },
            { text: 'DEX Operation', link: '/honeycomb/dex' },
          ]
        },
        {
          text: 'Getting Started',
          collapsed: false,
          items: [
            { text: 'Token Quickstart', link: '/honeycomb/new-token' },
            { text: 'Validator Quickstart', link: '/honeycomb/new-node' },
            { text: 'Node Voting', link: '/honeycomb/node-voting' },
          ]
        },
        {
          text: 'Reference',
          collapsed: false,
          items: [
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
