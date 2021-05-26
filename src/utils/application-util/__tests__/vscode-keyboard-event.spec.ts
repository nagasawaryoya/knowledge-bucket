import VscodeKeyboardEvent, { Target } from '../vscode-keyboard-event';

const createInstance = (t: Target) => new VscodeKeyboardEvent(t);

const NORMAL_TEXT = `
# Hello, World!
## My name is JavaScript
`.trim();

const NORMAL_TEXT2 = `
# Hello, World!
## My name is JavaScript
    I am Nagasawa
        I am Nagasawa
`.trim();

const PAD = ' '.repeat(4);

/**
 * @param {number} count 行数
 * @param {string} prefix リスト用接頭辞
 * @returns {string}
 *
 * @example
 * ```typescript
 * createSampleListText(2)
 * `1. hoge
 *     2. hoge`
 *
 * createSampleListText(2, '-')
 * `- hoge
 *     - hoge`
 * ```
 */
const createSampleListText = (count: number, prefix?: '-' | '*' | '>'): string => {
  return [...Array(count)]
    .map((_, i) => (i === 0 ? '' : `${PAD.repeat(i)}`) + (prefix ? `${prefix} hoge` : `${i + 1}. hoge`))
    .join('\n');
};

const lTrim = (string: string) => string.replace(/^\n/, '');

describe('VscodeKeyboardEventクラスのテスト', () => {
  it('デフォルトで設定されたタブのサイズが 4 であることをテストする', () => {
    const instance = createInstance({
      value: '',
      range: { start: 2, end: 2 },
    });
    expect(instance.TAB_SIZE).toBe(4);
  });
  describe('イベントテスト', () => {
    /**
     * enter()
     */
    describe('エンター押下', () => {
      describe('カーソル選択', () => {
        it('文字列リスト', () => {
          const testText = createSampleListText(2, '-');
          const instance = createInstance({
            value: testText,
            range: { start: 5, end: 5 },
          });
          instance.enter().then((result) => {
            expect(result.range).toStrictEqual({
              start: 8,
              end: 8,
            });

            expect(result.text).toBe(
              `
- hog
- e
    - hoge
            `.trim(),
            );
          });
        });

        it('数値リスト', () => {
          const testText = createSampleListText(2);
          const instance = createInstance({
            value: testText,
            range: { start: 18, end: 18 },
          });
          instance.enter().then((result) => {
            expect(result.range).toStrictEqual({
              start: 26,
              end: 26,
            });

            expect(result.text).toBe(
              `
1. hoge
    2. hog
    3. e
            `.trim(),
            );
          });
        });

        it('通常テキスト', () => {
          const instance = createInstance({
            value: NORMAL_TEXT,
            range: { start: 14, end: 14 },
          });
          instance.enter().then((result) => {
            expect(result.range).toStrictEqual({
              start: 15,
              end: 15,
            });

            expect(result.text).toBe(
              `
# Hello, World
!
## My name is JavaScript
            `.trim(),
            );
          });
        });
      });

      describe('範囲選択', () => {
        it('文字列リスト', () => {
          const testText = createSampleListText(2, '-');
          const instance = createInstance({
            value: testText,
            range: { start: 14, end: 16 },
          });
          instance.enter().then((result) => {
            expect(result.range).toStrictEqual({
              start: 21,
              end: 21,
            });

            expect(result.text).toBe(
              `
- hoge
    - h
    - e
            `.trim(),
            );
          });
        });
        it('数値リスト', () => {
          const testText = createSampleListText(2);
          const instance = createInstance({
            value: testText,
            range: { start: 16, end: 18 },
          });
          instance.enter().then((result) => {
            expect(result.range).toStrictEqual({
              start: 24,
              end: 24,
            });

            expect(result.text).toBe(
              `
1. hoge
    2. h
    3. e
            `.trim(),
            );
          });
        });
        it('通常テキスト', () => {
          const instance = createInstance({
            value: NORMAL_TEXT,
            range: { start: 7, end: 14 },
          });
          instance.enter().then((result) => {
            expect(result.range).toStrictEqual({
              start: 8,
              end: 8,
            });

            expect(result.text).toBe(
              `
# Hello
!
## My name is JavaScript
            `.trim(),
            );
          });
        });
      });
    });

    /**
     * cmdAndEnter()
     */
    describe('コマンド+エンター押下', () => {
      describe('カーソル選択', () => {
        it('文字列リスト', () => {
          const testText = createSampleListText(2, '-');
          const instance = createInstance({
            value: testText,
            range: { start: 11, end: 11 },
          });
          instance.cmdAndEnter().then((result) => {
            expect(result.range).toStrictEqual({
              start: 24,
              end: 24,
            });

            ''.replace(/^\n/, '');
            expect(result.text).toBe(
              lTrim(
                `
- hoge
    - hoge
    - `,
              ),
            );
          });
        });

        it('数値リスト', () => {
          const testText = createSampleListText(2);
          const instance = createInstance({
            value: testText,
            range: { start: 15, end: 15 },
          });
          instance.cmdAndEnter().then((result) => {
            expect(result.range).toStrictEqual({
              start: 27,
              end: 27,
            });

            expect(result.text).toBe(
              lTrim(
                `
1. hoge
    2. hoge
    3. `,
              ),
            );
          });
        });

        it('通常テキスト', () => {
          const instance = createInstance({
            value: NORMAL_TEXT,
            range: { start: 14, end: 14 },
          });
          instance.cmdAndEnter().then((result) => {
            expect(result.range).toStrictEqual({
              start: 16,
              end: 16,
            });

            expect(result.text).toBe(
              lTrim(
                `
# Hello, World!

## My name is JavaScript`,
              ),
            );
          });
        });

        describe('範囲選択', () => {
          it('文字列リスト', () => {
            const testText = createSampleListText(2, '-');
            const instance = createInstance({
              value: testText,
              range: { start: 11, end: 16 },
            });
            instance.cmdAndEnter().then((result) => {
              expect(result.range).toStrictEqual({
                start: 24,
                end: 24,
              });

              expect(result.text).toBe(
                lTrim(
                  `
- hoge
    - hoge
    - `,
                ),
              );
            });
          });

          it('数値リスト', () => {
            const testText = createSampleListText(2);
            const instance = createInstance({
              value: testText,
              range: { start: 15, end: 18 },
            });
            instance.cmdAndEnter().then((result) => {
              expect(result.range).toStrictEqual({
                start: 27,
                end: 27,
              });

              expect(result.text).toBe(
                lTrim(
                  `
1. hoge
    2. hoge
    3. `,
                ),
              );
            });
          });

          it('通常テキスト', () => {
            const instance = createInstance({
              value: NORMAL_TEXT,
              range: { start: 2, end: 14 },
            });
            instance.cmdAndEnter().then((result) => {
              expect(result.range).toStrictEqual({
                start: 16,
                end: 16,
              });

              expect(result.text).toBe(
                `
# Hello, World!

## My name is JavaScript
                `.trim(),
              );
            });
          });
        });
      });

      /**
       * tab()
       */
      describe('タブ押下', () => {
        describe('カーソル選択', () => {
          it('文字列リスト', () => {
            const testText = createSampleListText(1, '-');
            const instance = createInstance({
              value: testText,
              range: { start: 0, end: 0 },
            });
            instance.tab().then((result) => {
              expect(result.range).toStrictEqual({
                start: 4,
                end: 4,
              });

              expect(result.text).toBe(`    - hoge`);
            });

            // リスト用のキーワードのみの際にタブを押した際は、インデントを増やす。
            const testText2 = '- ';
            const instance2 = createInstance({
              value: testText2,
              range: { start: testText2.length, end: testText2.length },
            });
            instance2.tab().then((result) => {
              expect(result.range).toStrictEqual({
                start: 6,
                end: 6,
              });

              expect(result.text).toBe(`    - `);
            });
          });

          it('数値リスト', () => {
            const testText = createSampleListText(1);
            const instance = createInstance({
              value: testText,
              range: { start: 0, end: 0 },
            });
            instance.tab().then((result) => {
              expect(result.range).toStrictEqual({
                start: 4,
                end: 4,
              });

              expect(result.text).toBe(`    1. hoge`);
            });

            // リスト用のキーワードのみの際にタブを押した際は、インデントを増やす。
            const testText2 = '1. ';
            const instance2 = createInstance({
              value: testText2,
              range: { start: testText2.length, end: testText2.length },
            });
            instance2.tab().then((result) => {
              expect(result.range).toStrictEqual({
                start: 7,
                end: 7,
              });

              expect(result.text).toBe(`    1. `);
            });
          });

          it('通常テキスト', () => {
            const instance = createInstance({
              value: NORMAL_TEXT,
              range: { start: 0, end: 0 },
            });
            instance.tab().then((result) => {
              expect(result.range).toStrictEqual({
                start: 4,
                end: 4,
              });

              expect(result.text).toBe(
                lTrim(
                  `
    # Hello, World!
## My name is JavaScript`,
                ),
              );
            });
          });
        });

        describe('範囲選択', () => {
          it('文字列リスト', () => {
            const testText = createSampleListText(3, '-');
            const instance = createInstance({
              value: testText,
              range: { start: 13, end: 28 },
            });
            instance.tab().then((result) => {
              expect(result.range).toStrictEqual({
                start: 17,
                end: 36,
              });

              ''.replace(/^\n/, '');
              expect(result.text).toBe(
                `
- hoge
        - hoge
            - hoge
`.trim(),
              );
            });
          });

          it('数値リスト', () => {
            const testText = createSampleListText(3);
            const instance = createInstance({
              value: testText,
              range: { start: 15, end: 31 },
            });
            instance.tab().then((result) => {
              expect(result.range).toStrictEqual({
                start: 19,
                end: 39,
              });

              expect(result.text).toBe(
                lTrim(
                  `
1. hoge
        2. hoge
            3. hoge
`.trim(),
                ),
              );
            });
          });

          it('通常テキスト', () => {
            const instance = createInstance({
              value: NORMAL_TEXT,
              range: { start: 9, end: 29 },
            });
            instance.tab().then((result) => {
              expect(result.range).toStrictEqual({
                start: 13,
                end: 37,
              });

              expect(result.text).toBe(
                `    # Hello, World!
    ## My name is JavaScript`,
              );
            });
          });
        });
      });

      describe('シフト+タブ押下', () => {
        describe('カーソル選択', () => {
          it('文字列リスト', () => {
            const testText = createSampleListText(2, '-');
            const instance = createInstance({
              value: testText,
              range: { start: 13, end: 13 },
            });
            instance.tabAndShift().then((result) => {
              expect(result.range).toStrictEqual({
                start: 9,
                end: 9,
              });

              expect(result.text).toBe(
                `
- hoge
- hoge
              `.trim(),
              );
            });
          });

          it('数値リスト', () => {
            const testText = createSampleListText(3);
            const instance = createInstance({
              value: testText,
              range: { start: 31, end: 31 },
            });
            instance.tabAndShift().then((result) => {
              expect(result.range).toStrictEqual({
                start: 27,
                end: 27,
              });

              expect(result.text).toBe(
                `
1. hoge
    2. hoge
    3. hoge
              `.trim(),
              );
            });
          });

          it('通常テキスト', () => {
            const instance = createInstance({
              value: NORMAL_TEXT2,
              range: { start: 47, end: 47 },
            });
            instance.tabAndShift().then((result) => {
              expect(result.range).toStrictEqual({
                start: 43,
                end: 43,
              });

              expect(result.text).toBe(
                `
# Hello, World!
## My name is JavaScript
I am Nagasawa
        I am Nagasawa
`.trim(),
              );
            });
          });
        });

        describe('範囲選択', () => {
          it('文字列リスト', () => {
            const testText = createSampleListText(3, '-');
            const instance = createInstance({
              value: testText,
              range: { start: 15, end: 28 },
            });
            instance.tabAndShift().then((result) => {
              expect(result.range).toStrictEqual({
                start: 11,
                end: 20,
              });

              expect(result.text).toBe(
                `
- hoge
- hoge
    - hoge
              `.trim(),
              );
            });
          });

          it('数値リスト', () => {
            const testText = createSampleListText(3);
            const instance = createInstance({
              value: testText,
              range: { start: 17, end: 31 },
            });
            instance.tabAndShift().then((result) => {
              expect(result.range).toStrictEqual({
                start: 13,
                end: 23,
              });

              expect(result.text).toBe(
                `
1. hoge
2. hoge
    3. hoge
              `.trim(),
              );
            });
          });

          it('通常テキスト', () => {
            const instance = createInstance({
              value: NORMAL_TEXT2,
              range: { start: 54, end: 72 },
            });
            instance.tabAndShift().then((result) => {
              expect(result.range).toStrictEqual({
                start: 50,
                end: 64,
              });

              expect(result.text).toBe(
                `
# Hello, World!
## My name is JavaScript
I am Nagasawa
    I am Nagasawa
`.trim(),
              );
            });
          });
        });
      });
    });
  });
});
