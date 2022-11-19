# `nextjs ssr demo app`

## nextjs api, nextauth, mikro-orm & mongodb (atlas)

```

    "dev": "next dev"
    "prod": "next build && next start"

```

```last build log
Route (pages)                              Size     First Load JS
┌ ● /                                      402 B          53.3 kB
├   /_app                                  0 B            52.9 kB
├ ○ /404                                   317 B          53.2 kB
├ ○ /500                                   328 B          53.2 kB
├ ○ /about                                 955 B          53.8 kB
├ λ /api/auth/[...nextauth]                0 B            52.9 kB
├ λ /api/post/[title]                      0 B            52.9 kB
├ λ /api/post/create                       0 B            52.9 kB
├ λ /api/post/delete                       0 B            52.9 kB
├ λ /api/post/update                       0 B            52.9 kB
├ λ /api/posts                             0 B            52.9 kB
├ λ /api/posts/10                          0 B            52.9 kB
├ λ /api/posts/20                          0 B            52.9 kB
├ ○ /auth/error                            386 B          53.3 kB
├ ○ /auth/session                          6.88 kB        69.6 kB
├   └ css/845f54e5315ee754.css             274 B
├ ○ /auth/signin                           1.8 kB         54.7 kB
├ λ /post/[title]                          8.48 kB          66 kB
├   └ css/d4d5082c6f4eb904.css             267 B
└ ○ /posts                                 1.67 kB          69 kB
    └ css/f49705f44aab1ad6.css             129 B
+ First Load JS shared by all              54.5 kB
  ├ chunks/main-6c3194f54fd46d1e.js        33.9 kB
  ├ chunks/pages/_app-7f4e75c867bd246a.js  16.9 kB
  ├ chunks/webpack-851fafdd91027202.js     2.13 kB
  └ css/b909e3360ef65978.css               1.63 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)     
○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
```

## saving 40kb by switching out react with preact
