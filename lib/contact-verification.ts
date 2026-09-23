'use client';

import * as React from 'react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export type LiveVerificationResult = {
  valid: boolean;
  message?: string | null;
  suggestion?: string;
  code?: string;
  skipped?: boolean;
};

type Kind = 'email' | 'phone';

const cache = new Map<string, Promise<LiveVerificationResult>>();

// Server-side checks the browser can't do: DNS/MX + disposable list + typo
// suggestions for email, Twilio Lookup for phone. Any network/server problem
// resolves as valid so the form is never blocked - the submit route re-checks.
export function verifyLive(kind: Kind, value: string): Promise<LiveVerificationResult> {
  const key = `${kind}:${value.trim().toLowerCase()}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const request = axios
    .post<LiveVerificationResult>(`${API_URL}/validate/${kind}`, { [kind]: value.trim() }, { timeout: 10000 })
    .then((res) => res.data)
    .catch((): LiveVerificationResult => {
      cache.delete(key);
      return { valid: true, skipped: true };
    });
  cache.set(key, request);
  return request;
}

// On blur, runs the live server check once the value passes the local rules.
// Local failures are left to the form's own submit-time error so the same
// message isn't shown twice.
export function useLiveVerification(kind: Kind, value: string, isLocallyValid: (v: string) => boolean) {
  const [result, setResult] = React.useState<LiveVerificationResult | null>(null);
  const [checking, setChecking] = React.useState(false);
  const checkedValueRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    if (checkedValueRef.current !== null && checkedValueRef.current !== value) {
      checkedValueRef.current = null;
      setResult(null);
    }
  }, [value]);

  const check = React.useCallback(async () => {
    const current = value ?? '';
    if (!current.trim() || !isLocallyValid(current)) {
      setResult(null);
      return;
    }
    checkedValueRef.current = current;
    setChecking(true);
    const next = await verifyLive(kind, current);
    setChecking(false);
    if (checkedValueRef.current === current) setResult(next);
  }, [kind, value, isLocallyValid]);

  const error = result && !result.valid ? result.message || null : null;
  return { error, suggestion: result?.suggestion, checking, check };
}
