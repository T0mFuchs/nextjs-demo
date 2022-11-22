# `nextjs ssr demo app`

## nextjs api, nextauth, mikro-orm & mongodb (atlas)

```

    "dev": "next dev"
    "prod": "next build && next start"

```

```last build log
Route (pages)                              Size     First Load JS
┌ ● /                                      709 B          52.1 kB
├   /_app                                  0 B            51.4 kB
├ ○ /404                                   316 B          51.7 kB
├ ○ /500                                   328 B          51.7 kB
├ ○ /about                                 1.26 kB        52.6 kB
├ λ /api/auth/[...nextauth]                0 B            51.4 kB
├ λ /api/post/[title]                      0 B            51.4 kB
├ λ /api/post/create                       0 B            51.4 kB
├ λ /api/post/delete                       0 B            51.4 kB
├ λ /api/post/update                       0 B            51.4 kB
├ λ /api/posts                             0 B            51.4 kB
├ λ /api/posts/10                          0 B            51.4 kB
├ λ /api/posts/20                          0 B            51.4 kB
├ ○ /auth/error                            384 B          51.7 kB
├ ○ /auth/session                          7.74 kB        68.9 kB
├   └ css/6dd475feb9462892.css             1.17 kB
├ ○ /auth/signin                           2.14 kB        53.5 kB
├ λ /post/[title]                          2.11 kB        58.1 kB
├   └ css/74afe9b3a8d6565a.css             1.04 kB
└ ○ /posts                                 2.5 kB         68.3 kB
    └ css/808bdc5ab04bc484.css             1.06 kB
+ First Load JS shared by all              52.3 kB
  ├ chunks/main-6c3194f54fd46d1e.js        33.9 kB
  ├ chunks/pages/_app-6076c09e4960f024.js  15.3 kB
  ├ chunks/webpack-23f540ea164ec707.js     2.2 kB
  └ css/c566337c81e4ea9d.css               905 B

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
```

## saving 40kb by switching out react with preact
