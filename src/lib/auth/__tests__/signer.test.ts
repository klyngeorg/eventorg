import { invariant } from 'ts-invariant';
import { describe, expect, it } from 'vitest';
import { sign, unsign } from '../signer.js';

describe('sign', () => {
  it('should sign a value with a secret', () => {
    const value = 'test';
    const secret = 'secret';
    const expectedSignature = 'Aymga2LNFrM+tnkr6MYLFY2Jou46h2/Omogeu0iMCRQ';

    const signature = sign(value, secret);
    expect(signature).toEqual(`${value}.${expectedSignature}`);
  });

  it('should throw an error if the value is not a string', () => {
    const value = 123 as unknown as string;
    const secret = 'secret';

    expect(() => sign(value, secret)).toThrow('Cookie value must be provided as a string.');
  });

  it('should throw an error if no secret is provided', () => {
    const value = 'test';

    expect(() => sign(value, [])).toThrow('Invariant Violation');
  });
});

describe('unsign', () => {
  it('should unsign a signed value with a secret', () => {
    const value = 'test';
    const secret = 'secret';
    const signature = 'Aymga2LNFrM+tnkr6MYLFY2Jou46h2/Omogeu0iMCRQ';
    const signedValue = `${value}.${signature}`;

    const result = unsign(signedValue, secret);
    expect(result.valid).toBe(true);
    invariant(result.valid);
    expect(result.renew).toBe(false);
    expect(result.value).toBe(value);
  });

  it('should return an object with valid=false if the signature is invalid', () => {
    const value = 'test';
    const secret = 'secret';
    const signature = 'invalid';
    const signedValue = `${value}.${signature}`;

    const result = unsign(signedValue, secret);
    expect(result.valid).toBe(false);
  });

  it('should throw an error if the signed value is not a string', () => {
    const signedValue = 123 as unknown as string;
    const secret = 'secret';

    expect(() => unsign(signedValue, secret)).toThrow('Signed cookie string must be provided.');
  });
});
