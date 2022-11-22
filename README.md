# `nextjs ssr demo app`

## nextjs api, nextauth, mikro-orm & mongodb (atlas)

```

    "dev": "next dev"
    "prod": "next build && next start"

```

```last build log
Route (pages)                              Size     First Load JS
┌ ● /                                      733 B          52.1 kB
├   /_app                                  0 B            51.4 kB
├ ○ /404                                   316 B          51.7 kB
├ ○ /500                                   328 B          51.7 kB
├ ○ /about                                 1.29 kB        52.7 kB
├ λ /api/auth/[...nextauth]                0 B            51.4 kB
├ λ /api/post/[title]                      0 B            51.4 kB
├ λ /api/post/create                       0 B            51.4 kB
├ λ /api/post/delete                       0 B            51.4 kB
├ λ /api/post/update                       0 B            51.4 kB
├ λ /api/posts                             0 B            51.4 kB
├ λ /api/posts/10                          0 B            51.4 kB
├ λ /api/posts/20                          0 B            51.4 kB
├ ○ /auth/error                            384 B          51.8 kB
├ ○ /auth/session                          7.77 kB          69 kB
├   └ css/16bf673486b56fd8.css             1.18 kB
├ ○ /auth/signin                           2.16 kB        53.6 kB
├ λ /post/[title]                          2.13 kB        58.2 kB
├   └ css/f105ad1e40b6c6f6.css             1.05 kB
└ ○ /posts                                 2.52 kB        68.4 kB
    └ css/6dd35029d9d0efa1.css             1.07 kB
+ First Load JS shared by all              52.3 kB
  ├ chunks/main-6c3194f54fd46d1e.js        33.9 kB
  ├ chunks/pages/_app-3d71cbd4d3efbfb4.js  15.3 kB
  ├ chunks/webpack-defdfe0d5acdbcf9.js     2.2 kB
  └ css/e9225ce3af9fce37.css               930 B

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
```

## saving 40kb by switching out react with preact
