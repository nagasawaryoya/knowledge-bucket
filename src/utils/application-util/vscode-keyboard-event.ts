import { ChangeEvent, KeyboardEvent } from 'react';
import { NumberRange } from 'utils/type-util/NumberRange';

export type KeyEvent = ChangeEvent<HTMLInputElement> & KeyboardEvent;

export type VscodeKeyboardEventResponse = {
  text: string;
  range: NumberRange | null;
};

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

  public async enter(): Promise<VscodeKeyboardEventResponse> {
    const rows = this.head().split('\n');
    const currentRow = this.currentRow(rows);
    const newRow = this.generateNewLine(currentRow);
    rows.push(newRow);

    const range = this.sum(this.start, newRow.length ? newRow.length + 1 : 1);
    return {
      text: this.concat(rows) + this.foot(),
      range: {
        start: range,
        end: range,
      },
    };
  }

  public async cmdAndEnter(): Promise<VscodeKeyboardEventResponse> {
    const firstHalfSelection = this.head().split('\n');
    const secondHalfSelection = this.foot().split('\n');
    const currentRow1 = this.currentRow(firstHalfSelection);
    const currentRow2 = secondHalfSelection.shift() ?? '';
    const currentRow = currentRow1 + currentRow2;
    const newRow = this.generateNewLine(currentRow);
    firstHalfSelection[firstHalfSelection.length - 1] = currentRow;

    const range = this.sum(this.start, currentRow2.length, newRow.length ? newRow.length + 1 : 1);
    return {
      text: this.concat([...firstHalfSelection, newRow, ...secondHalfSelection]),
      range: {
        start: range,
        end: range,
      },
    };
  }

  public async tab(): Promise<VscodeKeyboardEventResponse> {
    const range = this.sum(this.start, this.TAB_SIZE);
    return {
      text: this.head() + this.SPACES + this.foot(),
      range: {
        start: range,
        end: range,
      },
    };
  }

  public async tabAndShift(): Promise<VscodeKeyboardEventResponse> {
    // eslint-disable-next-line no-irregular-whitespace, no-useless-escape
    const regExp = /^(\s{4}|　)/;
    const excludeTopSpace = (string: string): string => {
      return string.replace(regExp, '');
    };

    let top = '';
    let rows: string[] = [''];
    let range: NumberRange | null = null;

    if (this.isRangeSelect()) {
      let count = 0;
      top = this.head();
      rows = this.body()
        .split('\n')
        .map((row) => {
          if (regExp.test(row)) {
            count++;
            range = {
              start: this.start,
              end: this.end - this.TAB_SIZE * count,
            };
          }
          return excludeTopSpace(row);
        });
    } else {
      rows = this.head().split('\n');
      const currentRow = this.currentRow(rows);
      rows[rows.length - 1] = excludeTopSpace(currentRow);

      if (regExp.test(currentRow)) {
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

  private isRangeSelect(): boolean {
    return this.body() !== '';
  }

  private currentRow(rows: string[]): string {
    return [...rows].splice(-1).join();
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

  private generateNewLine(currentRow: string) {
    const matchWord =
      currentRow
        .trim()
        .match(/^[-|*|>]\s(\S+)|^[-]?\d*\.\s(\S+)/)
        ?.shift()
        ?.match(/^\d+|^\S/)
        ?.shift() ?? null;

    if (!matchWord) {
      return '';
    }

    let mdListString = '';
    if (/^[-]?\d*$/.test(matchWord)) {
      mdListString = `${Number(matchWord) + 1}. `;
    } else {
      mdListString = `${matchWord} `;
    }
    // eslint-disable-next-line no-irregular-whitespace, no-useless-escape
    return (currentRow.match(/^(\s*|　*)/)?.shift() ?? '') + mdListString;
  }

  private sum(...numbers: number[]) {
    return numbers.reduce((accumulator: number, currentValue: number) => accumulator + currentValue);
  }
}
