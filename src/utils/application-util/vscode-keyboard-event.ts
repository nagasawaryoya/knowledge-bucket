import { ChangeEvent, KeyboardEvent } from 'react';
import { NumberRange } from 'utils/type-util/NumberRange';

export type KeyEvent = ChangeEvent<HTMLInputElement> & KeyboardEvent;

export type VscodeKeyboardEventResponse = {
  text: string;
  range: NumberRange | null;
};

export default class VscodeKeyboardEvent {
  readonly TAB_SIZE = 4;

  private readonly MD_LIST_KEYWORDS = ['-', '*', '>'];
  private readonly SPACES = ' '.repeat(this.TAB_SIZE);
  private value: string;
  private start: number;
  private end: number;

  constructor(event: KeyEvent) {
    this.value = event.target.value;
    this.start = event.target.selectionStart ?? 0;
    this.end = event.target.selectionEnd ?? 0;
  }

  public async enter(): Promise<VscodeKeyboardEventResponse> {
    const rows = this.head().split('\n');
    const defaultRowLength = rows.length;
    const currentRow = this.currentRow([...rows]);
    const matchWord = this.isMdListKeyword(currentRow);

    rows[defaultRowLength] = currentRow.match(this.regExpTopAllSpace()) + (matchWord ? `${matchWord} ` : '');

    return {
      text: this.concat(rows) + this.foot(),
      range: {
        start: this.start + (rows[defaultRowLength].length ? rows[defaultRowLength].length + 1 : 1),
        end: this.start + (rows[defaultRowLength].length ? rows[defaultRowLength].length + 1 : 1),
      },
    };
  }

  public async tab(): Promise<VscodeKeyboardEventResponse> {
    return {
      text: this.head() + this.SPACES + this.foot(),
      range: {
        start: this.start + this.TAB_SIZE,
        end: this.start + this.TAB_SIZE,
      },
    };
  }

  public async tabAndShift(): Promise<VscodeKeyboardEventResponse> {
    let top = '';
    let rows: string[] = [];
    let range: NumberRange | null = null;

    if (this.isRangeSelect()) {
      top = this.head();
      rows = this.body()
        .split('\n')
        .map((row) => this.excludeTopSpace(row));
    } else {
      rows = this.head().split('\n');
      const currentRow = this.currentRow(rows);
      rows[rows.length - 1] = this.excludeTopSpace(currentRow);

      if (this.regExpTopSpace().test(currentRow)) {
        range = {
          start: this.start - this.TAB_SIZE,
          end: this.start - this.TAB_SIZE,
        };
      }
    }

    return {
      text: top + this.concat(rows) + this.foot(),
      range: range,
    };
  }

  private concat(rows: string[]): string {
    return rows.join('\n');
  }

  private regExpTopSpace(): RegExp {
    // eslint-disable-next-line no-irregular-whitespace, no-useless-escape
    return new RegExp(/^(\s{4}|　)/, 'mg');
  }

  private regExpTopAllSpace(): RegExp {
    // eslint-disable-next-line no-irregular-whitespace, no-useless-escape
    return new RegExp(/^(\s*|　)/, 'mg');
  }

  private excludeTopSpace(string: string): string {
    return string.replace(this.regExpTopSpace(), '');
  }

  private isRangeSelect(): boolean {
    return this.body() !== '';
  }

  private currentRow(rows: string[]): string {
    return rows.splice(-1).join();
  }

  private head() {
    return this.value.substring(0, this.start);
  }

  private body() {
    return this.value.substring(this.start, this.end);
  }

  private foot() {
    return this.value.substring(this.end, this.value.length);
  }

  private isMdListKeyword(row: string) {
    return this.MD_LIST_KEYWORDS.filter((keyword) => row.includes(keyword))[0];
  }
}
