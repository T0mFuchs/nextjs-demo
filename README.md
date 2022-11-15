# `nextjs ssr demo app`

## nextjs api, nextauth, prisma & mongodb (atlas)

```

    "dev": "next dev"
    "prod": "next build && next start"

```

```last build log
Route (pages)                              Size     First Load JS
┌ ● /                                      673 B          85.7 kB
├   /_app                                  0 B              85 kB
├ ○ /404                                   321 B          85.3 kB
├ ○ /500                                   329 B          85.3 kB
├ λ /api/auth/[...nextauth]                0 B              85 kB
├ λ /api/post/[title]                      0 B              85 kB
├ λ /api/post/create                       0 B              85 kB
├ λ /api/post/delete                       0 B              85 kB
├ λ /api/post/update                       0 B              85 kB
├ λ /api/posts                             0 B              85 kB
├ ○ /auth/error                            398 B          85.4 kB
├ ○ /auth/session                          1.23 kB        86.2 kB
├ ○ /auth/signin                           2.09 kB        87.1 kB
├ λ /post/[title]                          13.6 kB         105 kB
├ ○ /posts                                 1.96 kB        93.7 kB
└ ○ /whatisthis                            1.11 kB        86.1 kB
+ First Load JS shared by all              86.1 kB
  ├ chunks/framework-8d78bf989db74c8f.js   45.4 kB
  ├ chunks/main-e8908d846c622fd4.js        25.7 kB
  ├ chunks/pages/_app-1201d7365b2addf8.js  11.5 kB
  ├ chunks/webpack-62de089416f7ee6b.js     2.35 kB
  └ css/c39277504e2f327a.css               1.09 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
```
