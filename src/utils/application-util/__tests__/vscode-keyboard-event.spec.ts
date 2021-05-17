import VscodeKeyboardEvent, { Target } from '../vscode-keyboard-event';

const createInstance = (t: Target) => new VscodeKeyboardEvent(t);

const NORMAL_TEXT = `
# Hello, World!
## My name is JavaScript
`.trim();

const PAD = ' '.repeat(4);

const createSampleListText = (prefix: '-' | '*' | '>', count: number) => {
  return [...Array(count)].map((_, i) => (i === 0 ? '' : `${PAD.repeat(i)}`) + `${prefix} hoge${i}`).join('\n');
};
const createSampleNumListText = (count: number) => {
  return [...Array(count)].map((_, i) => (i === 0 ? '' : `${PAD.repeat(i)}`) + `${i}. hoge${i}`).join('\n');
};

describe('VscodeKeyboardEventクラスのテスト', () => {
  it('デフォルトで設定されたタブのサイズが 4 であることをテストする', () => {
    const instance = createInstance({
      value: '',
      range: { start: 2, end: 2 },
    });
    expect(instance.TAB_SIZE).toBe(4);
  });
  describe('イベントテスト', () => {
    describe('エンター押下', () => {
      describe('カーソル選択', () => {
        it('文字列リスト', () => {
          const testText = createSampleListText('-', 4);
          const instance = createInstance({
            value: testText,
            range: { start: 2, end: 2 },
          });
          instance.enter();
        });
        it('数値リスト', () => {
          const testText = createSampleNumListText(4);
          const instance = createInstance({
            value: testText,
            range: { start: 2, end: 2 },
          });
          instance.enter();
        });
        it('通常テキスト', () => {
          const instance = createInstance({
            value: NORMAL_TEXT,
            range: { start: 2, end: 2 },
          });
          instance.enter();
        });
      });

      describe('範囲選択', () => {
        it('文字列リスト', () => {
          const testText = createSampleListText('-', 4);
          const instance = createInstance({
            value: testText,
            range: { start: 2, end: testText.length },
          });
          instance.enter();
        });
        it('数値リスト', () => {
          const testText = createSampleNumListText(4);
          const instance = createInstance({
            value: testText,
            range: { start: 2, end: testText.length },
          });
          instance.enter();
        });
        it('通常テキスト', () => {
          const instance = createInstance({
            value: NORMAL_TEXT,
            range: { start: 2, end: NORMAL_TEXT.length },
          });
          instance.enter();
        });
      });
    });
    describe('コマンド+エンター押下', () => {
      // createInstance();
    });
    describe('タブ押下', () => {
      // createInstance();
    });
    describe('シフト+タブ押下', () => {
      // createInstance();
    });
  });
});
