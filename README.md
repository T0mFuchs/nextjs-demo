# `nextjs demo app`

## nextjs api, next-auth, mikro-orm & mongodb (atlas)

## pwa installable` ` ` < 200kB`

```last build log
Route (pages)                              Size     First Load JS
┌ ○ /                                      3.72 kB        57.3 kB
├   └ css/e9b5bf8eb9cd2af3.css             1.08 kB
├   /_app                                  0 B            53.6 kB
├ ○ /404                                   873 B          54.5 kB
├ ○ /500                                   871 B          54.5 kB
├ ○ /about                                 4.68 kB        58.3 kB
├   └ css/d9e19dd7e83e952b.css             351 B
├ λ /api/auth/[...nextauth]                0 B            53.6 kB
├ λ /api/entries                           0 B            53.6 kB
├ λ /api/entries/[limit]                   0 B            53.6 kB
├ λ /api/entry/[title]                     0 B            53.6 kB
├ λ /api/entry/create                      0 B            53.6 kB
├ λ /api/entry/delete                      0 B            53.6 kB
├ λ /api/entry/update                      0 B            53.6 kB
├ λ /api/nodemailer/new-user               0 B            53.6 kB
├ ○ /auth/error                            876 B          54.5 kB
├ ○ /auth/new-user                         720 B          54.3 kB
├ ○ /auth/signin                           1.82 kB        55.4 kB
├ ○ /entries                               2.95 kB        61.2 kB
├   └ css/1ad7c1557c29ca7e.css             993 B
└ λ /entry/[title]                         4.51 kB        62.8 kB
    └ css/c89cf70def9ae766.css             1.36 kB
+ First Load JS shared by all              55.1 kB
  ├ chunks/main-847238a154b48d71.js        36.1 kB
  ├ chunks/pages/_app-559bdba86c49c58a.js  15.4 kB
  ├ chunks/webpack-68f2953a6cb1bfc8.js     2.14 kB
  └ css/e41ca63aab46d652.css               1.49 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)    
○  (Static)  automatically rendered as static HTML (uses no initial props)
```

## saving 40kb by switching out react with preact
