import { createHmac, timingSafeEqual } from 'node:crypto';
import { invariant } from 'ts-invariant';

const base64PaddingRE = /=/g;

export type Secret = string | Buffer;

/**
 * Signs the provided value using the provided secret.
 *
 * @param value
 * @param secret Secret can be a string or an array of strings, either stored as a string or as a Buffer.
 * @returns <value>.<signature>
 */
export function sign(value: string, secret: Secret | Secret[]): string {
  const secrets = Array.isArray(secret) ? secret : [secret];

  if (typeof value !== 'string') {
    throw new TypeError('Cookie value must be provided as a string.');
  }

  invariant(secrets[0]);

  return [
    value,
    createHmac('sha256', secrets[0]).update(value).digest('base64').replace(base64PaddingRE, '')
  ].join('.');
}

interface InvalidSignedData {
  valid: false;
}

interface ValidSignedData {
  valid: true;

  /**
   * If the secret used to sign the cookie is not the first secret provided, this will be true.
   * This can be used to detect when a secret has been rotated.
   * @example
   * ```ts
   * const { valid, renew } = unsign(signedValue, [secret1, secret2]);
   * if (valid && renew) {
   *  update the cookie to be signed with secret2
   * }
   * ```
   */
  renew: boolean;

  /**
   * The original value
   */
  value: string;
}

/**
 *
 * @param signedValue <value>.<signature>
 * @param secret Secret can be a string or an array of strings, either stored as a string or as a Buffer.
 * @returns
 */
export function unsign(
  signedValue: string,
  secret: Secret | Secret[]
): InvalidSignedData | ValidSignedData {
  const secrets = Array.isArray(secret) ? secret : [secret];

  if (typeof signedValue !== 'string') {
    throw new TypeError('Signed cookie string must be provided.');
  }

  const value = signedValue.slice(0, signedValue.lastIndexOf('.'));
  const actual = Buffer.from(signedValue.slice(signedValue.lastIndexOf('.') + 1));

  for (const sec of secrets) {
    const expected = Buffer.from(
      createHmac('sha256', sec).update(value).digest('base64').replace(base64PaddingRE, '')
    );
    if (expected.length === actual.length && timingSafeEqual(expected, actual)) {
      return {
        valid: true,
        renew: sec !== secrets[0],
        value
      };
    }
  }

  return {
    valid: false
  };
}
