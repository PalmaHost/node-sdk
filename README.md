# @palmahost/sdk

Official PalmaHost Cloud API SDK for Node.js / TypeScript. Fully typed — the
client is generated from the [OpenAPI spec](./openapi.yaml), so
every path, method, request body and response is checked at compile time.

## Install

```bash
npm install @palmahost/sdk
```

## Usage

```ts
import { createPalmaHostClient } from "@palmahost/sdk";

const ph = createPalmaHostClient({
  token: process.env.PALMAHOST_TOKEN!, // ph_live_… — create one: Account → API tokens
  // baseUrl: "https://my.palmahost.sh/v1", // override for the dev instance
});

const { data, error } = await ph.GET("/services");
if (error) throw error;
console.log(data); // typed list of services

await ph.POST("/services", {
  body: { plan_id: "plan_…", location_id: "loc_…", hostname: "web-1" },
});
```

Each call returns `{ data, error, response }` (no exceptions on HTTP errors).
The method/path/body/response are all typed to the OpenAPI operation.

## Develop

```bash
npm run generate   # regenerate src/schema.ts from the OpenAPI spec
npm run build      # emit dist/
```
