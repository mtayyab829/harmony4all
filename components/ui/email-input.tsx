'use client';

import * as React from 'react';
import { AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { getEmailValidationError } from '@/lib/email';
import { useLiveVerification } from '@/lib/contact-verification';

export type EmailInputProps = Omit<React.ComponentProps<typeof Input>, 'type' | 'value'> & {
  value: string;
};

const isLocallyValid = (v: string) => getEmailValidationError(v) === null;

// Sets a controlled input's value the way a user edit would, so the parent's
// existing onChange handler receives the corrected address.
function setNativeInputValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
  setter?.call(input, value);
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

// Email field that, on blur, asks the server whether the address can really
// receive mail (domain exists, MX records, not disposable, not a typo like
// "gmial.com") and shows the problem inline with a one-click fix for typos.
export const EmailInput = React.forwardRef<HTMLInputElement, EmailInputProps>(
  ({ value, onBlur, className, id, ...props }, forwardedRef) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const generatedId = React.useId();
    const messageId = `${id ?? generatedId}-live-error`;
    const { error, suggestion, check } = useLiveVerification('email', value, isLocallyValid);

    const setRefs = React.useCallback(
      (el: HTMLInputElement | null) => {
        inputRef.current = el;
        if (typeof forwardedRef === 'function') forwardedRef(el);
        else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
      },
      [forwardedRef]
    );

    const applySuggestion = () => {
      if (!suggestion || !inputRef.current) return;
      setNativeInputValue(inputRef.current, suggestion);
      inputRef.current.focus();
    };

    return (
      <>
        <Input
          {...props}
          ref={setRefs}
          id={id}
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          value={value}
          onBlur={(e) => {
            onBlur?.(e);
            void check();
          }}
          aria-invalid={error ? true : props['aria-invalid']}
          aria-describedby={error ? messageId : props['aria-describedby']}
          className={cn(className, error && 'border-red-500 focus:border-red-500')}
        />
        {error && (
          <p id={messageId} role="alert" className="text-red-600 text-sm mt-1 flex items-start gap-1">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>
              {suggestion ? (
                <>
                  Did you mean{' '}
                  <button type="button" onClick={applySuggestion} className="underline font-medium hover:text-red-800">
                    {suggestion}
                  </button>
                  ?
                </>
              ) : (
                error
              )}
            </span>
          </p>
        )}
      </>
    );
  }
);
EmailInput.displayName = 'EmailInput';
