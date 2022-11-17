# `nextjs ssr demo app`

## nextjs api, nextauth, mikro-orm & mongodb (atlas)

```

    "dev": "next dev"
    "prod": "next build && next start"

```

```last build log
Route (pages)                              Size     First Load JS
┌ ● /                                      402 B          52.1 kB
├   /_app                                  0 B            51.7 kB
├ ○ /404                                   317 B            52 kB
├ ○ /500                                   328 B            52 kB
├ ○ /about                                 955 B          52.6 kB
├ λ /api/auth/[...nextauth]                0 B            51.7 kB
├ λ /api/post/[title]                      0 B            51.7 kB
├ λ /api/post/create                       0 B            51.7 kB
├ λ /api/post/delete                       0 B            51.7 kB
├ λ /api/post/update                       0 B            51.7 kB
├ λ /api/posts                             0 B            51.7 kB
├ λ /api/posts/10                          0 B            51.7 kB
├ λ /api/posts/20                          0 B            51.7 kB
├ ○ /auth/error                            386 B          52.1 kB
├ ○ /auth/session                          8.26 kB        69.7 kB
├   └ css/845f54e5315ee754.css             274 B
├ ○ /auth/signin                           1.8 kB         53.5 kB
├ λ /post/[title]                          2.55 kB        58.9 kB
└ ○ /posts                                 1.5 kB         67.6 kB
    └ css/f49705f44aab1ad6.css             129 B
+ First Load JS shared by all              53.3 kB
  ├ chunks/main-6c3194f54fd46d1e.js        33.9 kB
  ├ chunks/pages/_app-c005a07e08be2043.js  15.7 kB
  ├ chunks/webpack-c82fc2b83ccef14b.js     2.07 kB
  └ css/b9cf66ebabb6d96c.css               1.63 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
```

## saving 40kb by switching out react with preact
