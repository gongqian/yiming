import { create, Header, Payload, verify } from "./deps.ts";

const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);
const tokenHeader: Header = { alg: "HS512", typ: "JWT" };
const payloadTemplate = { iss: "peoplemart.com", sub: "PeopleMartDao" };
const expire = () => Math.floor(Date.now() / 1000) + 14 * 24 * 60 * 60;

export async function createToken(payload: Payload) {
  return await create(tokenHeader, {
    ...payloadTemplate,
    exp: expire(),
    ...payload,
  }, key);
}

export async function verifyToken(token: string): Promise<Payload> {
  return await verify(token, key);
}