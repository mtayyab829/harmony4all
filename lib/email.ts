// Practical RFC 5322 local-part/domain pattern. Deliberately excludes
// characters like ( ) < > [ ] , ; : \ " that are only legal inside a quoted
// or commented local-part and are never used in real addresses.
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// Known placeholder/disposable domains people type to get past a form
// without giving a real address. The backend additionally checks a full
// disposable-domain list, provider typos (gmial.com) and that the domain can
// actually receive mail (DNS/MX), which this can't do from the browser.
// Keep in sync with backend/utils/email.js.
export const BLOCKED_EMAIL_DOMAINS = new Set([
  'test.com', 'test.org', 'test.net', 'testing.com', 'tester.com',
  'example.com', 'example.org', 'example.net', 'example.edu',
  'domain.com', 'email.com', 'yourdomain.com', 'mydomain.com', 'yoursite.com',
  'mycompany.com', 'company.com', 'website.com', 'site.com',
  'fake.com', 'fakemail.com', 'fakeemail.com', 'fake-email.com', 'notreal.com',
  'noemail.com', 'nomail.com', 'none.com', 'null.com', 'nowhere.com', 'noreply.com',
  'asdf.com', 'asdfasdf.com', 'qwerty.com', 'abc.com', 'abcd.com', 'xyz.com',
  'aaa.com', 'aa.com', 'sample.com', 'dummy.com', 'invalid.com', 'spam.com',
  'mailinator.com', 'guerrillamail.com', 'guerrillamail.info', 'yopmail.com',
  'tempmail.com', 'temp-mail.org', '10minutemail.com', 'trashmail.com',
  'fakeinbox.com', 'sharklasers.com', 'throwawaymail.com', 'getnada.com',
  'dispostable.com', 'maildrop.cc', 'mailnesia.com', 'mintemail.com',
  'spamgourmet.com', 'discard.email', 'moakt.com',
]);

// RFC 2606 / RFC 6761 reserved names and private-network TLDs.
const RESERVED_TLDS = new Set([
  'test', 'example', 'invalid', 'localhost', 'local', 'internal', 'lan',
  'home', 'corp', 'localdomain', 'intranet', 'private',
]);

// Local parts that are never someone's real mailbox on a sign-up form.
const FAKE_LOCAL_PARTS = new Set([
  'test', 'testing', 'tester', 'testuser', 'testemail', 'testmail', 'testaccount',
  'fake', 'fakeemail', 'fakemail', 'notreal', 'notmyemail', 'nobody', 'noone',
  'noemail', 'nomail', 'none', 'null', 'nil', 'na', 'n.a', 'undefined', 'unknown',
  'noreply', 'no-reply', 'donotreply', 'do-not-reply', 'no.reply',
  'example', 'sample', 'dummy', 'placeholder', 'foo', 'bar', 'foobar', 'baz',
  'asdf', 'asdfg', 'asdfgh', 'asdfghjkl', 'qwerty', 'qwert', 'qwertyuiop', 'zxcv', 'zxcvbn',
  'abc', 'abcd', 'abcde', 'abc123', 'xyz', 'xxx', 'aaa', 'blah', 'blahblah',
  'spam', 'junk', 'trash', 'anonymous', 'anon', 'someone', 'somebody',
  'email', 'myemail', 'youremail', 'your.email', 'yourname', 'name', 'firstname.lastname',
  'user', 'username',
]);

// Keyboard mashes and throwaway prefixes, optionally followed by digits,
// e.g. "test123", "fake_1", "asdf99", "qwerty2024".
const FAKE_LOCAL_PART_PATTERNS = [
  /^(test|testing|tester|fake|dummy|sample|example|temp|spam|junk)[._-]?\d*$/,
  /^(test|fake|dummy|sample)[._-]?(user|email|mail|account|address)[._-]?\d*$/,
  /^(asdf|qwer|zxcv)[a-z]*\d*$/,
  /^(.)\1{2,}\d*$/, // aaa, xxxxx, zzz1
  /^(abc|xyz|abc123|123abc)\d*$/,
  /^\d{1,3}$/, // "1", "12", "123"
];

function getEmailDomain(email: string): string {
  const at = email.lastIndexOf('@');
  return at === -1 ? '' : email.slice(at + 1).toLowerCase();
}

function isFakeEmail(email: string): boolean {
  const lower = email.toLowerCase();
  const at = lower.lastIndexOf('@');
  if (at === -1) return false;
  // Ignore +tags: "test+news@gmail.com" is still a "test" mailbox.
  const local = lower.slice(0, at).split('+')[0];
  const labels = lower.slice(at + 1).split('.');
  const tld = labels[labels.length - 1];
  const sld = labels[labels.length - 2];
  if (RESERVED_TLDS.has(tld) || sld === 'example' || sld === 'test') return true;
  if (FAKE_LOCAL_PARTS.has(local)) return true;
  return FAKE_LOCAL_PART_PATTERNS.some((re) => re.test(local));
}

export function isValidEmailFormat(raw: string | null | undefined): boolean {
  const trimmed = String(raw ?? '').trim();
  if (trimmed.length < 5 || trimmed.length > 254) return false;
  if (!EMAIL_REGEX.test(trimmed)) return false;

  const [local, domain] = trimmed.split('@');
  if (!local || local.length > 64) return false;
  if (local.startsWith('.') || local.endsWith('.') || local.includes('..')) return false;
  if (domain.includes('..')) return false;

  const tld = domain.split('.').pop();
  if (!tld || tld.length < 2 || /\d/.test(tld)) return false;

  return true;
}

export function isBlockedEmailDomain(raw: string | null | undefined): boolean {
  const domain = getEmailDomain(String(raw ?? '').trim().toLowerCase());
  return BLOCKED_EMAIL_DOMAINS.has(domain);
}

// Local checks only. The live server check (see components/ui/email-input.tsx)
// adds disposable domains, typo suggestions and DNS/MX deliverability.
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
  if (isBlockedEmailDomain(trimmed) || isFakeEmail(trimmed)) {
    return 'Please enter your real email address';
  }
  return null;
}
