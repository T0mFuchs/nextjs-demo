# `nextjs ssr demo app`

## nextjs api, nextauth, mikro-orm & mongodb (atlas)

```

    "dev": "next dev"
    "prod": "next build && next start"

```

```last build log
Route (pages)                              Size     First Load JS
┌ ● /                                      710 B          52.6 kB
├   /_app                                  0 B            51.9 kB
├ ○ /404                                   317 B          52.2 kB
├ ○ /500                                   328 B          52.3 kB
├ ○ /about                                 1.26 kB        53.2 kB
├ λ /api/auth/[...nextauth]                0 B            51.9 kB
├ λ /api/post/[title]                      0 B            51.9 kB
├ λ /api/post/create                       0 B            51.9 kB
├ λ /api/post/delete                       0 B            51.9 kB
├ λ /api/post/update                       0 B            51.9 kB
├ λ /api/posts                             0 B            51.9 kB
├ λ /api/posts/10                          0 B            51.9 kB
├ λ /api/posts/20                          0 B            51.9 kB
├ ○ /auth/error                            386 B          52.3 kB
├ ○ /auth/session                          7.77 kB        69.5 kB
├   └ css/ff126a2627950eac.css             1.12 kB
├ ○ /auth/signin                           2.13 kB        54.1 kB
├ λ /post/[title]                          2.14 kB        58.7 kB
└ ○ /posts                                 2.46 kB        68.8 kB
    └ css/2d8a437f843ac0fe.css             1.02 kB
+ First Load JS shared by all              52.8 kB
  ├ chunks/main-6c3194f54fd46d1e.js        33.9 kB
  ├ chunks/pages/_app-c1561d0388c38980.js  15.9 kB
  ├ chunks/webpack-2e135d0de16182cc.js     2.18 kB
  └ css/dd863d7d7b702e86.css               893 B

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
```

## saving 40kb by switching out react with preact
