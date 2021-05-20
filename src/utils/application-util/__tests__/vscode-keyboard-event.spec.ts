import VscodeKeyboardEvent, { Target } from '../vscode-keyboard-event';

const createInstance = (t: Target) => new VscodeKeyboardEvent(t);

const NORMAL_TEXT = `
# Hello, World!
## My name is JavaScript
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
      describe('タブ押下', () => {
        // createInstance();
      });
      describe('シフト+タブ押下', () => {
        // createInstance();
      });
    });
  });
});
