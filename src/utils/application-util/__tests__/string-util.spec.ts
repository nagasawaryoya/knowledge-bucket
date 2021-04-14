import StringUtil from '../string-util';

describe('StringUtilクラスのテスト', () => {
  describe('format()', () => {
    const testText = 'test';
    const testVariableText = 'test{0}';
    const testReplaceText = 'です！';

    describe('正常系', () => {
      it('メッセージ文をフォーマットすることをテストする', () => {
        const testFormattedText = 'testです！';
        expect(StringUtil.format(testVariableText, testReplaceText)).toStrictEqual(testFormattedText);
      });

      it('メッセージ文をフォーマットすることをテストする(置換箇所3つver)', () => {
        const testThreeVariableText = 'あ{0}う{1}お{2}';
        const testThreeReplaceText = ['い', 'え', 'か'];
        const formattedText = 'あいうえおか';
        expect(StringUtil.format(testThreeVariableText, ...testThreeReplaceText)).toStrictEqual(formattedText);
      });
    });

    describe('異常系', () => {
      it('引数で置換文字列を渡さなかった場合はフォーマットしないことをテストする', () => {
        expect(StringUtil.format(testText)).toStrictEqual(testText);
        expect(StringUtil.format(testVariableText)).toStrictEqual(testVariableText);
      });

      it('引数で置換対象の文字列に可変文字がない場合はフォーマットしないことをテストする', () => {
        expect(StringUtil.format(testText, testReplaceText)).toStrictEqual(testText);
      });
    });
  });
});
