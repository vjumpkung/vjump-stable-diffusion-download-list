import createClient from "openapi-fetch";
import { paths } from "./v1";
import { env } from "next-runtime-env";

export const client = createClient<paths>({
  baseUrl: env("NEXT_PUBLIC_API_URL"),
});
