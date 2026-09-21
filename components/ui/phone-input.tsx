'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { formatUSPhoneInput, getUSPhoneDigits } from '@/lib/us-phone';

export type PhoneInputProps = Omit<
  React.ComponentProps<typeof Input>,
  'type' | 'inputMode' | 'autoComplete' | 'onChange' | 'value'
> & {
  value: string;
  onValueChange: (value: string) => void;
};

// Counts digit characters in `formatted` that occur before `position`.
function digitIndexBeforePosition(formatted: string, position: number): number {
  let count = 0;
  for (let i = 0; i < position && i < formatted.length; i++) {
    if (/\d/.test(formatted[i])) count++;
  }
  return count;
}

// Finds the index right after the Nth digit (1-based) in `formatted`, so the
// cursor lands next to the same logical digit instead of jumping to the end.
function positionAfterDigitIndex(formatted: string, digitIndex: number): number {
  if (digitIndex <= 0) return 0;
  let count = 0;
  for (let i = 0; i < formatted.length; i++) {
    if (/\d/.test(formatted[i])) {
      count++;
      if (count === digitIndex) return i + 1;
    }
  }
  return formatted.length;
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onValueChange, className, onKeyDown, ...props }, forwardedRef) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const pendingCursorRef = React.useRef<number | null>(null);

    const setRefs = React.useCallback(
      (el: HTMLInputElement | null) => {
        inputRef.current = el;
        if (typeof forwardedRef === 'function') forwardedRef(el);
        else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
      },
      [forwardedRef]
    );

    // Restore the cursor to where the edit logically happened, instead of
    // letting the browser reset it to the end after the controlled value
    // (re)formats on every keystroke.
    React.useLayoutEffect(() => {
      if (pendingCursorRef.current !== null && inputRef.current) {
        const pos = pendingCursorRef.current;
        inputRef.current.setSelectionRange(pos, pos);
        pendingCursorRef.current = null;
      }
    }, [value]);

    const applyDeletion = (current: string, digitsBefore: number, digitsToRemove: number) => {
      const rawDigits = getUSPhoneDigits(current).split('');
      rawDigits.splice(digitsBefore, digitsToRemove);
      const newFormatted = formatUSPhoneInput(rawDigits.join(''));
      pendingCursorRef.current = positionAfterDigitIndex(newFormatted, digitsBefore);
      onValueChange(newFormatted);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(e);
      if (e.defaultPrevented) return;
      if (e.key !== 'Backspace' && e.key !== 'Delete') return;
      if (e.ctrlKey || e.metaKey || e.altKey) return; // let word/line-delete shortcuts fall through

      const input = e.currentTarget;
      const current = value ?? '';
      const selectionStart = input.selectionStart ?? current.length;
      const selectionEnd = input.selectionEnd ?? current.length;

      if (selectionStart !== selectionEnd) {
        e.preventDefault();
        const digitsBeforeStart = digitIndexBeforePosition(current, selectionStart);
        const digitsBeforeEnd = digitIndexBeforePosition(current, selectionEnd);
        applyDeletion(current, digitsBeforeStart, digitsBeforeEnd - digitsBeforeStart);
        return;
      }

      if (e.key === 'Backspace') {
        if (selectionStart === 0) {
          e.preventDefault();
          return;
        }
        let i = selectionStart - 1;
        while (i >= 0 && !/\d/.test(current[i])) i--;
        e.preventDefault();
        if (i < 0) {
          pendingCursorRef.current = 0;
          return;
        }
        applyDeletion(current, digitIndexBeforePosition(current, i), 1);
        return;
      }

      // Delete
      let i = selectionStart;
      while (i < current.length && !/\d/.test(current[i])) i++;
      e.preventDefault();
      if (i >= current.length) return;
      applyDeletion(current, digitIndexBeforePosition(current, i), 1);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const rawCursor = e.target.selectionStart ?? rawValue.length;
      const digitsBeforeCursor = getUSPhoneDigits(rawValue.slice(0, rawCursor)).length;
      const formatted = formatUSPhoneInput(rawValue);
      pendingCursorRef.current = positionAfterDigitIndex(formatted, digitsBeforeCursor);
      onValueChange(formatted);
    };

    return (
      <Input
        ref={setRefs}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="(555) 123-4567"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={cn(className)}
        {...props}
      />
    );
  }
);
PhoneInput.displayName = 'PhoneInput';
