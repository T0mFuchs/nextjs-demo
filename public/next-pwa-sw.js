if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>a(e,i),o={module:{uri:i},exports:t,require:r};s[i]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-7028bf80"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/17.626fb1a10fd037e6.js",revision:"626fb1a10fd037e6"},{url:"/_next/static/chunks/31.a71d1ff890840543.js",revision:"a71d1ff890840543"},{url:"/_next/static/chunks/58-75ad9a6f96ad8f03.js",revision:"75ad9a6f96ad8f03"},{url:"/_next/static/chunks/815.cda7df8306518c6e.js",revision:"cda7df8306518c6e"},{url:"/_next/static/chunks/960.f9ca9481027a4ca3.js",revision:"f9ca9481027a4ca3"},{url:"/_next/static/chunks/main-847238a154b48d71.js",revision:"847238a154b48d71"},{url:"/_next/static/chunks/pages/404-66728e607e05b4aa.js",revision:"66728e607e05b4aa"},{url:"/_next/static/chunks/pages/500-ddf3872d938e2911.js",revision:"ddf3872d938e2911"},{url:"/_next/static/chunks/pages/_app-559bdba86c49c58a.js",revision:"559bdba86c49c58a"},{url:"/_next/static/chunks/pages/_error-15a66051420fa71c.js",revision:"15a66051420fa71c"},{url:"/_next/static/chunks/pages/about-5896a234c4556f9d.js",revision:"5896a234c4556f9d"},{url:"/_next/static/chunks/pages/auth/error-760136d33779e301.js",revision:"760136d33779e301"},{url:"/_next/static/chunks/pages/auth/new-user-e3e25b775c6f550d.js",revision:"e3e25b775c6f550d"},{url:"/_next/static/chunks/pages/auth/signin-e241354957c21d51.js",revision:"e241354957c21d51"},{url:"/_next/static/chunks/pages/entries-659fd04ec0aedb5c.js",revision:"659fd04ec0aedb5c"},{url:"/_next/static/chunks/pages/entry/%5Btitle%5D-493232b32d631ed8.js",revision:"493232b32d631ed8"},{url:"/_next/static/chunks/pages/index-687a271030472871.js",revision:"687a271030472871"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-68f2953a6cb1bfc8.js",revision:"68f2953a6cb1bfc8"},{url:"/_next/static/css/09d66ea216ea44ce.css",revision:"09d66ea216ea44ce"},{url:"/_next/static/css/0b450aa76c46aa09.css",revision:"0b450aa76c46aa09"},{url:"/_next/static/css/1ad7c1557c29ca7e.css",revision:"1ad7c1557c29ca7e"},{url:"/_next/static/css/c89cf70def9ae766.css",revision:"c89cf70def9ae766"},{url:"/_next/static/css/d9e19dd7e83e952b.css",revision:"d9e19dd7e83e952b"},{url:"/_next/static/css/e41ca63aab46d652.css",revision:"e41ca63aab46d652"},{url:"/_next/static/css/e9b5bf8eb9cd2af3.css",revision:"e9b5bf8eb9cd2af3"},{url:"/_next/static/css/f3bdaff5fe054ba0.css",revision:"f3bdaff5fe054ba0"},{url:"/_next/static/media/lighthouse.8ddbd2b6.png",revision:"ba2a54939e91318687edc3d8ef63c0da"},{url:"/_next/static/media/webvitals.1dff87ac.png",revision:"374d42d418747dd728b1ba61e2c131f0"},{url:"/_next/static/nUaxvv7USBirmaElO_nb5/_buildManifest.js",revision:"d2eb25a5e382ac7dd13e3c16a926f4a8"},{url:"/_next/static/nUaxvv7USBirmaElO_nb5/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/assets/icons/icon-128x128.png",revision:"c2810734f4ca082d601a72fee7728ed3"},{url:"/assets/icons/icon-144x144.png",revision:"55546072545f348ea32d4af51f97e025"},{url:"/assets/icons/icon-152x152.png",revision:"3a25633ca7b4a04366622cf360a81c38"},{url:"/assets/icons/icon-192x192.png",revision:"a048681fa457a445be2c4bdb408c817c"},{url:"/assets/icons/icon-384x384.png",revision:"200f3a7205404cfe4fd62cb9b3da67f7"},{url:"/assets/icons/icon-48x48.png",revision:"903e6326619c8770e8d46f9ab3ec36cc"},{url:"/assets/icons/icon-512x512.png",revision:"a5c60e3c86faf6e178cb25adb2592891"},{url:"/assets/icons/icon-72x72.png",revision:"6e528a52dbb555118a30093cb9bffd3e"},{url:"/assets/icons/icon-96x96.png",revision:"0d7a092ee9c67be5f67213514a983cb6"},{url:"/assets/images/lighthouse.png",revision:"ba2a54939e91318687edc3d8ef63c0da"},{url:"/assets/images/webvitals.png",revision:"374d42d418747dd728b1ba61e2c131f0"},{url:"/empty.svg",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/manifest.json",revision:"90eb2667b0c64037679bb7e3519561ef"},{url:"/next-pwa-sw.js",revision:"7a9ca0bf5483e2cd9c5feaea7dc28adb"},{url:"/pwa-icon.png",revision:"786890b796af7a941de5d50c90aad05c"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
