import { ChangeEvent, KeyboardEvent } from 'react';

type KeyEvent = ChangeEvent<HTMLInputElement> & KeyboardEvent;

export default class VscodeKeyboardEvent {
  readonly TAB_SIZE = 4;

  private readonly SPACES = ' '.repeat(this.TAB_SIZE);
  private value: string;
  private start: number;
  private end: number;

  constructor(event: KeyEvent) {
    this.value = event.target.value;
    this.start = event.target.selectionStart ?? 0;
    this.end = event.target.selectionEnd ?? 0;
  }

  public async tab() {
    return {
      text: this.value.substring(0, this.start) + this.SPACES + this.value.substring(this.end, this.value.length),
      range: {
        start: this.start + this.TAB_SIZE,
        end: this.start + this.TAB_SIZE,
      },
    };
  }

  public async tabAndShift() {
    let isChange = false;

    const top = this.value.substring(0, this.start);
    const rows = this.value.substring(this.start, this.end).split('\n');
    const bottom = this.value.substring(this.end, this.value.length);

    let newText = '';
    rows.map((row, i) => {
      newText += row.replace(this.isTopSpace(), '');
      if (i !== rows.length - 1) {
        newText += '\n';
      }
      if (!isChange) {
        isChange = this.isTopSpace().test(row);
      }
    });

    if (this.value.substring(this.start, this.end) !== '') {
      return {
        text: top + newText + bottom,
        isChange: isChange,
        range: {
          start: this.start,
          end: this.end,
        },
      };
    } else {
      return {
        text: newText + bottom,
        isChange: isChange,
        range: {
          start: this.start - this.TAB_SIZE,
          end: this.start - this.TAB_SIZE,
        },
      };
    }
  }

  private isTopSpace() {
    // eslint-disable-next-line no-irregular-whitespace, no-useless-escape
    return new RegExp(/^(\s{4}|　)/, 'mg');
  }
}
