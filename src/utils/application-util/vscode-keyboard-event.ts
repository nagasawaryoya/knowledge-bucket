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
    const matchWord = this.isMdListKeyword(currentRow);
    let mdListString = '';
    if (matchWord) {
      if (!isNaN(Number(matchWord))) {
        mdListString = `${Number(matchWord) + 1}. `;
      } else {
        mdListString = `${matchWord} `;
      }
    }

    const newRow = currentRow.match(this.regExpTopAllSpace()) + mdListString;

    rows.push(newRow);

    return {
      text: this.concat(rows) + this.foot(),
      range: {
        start: this.start + (newRow.length ? newRow.length + 1 : 1),
        end: this.start + (newRow.length ? newRow.length + 1 : 1),
      },
    };
  }

  public async cmdAndEnter(): Promise<VscodeKeyboardEventResponse> {
    const firstHalfSelection = this.head().split('\n');
    const secondHalfSelection = this.foot().split('\n');
    const currentRow1 = this.currentRow(firstHalfSelection);
    const currentRow2 = secondHalfSelection.shift() ?? '';
    const currentRow = currentRow1 + currentRow2;
    const matchWord = this.isMdListKeyword(currentRow);
    let mdListString = '';
    if (matchWord) {
      if (!isNaN(Number(matchWord))) {
        mdListString = `${Number(matchWord) + 1}. `;
      } else {
        mdListString = `${matchWord} `;
      }
    }

    const newRow = currentRow.match(this.regExpTopAllSpace()) + mdListString;

    firstHalfSelection[firstHalfSelection.length - 1] = currentRow;
    return {
      text: this.concat([...firstHalfSelection, newRow, ...secondHalfSelection]),
      range: {
        start: this.start + currentRow2.length + (newRow.length ? newRow.length + 1 : 1),
        end: this.start + currentRow2.length + (newRow.length ? newRow.length + 1 : 1),
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
      let count = 0;
      top = this.head();
      rows = this.body()
        .split('\n')
        .map((row) => {
          if (this.regExpTopSpace().test(row)) {
            range = {
              start: this.start,
              end: this.end - this.TAB_SIZE * count++,
            };
          }
          return this.excludeTopSpace(row);
        });
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
    return new RegExp(/^(\s*|　*)/, 'mg');
  }

  private notRenzoku() {
    new RegExp(`^-(?!.*-)`);
  }

  private excludeTopSpace(string: string): string {
    return string.replace(this.regExpTopSpace(), '');
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

  private isMdListKeyword(row: string) {
    return (
      row
        .match(/^[-|*|>]\s(\S+)|^[1-9]\.\s(\S+)/)
        ?.shift()
        ?.trim()
        .slice(0, 1) ?? null
    );
  }
}
