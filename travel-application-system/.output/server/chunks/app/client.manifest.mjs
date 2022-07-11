const client_manifest = {
  "node_modules/nuxt/dist/app/entry.mjs": {
    "file": "entry-2b941c5d.mjs",
    "src": "node_modules/nuxt/dist/app/entry.mjs",
    "isEntry": true,
    "dynamicImports": [
      "pages/admin.vue",
      "pages/index.vue",
      "pages/login.vue",
      "pages/user.vue",
      "middleware/auth.ts"
    ],
    "css": [
      "entry.b20b14e3.css"
    ]
  },
  "pages/admin.vue": {
    "file": "admin-a35d9ad1.mjs",
    "src": "pages/admin.vue",
    "isDynamicEntry": true,
    "imports": [
      "_Container-df9863c6.mjs",
      "node_modules/nuxt/dist/app/entry.mjs",
      "_fetch-e279150a.mjs",
      "_cookie-72a35f76.mjs"
    ]
  },
  "_Container-df9863c6.mjs": {
    "file": "Container-df9863c6.mjs",
    "imports": [
      "node_modules/nuxt/dist/app/entry.mjs",
      "_fetch-e279150a.mjs",
      "_cookie-72a35f76.mjs"
    ]
  },
  "_cookie-72a35f76.mjs": {
    "file": "cookie-72a35f76.mjs",
    "imports": [
      "node_modules/nuxt/dist/app/entry.mjs"
    ]
  },
  "_fetch-e279150a.mjs": {
    "file": "fetch-e279150a.mjs",
    "imports": [
      "_cookie-72a35f76.mjs",
      "node_modules/nuxt/dist/app/entry.mjs"
    ]
  },
  "pages/index.vue": {
    "file": "index-cb5529e8.mjs",
    "src": "pages/index.vue",
    "isDynamicEntry": true,
    "imports": [
      "_Container-df9863c6.mjs",
      "node_modules/nuxt/dist/app/entry.mjs",
      "_fetch-e279150a.mjs",
      "_cookie-72a35f76.mjs"
    ]
  },
  "pages/login.vue": {
    "file": "login-9250851f.mjs",
    "src": "pages/login.vue",
    "isDynamicEntry": true,
    "imports": [
      "node_modules/nuxt/dist/app/entry.mjs",
      "_fetch-e279150a.mjs",
      "_cookie-72a35f76.mjs"
    ]
  },
  "pages/user.vue": {
    "file": "user-7d904448.mjs",
    "src": "pages/user.vue",
    "isDynamicEntry": true,
    "imports": [
      "_Container-df9863c6.mjs",
      "node_modules/nuxt/dist/app/entry.mjs",
      "_fetch-e279150a.mjs",
      "_cookie-72a35f76.mjs"
    ]
  },
  "middleware/auth.ts": {
    "file": "auth-f2536a59.mjs",
    "src": "middleware/auth.ts",
    "isDynamicEntry": true,
    "imports": [
      "node_modules/nuxt/dist/app/entry.mjs",
      "_cookie-72a35f76.mjs"
    ]
  }
};

export { client_manifest as default };
//# sourceMappingURL=client.manifest.mjs.map
