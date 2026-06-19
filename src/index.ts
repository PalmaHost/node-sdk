// Official PalmaHost Cloud SDK for Node.js / TypeScript.
//
// A thin, fully-typed wrapper over the OpenAPI spec (src/schema.ts is generated
// from api/openapi/openapi.yaml via `npm run generate`). Every path, method,
// request body and response is type-checked against the spec.
//
//   import { createPalmaHostClient } from "@palmahost/sdk";
//   const ph = createPalmaHostClient({ token: process.env.PALMAHOST_TOKEN! });
//   const { data, error } = await ph.GET("/services");
//
// Create a token in the panel: Account → API tokens.
import createClient, { type Client, type ClientOptions } from "openapi-fetch";
import type { paths } from "./schema.js";

export type { paths, components, operations } from "./schema.js";

/** Production API base (the docs/default). The panel + API share the host, so
 *  there is no separate api.* subdomain. Override `baseUrl` for other envs
 *  (e.g. the dev instance at https://my-dev.palmahost.sh/v1). */
export const DEFAULT_BASE_URL = "https://my.palmahost.sh/v1";

export interface PalmaHostConfig extends Omit<ClientOptions, "baseUrl"> {
  /** API token (ph_live_…). Sent as `Authorization: Bearer <token>`. */
  token: string;
  /** API base URL including the version prefix. Defaults to production. */
  baseUrl?: string;
}

/** Creates a typed PalmaHost API client. The returned object exposes
 *  `.GET/.POST/.PUT/.PATCH/.DELETE("/path", { params, body })`, each typed to
 *  the OpenAPI operation, returning `{ data, error, response }`. */
export function createPalmaHostClient(config: PalmaHostConfig): Client<paths> {
  const { token, baseUrl, headers, ...rest } = config;
  if (!token) throw new Error("PalmaHost: `token` is required (create one in the panel: Account → API tokens).");
  return createClient<paths>({
    baseUrl: baseUrl ?? DEFAULT_BASE_URL,
    headers: { Authorization: `Bearer ${token}`, ...(headers as Record<string, string> | undefined) },
    ...rest,
  });
}

export default createPalmaHostClient;
