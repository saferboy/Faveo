import * as localJwt from "./jwt/local-jwt.service";

const service = localJwt;

const { sign, verify } = service;

export { sign, verify };
