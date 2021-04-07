import { ValidateType, VALIDATE_TYPE } from 'unions/validate-type';
import * as ErrorMessages from 'consts/error-messages';
import StringUtil from 'utils/application-util/string-util';

/**
 * 入力チェック結果インタフェース。
 */
export default interface ValidateError {
  message: string;
}

export type ValidateProps = {
  value?: unknown;
  type?: ValidateType;
  required?: boolean;
  length?: number;
  minRange?: number;
  maxRange?: number;
};

/**
 * 入力値チェッククラス。
 */
export default class Validator {
  /**
   * エラーチェックする。
   *
   * @param {unknown} value チェック値
   * @param {ValidateType} type チェック種類
   * @param {boolean} required 必須チェック(true:必須)
   * @param {number} length 長さ
   * @param {number} minRange 最小範囲
   * @param {number} maxRange 最大範囲
   * @return {ValidateError | null} エラー: メッセージ | 正常: null
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
    if (props.length && stringValue.length > props.length) {
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

      // 範囲検査
      const numberValue = Number(props.value);
      let rangeErrorMsg = '';

      if (!this.isMin(numberValue, props.minRange)) {
        rangeErrorMsg = `${props.minRange}以上`;
      }
      if (!this.isMax(numberValue, props.maxRange)) {
        rangeErrorMsg = `${props.maxRange}以下`;
      }

      if (rangeErrorMsg) {
        return {
          message: StringUtil.format(ErrorMessages.INVALID_RANGE, rangeErrorMsg),
        };
      }
    }
    return null;
  }

  /**
   * 数値検査
   *
   * @param {string} value 値
   * @returns {boolean} true:正、false:誤
   */
  private static isNumber(value: string): boolean {
    return /^[-]?\d*$/.test(value);
  }

  /**
   * 最小数値検査
   *
   * @param {number} value 値
   * @param {number} min 最小値
   * @returns true:正、false:誤
   */
  private static isMin(value: number, min: number | undefined): boolean {
    return (min ?? 0) <= value;
  }

  /**
   * 最大数値検査
   *
   * @param {number} value 値
   * @param {number} max 最大値
   * @returns {boolean} true:正、false:誤
   */
  private static isMax(value: number, max: number | undefined): boolean {
    return (max ?? Infinity) >= value;
  }
}
