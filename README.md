# `nextjs ssr demo app`

## nextjs api, nextauth, mikro-orm & mongodb (atlas)

```

    "dev": "next dev"
    "prod": "next build && next start"

```

```last build log
Route (pages)                              Size     First Load JS
┌ ● /                                      402 B          51.6 kB
├   /_app                                  0 B            51.2 kB
├ ○ /404                                   317 B          51.6 kB
├ ○ /500                                   328 B          51.6 kB
├ ○ /about                                 876 B          52.1 kB
├ λ /api/auth/[...nextauth]                0 B            51.2 kB
├ λ /api/post/[title]                      0 B            51.2 kB
├ λ /api/post/create                       0 B            51.2 kB
├ λ /api/post/delete                       0 B            51.2 kB
├ λ /api/post/update                       0 B            51.2 kB
├ λ /api/posts                             0 B            51.2 kB
├ ○ /auth/error                            386 B          51.6 kB
├ ○ /auth/session                          2.41 kB        53.6 kB
├ ○ /auth/signin                           1.8 kB           53 kB
├ λ /post/[title]                          12.6 kB        68.5 kB
└ ○ /posts                                 742 B          56.6 kB
+ First Load JS shared by all              52.8 kB
  ├ chunks/main-6c3194f54fd46d1e.js        33.9 kB
  ├ chunks/pages/_app-b567b94f5a730bbe.js  15.6 kB
  ├ chunks/webpack-2b3051e2c7514312.js     1.69 kB
  └ css/85bd5c29cc8e7006.css               1.53 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)   
○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
```

## saving 40kb by switching out react with preact (cons: lazyloading and servercomponents not supported)
