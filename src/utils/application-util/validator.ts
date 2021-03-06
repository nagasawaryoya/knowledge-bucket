import { ValidateType, VALIDATE_TYPE } from 'unions/validate-type';
import * as ErrorMessages from 'consts/error-messages';
import StringUtil from 'utils/application-util/string-util';
import { NumberRange } from 'utils/type-util/NumberRange';

/**
 * 入力チェック結果インタフェース。
 */
export default interface ValidateError {
  message: string;
}

/**
 * 検証値と検証項目の型。
 */
export type ValidateProps = {
  value: unknown;
  type?: ValidateType;
  required?: boolean;
  length?: number;
  min?: number;
  max?: number;
  range?: NumberRange;
};

/**
 * 入力値チェッククラス。
 */
export default class Validator {
  /**
   * エラーチェックする。
   *
   * @param value チェック値
   * @param type チェック種類
   * @param required 必須チェック(true:必須)
   * @param length 長さ
   * @param min 最小数値
   * @param max 最大数値
   * @param range 数値範囲
   * @return エラー: メッセージ | 正常: null
   */
  public static validate(props: ValidateProps): ValidateError | null {
    // 必須検査
    if (props.required && !props.value) {
      return {
        message: ErrorMessages.REQUIRED,
      };
    }

    // 長さ検査
    const stringValue = String(props.value);
    if (props.length && this.isLength(stringValue.length, props.length)) {
      return {
        message: StringUtil.format(ErrorMessages.INVALID_LENGTH, props.length),
      };
    }

    if (props.type === VALIDATE_TYPE.NUMBER) {
      // 数値検査
      if (!this.isNumber(stringValue)) {
        return {
          message: ErrorMessages.INVALID_NUMBER,
        };
      }

      const numberValue = Number(props.value);

      // 最小値検査
      if (props.min && !this.isMin(numberValue, props.min)) {
        return {
          message: StringUtil.format(ErrorMessages.INVALID_MIN, props.min),
        };
      }

      // 最大値検査
      if (props.max && !this.isMax(numberValue, props.max)) {
        return {
          message: StringUtil.format(ErrorMessages.INVALID_MAX, props.max),
        };
      }

      // 数値範囲検査
      if (props.range && !this.isRange(numberValue, props.range)) {
        return {
          message: StringUtil.format(ErrorMessages.INVALID_RANGE, props.range.start, props.range.end),
        };
      }
    }
    return null;
  }

  /**
   * 長さ検査
   *
   * @param valueLength 検証値の長さ
   * @param length 基準の長さ
   * @returns true:正、false:誤
   */
  private static isLength(valueLength: number, length: number): boolean {
    return valueLength > length;
  }

  /**
   * 数値検査
   *
   * @param value 値
   * @returns true:正、false:誤
   */
  private static isNumber(value: string): boolean {
    return /^[-]?\d*$/.test(value);
  }

  /**
   * 最小数値検査
   *
   * @param value 値
   * @param min 最小値
   * @returns true:正、false:誤
   */
  private static isMin(value: number, min: number): boolean {
    return min <= value;
  }

  /**
   * 最大数値検査
   *
   * @param value 値
   * @param max 最大値
   * @returns true:正、false:誤
   */
  private static isMax(value: number, max: number): boolean {
    return max >= value;
  }

  /**
   * 数値範囲検査
   *
   * @param value 値
   * @param range 数値範囲
   * @returns true:正、false:誤
   */
  private static isRange(value: number, range: NumberRange): boolean {
    return range.start <= value && range.end >= value;
  }
}
