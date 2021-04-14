import Validator from '../validator';
import ValidateError from '../validator';
import StringUtil from '../string-util';
import { VALIDATE_TYPE } from '../../../unions/validate-type';
import * as ErrorMessages from '../../../consts/error-messages';

const generateMessage = (message: string): ValidateError => ({ message: message });
const generateFormatMessage = (message: string, ...params: any[]): ValidateError => ({
  message: StringUtil.format(message, ...params),
});

describe('Validatorクラスのテスト', () => {
  describe('必須検査', () => {
    const validate = (testText: string) => Validator.validate({ value: testText, required: true });

    it('正常系', () => {
      const testText = 'test';
      expect(validate(testText)).toBeNull();
    });

    it('異常系', () => {
      const testText = '';
      expect(validate(testText)).toStrictEqual(generateMessage(ErrorMessages.REQUIRED));
    });
  });

  describe('長さ検査', () => {
    const propsLength = 4;
    const validate = (testText: string) => Validator.validate({ value: testText, length: propsLength });

    it('正常系', () => {
      const testText = 'test';
      expect(validate(testText)).toBeNull();
    });

    it('異常系', () => {
      const testText = 'test-test';
      expect(validate(testText)).toStrictEqual(generateFormatMessage(ErrorMessages.INVALID_LENGTH, propsLength));
    });
  });

  describe('数値検査', () => {
    const validate = (testText: string) => Validator.validate({ value: testText, type: VALIDATE_TYPE.NUMBER });

    it('正常系', () => {
      const testText = '100';
      expect(validate(testText)).toBeNull();
    });

    it('異常系', () => {
      const testText = 'test';
      expect(validate(testText)).toStrictEqual(generateMessage(ErrorMessages.INVALID_NUMBER));
    });
  });

  describe('最小値検査', () => {
    const propsMin = 5;
    const validate = (testText: string) =>
      Validator.validate({ value: testText, type: VALIDATE_TYPE.NUMBER, min: propsMin });

    it('正常系', () => {
      const testText = '5';
      expect(validate(testText)).toBeNull();
    });

    it('異常系', () => {
      const testText = '4';
      expect(validate(testText)).toStrictEqual(generateFormatMessage(ErrorMessages.INVALID_MIN, propsMin));
    });
  });

  describe('最大値検査', () => {
    const propsMax = 5;
    const validate = (testText: string) =>
      Validator.validate({ value: testText, type: VALIDATE_TYPE.NUMBER, max: propsMax });

    it('正常系', () => {
      const testText = '5';
      expect(validate(testText)).toBeNull();
    });

    it('異常系', () => {
      const testText = '6';
      expect(validate(testText)).toStrictEqual(generateFormatMessage(ErrorMessages.INVALID_MAX, propsMax));
    });
  });

  describe('数値範囲検査', () => {
    const propsRange = { start: 5, end: 10 };
    const validate = (testText: string) =>
      Validator.validate({ value: testText, type: VALIDATE_TYPE.NUMBER, range: propsRange });

    it('正常系', () => {
      let testText = '5';
      expect(validate(testText)).toBeNull();

      testText = '10';
      expect(validate(testText)).toBeNull();
    });

    it('異常系', () => {
      let testText = '0';
      expect(validate(testText)).toStrictEqual(
        generateFormatMessage(ErrorMessages.INVALID_RANGE, propsRange.start, propsRange.end),
      );

      testText = '11';
      expect(validate(testText)).toStrictEqual(
        generateFormatMessage(ErrorMessages.INVALID_RANGE, propsRange.start, propsRange.end),
      );
    });
  });
});
