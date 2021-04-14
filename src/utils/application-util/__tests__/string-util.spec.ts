import StringUtil from '../string-util';

describe('StringUtilクラスのテスト', () => {
  describe('format()', () => {
    const testText = 'test';
    const testVariableText = 'test{0}';
    const testReplaceText = 'です！';

    describe('正常系', () => {
      it('メッセージ文をフォーマットすることをテストする', () => {
        const formattedText = 'testです！';
        expect(StringUtil.format(testVariableText, testReplaceText)).toStrictEqual(formattedText);
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
