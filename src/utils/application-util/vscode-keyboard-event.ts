import { ChangeEvent, KeyboardEvent } from 'react';
import { NumberRange } from 'utils/type-util/NumberRange';
import { NullOptional } from 'utils/type-util/Optional';

export type KeyEvent = ChangeEvent<HTMLInputElement> & KeyboardEvent;

export type VscodeKeyboardEventResponse = {
  text: string;
  range: NumberRange | null;
};

export type Target = {
  value: string;
  range: NullOptional<NumberRange>;
};

export default class VscodeKeyboardEvent {
  readonly TAB_SIZE = 4;

  private readonly SPACES = ' '.repeat(this.TAB_SIZE);
  private value: string;
  private start: number;
  private end: number;

  constructor(target: Target) {
    this.value = target.value;
    this.start = target.range.start ?? 0;
    this.end = target.range.end ?? 0;
  }

  /**
   * エンター押下イベント処理
   *
   * @description
   * 改行する。
   * ```
   * 空白を除いたカーソル行の先頭が
   *  リスト表示用のキーワードと任意の文字が1文字以上入力されている -> キーワード付きで改行
   *  リスト表示用のキーワードのみ入力されている -> 通常の改行
   *  リスト表示用のキーワード以外の文字列が入力されている -> 通常の改行
   * ```
   * @returns {Promise<VscodeKeyboardEventResponse>}
   */
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

  /**
   * コマンド+エンター押下イベント処理
   *
   * @description
   * 強制的に改行する。
   * ```
   * カーソル行の先頭が
   *  リスト表示用のキーワードと任意の文字が1文字以上入力されている -> キーワード付きで改行
   *  リスト表示用のキーワードのみ入力されている -> 通常の改行
   *  リスト表示用のキーワード以外の文字列が入力されている -> 通常の改行
   * ```
   * @returns {Promise<VscodeKeyboardEventResponse>}
   */
  public async cmdAndEnter(): Promise<VscodeKeyboardEventResponse> {
    const firstHalf = (this.isRangeSelect() ? this.head() + this.body() : this.head()).split('\n');
    const secondHalf = this.foot().split('\n');
    const currentRow1 = this.currentRow(firstHalf);
    const currentRow2 = secondHalf.shift() ?? '';
    const currentRow = currentRow1 + currentRow2;
    firstHalf[firstHalf.length - 1] = currentRow;

    const newRow = this.generateNewLine(currentRow);

    const range = this.sum(this.end, (currentRow2 ?? '').length, newRow.length ? newRow.length + 1 : 1);
    return {
      text: this.concat([...firstHalf, newRow, ...secondHalf]),
      range: {
        start: range,
        end: range,
      },
    };
  }

  /**
   * タブ押下イベント処理
   *
   * @description
   * インデントを増やす。
   * ```
   * 範囲選択
   *  全行のインデントを増やす
   *
   * カーソル選択
   *  行の先頭がリスト表示用のキーワード -> 行のどこを選択中でもインデントを増やす
   *  行の先頭がリスト表示用のキーワード以外 -> 選択中のポイントから右にスペースをあける
   * ```
   * @returns {Promise<VscodeKeyboardEventResponse>}
   */
  public async tab(): Promise<VscodeKeyboardEventResponse> {
    let text = '';
    let range = null;
    if (this.isRangeSelect()) {
      const heads = this.head().split('\n');
      const foots = this.foot().split('\n');
      const rows = ((heads.pop() ?? '') + this.body() + (foots.shift() ?? '')).split('\n');
      text = this.concat([...heads, ...rows.map((val) => this.SPACES + val), ...foots]);

      range = {
        start: this.sum(this.start, this.TAB_SIZE),
        end: this.sum(this.end, this.TAB_SIZE * rows.length),
      };
    } else {
      const rows = this.head().split('\n');
      const currentRow = this.currentRow(rows);
      if (this.isOnlyMdListString(currentRow)) {
        rows[rows.length - 1] = this.SPACES + currentRow;
        text = this.concat(rows) + this.foot();
      } else {
        text = this.head() + this.SPACES + this.foot();
      }
      range = {
        start: this.sum(this.start, this.TAB_SIZE),
        end: this.sum(this.start, this.TAB_SIZE),
      };
    }
    return {
      text: text,
      range: range,
    };
  }

  /**
   * シフト+タブ押下イベント処理
   *
   * @description
   * インデントを減らす。
   * ```
   * 範囲選択
   *  全行のインデントを減らす
   *
   * カーソル選択
   *  選択中行のインデントを減らす
   * ```
   * @returns {Promise<VscodeKeyboardEventResponse>}
   */
  public async tabAndShift(): Promise<VscodeKeyboardEventResponse> {
    // eslint-disable-next-line no-irregular-whitespace, no-useless-escape
    const regExp = /^(\s{4}|　)/;
    const excludeTopSpace = (string: string): string => {
      return string.replace(regExp, '');
    };

    let texts = [''];
    let range: NumberRange | null = null;

    if (this.isRangeSelect()) {
      let count = 0;

      const heads = this.head().split('\n');
      const foots = this.foot().split('\n');

      const rows = ((heads.pop() ?? '') + this.body() + (foots.shift() ?? '')).split('\n').map((row) => {
        if (regExp.test(row)) {
          count++;
          range = {
            start: this.start - this.TAB_SIZE,
            end: this.end - this.TAB_SIZE * count,
          };
        }
        return excludeTopSpace(row);
      });
      texts = [...heads, ...rows, ...foots];
    } else {
      const rows = this.head().split('\n');
      const currentRow = this.currentRow(rows);
      rows[rows.length - 1] = excludeTopSpace(currentRow);

      texts = [...rows, this.foot()];

      if (regExp.test(currentRow)) {
        range = {
          start: this.start - this.TAB_SIZE,
          end: this.start - this.TAB_SIZE,
        };
      }
    }

    return {
      text: this.concat(texts),
      range: range,
    };
  }

  /**
   * 文字列の配列を改行しながら結合する。
   *
   * @param {string[]} rows 文字列の配列
   * @returns {string} 改行された文字列
   */
  private concat(rows: string[]): string {
    return rows.join('\n');
  }

  /**
   * 範囲選択されているか判断する。
   *
   * @returns {boolean} true: 範囲選択されている false: 範囲選択されていない
   */
  private isRangeSelect(): boolean {
    return this.body() !== '';
  }

  /**
   * カーソル行の文字列を返却する。
   *
   * @param {string} rows 文字列の配列
   * @returns {string} カーソル行の文字列
   */
  private currentRow(rows: string[]): string {
    return [...rows].splice(-1).join();
  }

  /**
   * 文字列の先頭からカーソルの開始位置までの文字列を返却する。
   *
   * @returns {string} 文字列の先頭からカーソルの開始位置までの文字列
   */
  private head(): string {
    return this.value.substring(0, this.start);
  }

  /**
   * カーソルの開始から終了位置までの文字列を返却する。
   *
   * @returns {string} カーソルの開始から終了位置までの文字列
   */
  private body(): string {
    return this.value.substring(this.start, this.end);
  }

  /**
   * カーソルの終了位置から文字列の最後までの文字列を返却する。
   *
   * @returns {string} カーソルの終了位置から文字列の最後までの文字列
   */
  private foot(): string {
    return this.value.substring(this.end, this.value.length);
  }

  /**
   * カーソル行の状態を見て、次に挿入する行の文字列を返却する。
   *
   * @description
   * 強制的に改行する。
   * ```
   * カーソル行の先頭が
   *  リスト表示用のキーワードと任意の文字が1文字以上入力されている -> カーソル行のインデント+キーワード
   *  リスト表示用のキーワードのみ入力されている -> 空白の文字列
   *  リスト表示用のキーワード以外の文字列が入力されている -> カーソル行のインデント+空白の文字列
   * ```
   * @param {string} currentRow カーソル行の文字列
   * @returns {string} 次に挿入する行の文字列
   */
  private generateNewLine(currentRow: string): string {
    // eslint-disable-next-line no-irregular-whitespace, no-useless-escape
    const pad = currentRow.match(/^(\s*|　*)/)?.shift() ?? '';
    const matchWord = this.isMatch(currentRow);
    if (this.isOnlyMdListString(currentRow)) {
      return '';
    }
    if (!matchWord) {
      return pad;
    }

    return pad + (/^\d*$/.test(matchWord) ? `${Number(matchWord) + 1}. ` : `${matchWord} `);
  }

  /**
   * 文字列内にリスト表示用のキーワードが存在するか判断する。
   *
   * @param {string} string 任意文字列
   * @returns {string | null} [- | * | > |(1-9)*] | null
   */
  private isMatch(string: string): string | null {
    return (
      string
        .trim()
        .match(/^[-|*|>]\s(\S+)|^\d*\.\s(\S+)/)
        ?.shift()
        ?.match(/^\d+|^\S/)
        ?.shift() ?? null
    );
  }

  /**
   * 文字列内が空白を除いてリスト表示用のキーワードのみか判断する。
   *
   * @param {string} string 任意文字列
   * @returns {boolean} true: リスト表示用のキーワードのみ false: リスト表示用のキーワード意外にも文字列がある
   */
  private isOnlyMdListString(string: string): boolean {
    // eslint-disable-next-line no-irregular-whitespace, no-useless-escape
    return /^[-|*|>]\s$|^\d*\.\s$/.test(string.replace(/^(\s*|　*)/, ''));
  }

  /**
   * 引数で与えられる数値を加算した合計数値を返却する。
   *
   * @param {number[]} numbers 任意数値
   * @returns {number} 合計数値
   */
  private sum(...numbers: number[]): number {
    return numbers.reduce((accumulator: number, currentValue: number) => accumulator + currentValue);
  }
}
