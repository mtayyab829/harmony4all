// Practical RFC 5322 local-part/domain pattern. Deliberately excludes
// characters like ( ) < > [ ] , ; : \ " that are only legal inside a quoted
// or commented local-part and are never used in real addresses.
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// Known placeholder/disposable domains people type to get past a form
// without giving a real address. The backend also verifies the domain can
// actually receive mail (MX lookup), which this can't do from the browser.
export const BLOCKED_EMAIL_DOMAINS = new Set([
  'test.com', 'test.org', 'test.net',
  'example.com', 'example.org', 'example.net', 'example.edu',
  'domain.com', 'email.com', 'yourdomain.com', 'mycompany.com', 'company.com',
  'mailinator.com', 'guerrillamail.com', 'guerrillamail.info', 'yopmail.com',
  'tempmail.com', 'temp-mail.org', '10minutemail.com', 'trashmail.com',
  'fakeinbox.com', 'sharklasers.com', 'throwawaymail.com', 'getnada.com',
  'dispostable.com', 'maildrop.cc', 'mailnesia.com', 'mintemail.com',
  'spamgourmet.com', 'discard.email', 'moakt.com',
]);

function getEmailDomain(email: string): string {
  const at = email.lastIndexOf('@');
  return at === -1 ? '' : email.slice(at + 1).toLowerCase();
}

export function isValidEmailFormat(raw: string | null | undefined): boolean {
  const trimmed = String(raw ?? '').trim();
  if (trimmed.length < 5 || trimmed.length > 254) return false;
  if (!EMAIL_REGEX.test(trimmed)) return false;

  const [local, domain] = trimmed.split('@');
  if (!local || local.length > 64) return false;
  if (domain.includes('..')) return false;

  const tld = domain.split('.').pop();
  if (!tld || tld.length < 2 || /\d/.test(tld)) return false;

  return true;
}

export function isBlockedEmailDomain(raw: string | null | undefined): boolean {
  const domain = getEmailDomain(String(raw ?? '').trim().toLowerCase());
  return BLOCKED_EMAIL_DOMAINS.has(domain);
}

export function getEmailValidationError(
  raw: string | null | undefined,
  { required = true }: { required?: boolean } = {}
): string | null {
  const trimmed = String(raw ?? '').trim();
  if (!trimmed) {
    return required ? 'Email is required' : null;
  }
  if (!isValidEmailFormat(trimmed)) {
    return 'Enter a valid email address';
  }
  if (isBlockedEmailDomain(trimmed)) {
    return 'Please use a real email address, not a test or disposable one';
  }
  return null;
}
