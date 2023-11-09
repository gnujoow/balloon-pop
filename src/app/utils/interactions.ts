import { MouseEvent } from 'react';

/**
 *
 * @param e : ReactMouseEvent
 * @param text
 * @returns
 */

export const onSaveClipboard = async (
  e: MouseEvent,
  text: string,

) => {
  try {
    e?.stopPropagation();
    e?.preventDefault();
    if (!navigator.clipboard) {
      throw 'Clipboard API not supported';
    }

    await navigator.clipboard.writeText(text);

    alert('copied');
  } catch (error) {
    alert('failed');
  }
};