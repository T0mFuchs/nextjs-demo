# `nextjs demo app`

## nextjs api, next-auth, mikro-orm & mongodb (atlas)


```last build log
Route (pages)                              Size     First Load JS
┌ ○ /                                      2.32 kB        52.2 kB
├   └ css/fa9ce5683eb89d40.css             753 B
├   /_app                                  0 B            49.8 kB
├ ○ /404                                   828 B          50.7 kB
├ ○ /500                                   829 B          50.7 kB
├ ○ /about                                 959 B          50.8 kB
├ λ /api/auth/[...nextauth]                0 B            49.8 kB
├ λ /api/entries                           0 B            49.8 kB
├ λ /api/entry/[title]                     0 B            49.8 kB
├ λ /api/entry/create                      0 B            49.8 kB
├ λ /api/entry/delete                      0 B            49.8 kB
├ λ /api/entry/update                      0 B            49.8 kB
├ ○ /auth/error                            381 B          50.2 kB
├ ○ /auth/signin                           1.8 kB         51.6 kB
├ ○ /entries                               1.53 kB          56 kB
├   └ css/af11e2ac5b16ed00.css             341 B
└ λ /entry/[title]                         2.11 kB        56.6 kB
+ First Load JS shared by all              51 kB
  ├ chunks/main-e85067924a68d0d0.js        33.9 kB
  ├ chunks/pages/_app-69879d8b6dbfbced.js  15.2 kB
  ├ chunks/webpack-ee7e63bc15b31913.js     815 B
  └ css/0d68b2c651b09bcd.css               1.16 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)  
○  (Static)  automatically rendered as static HTML (uses no initial props)
```

## saving 40kb by switching out react with preact
