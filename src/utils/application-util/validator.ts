import * as ErrorMessages from 'consts/error-messages';
import { ValidateType } from 'unions/input-type';
import StringUtil from 'utils/application-util/string-util';

/**
 * 入力チェック結果インタフェース。
 */
export default interface ValidateError {
  errorMessage: string;
}

export type ValidateProps = {
  value?: unknown;
  type?: ValidateType;
  required?: boolean;
  length?: number;
};

/**
 * 入力値チェッククラス
 */
export default class Validator {
  /**
   * エラーチェック
   *
   * @param {unknown} value チェック値
   * @param {ValidateType} type チェック種類
   * @param {boolean} required 必須チェック(true:必須)
   * @param {number} length 長さ
   * @return {ValidateError | null} エラー: メッセージ | 正常: null
   */
  static validate({ ...props }: ValidateProps): ValidateError | null {
    if (props.required && !props.value) {
      return {
        errorMessage: ErrorMessages.REQUIRED,
      };
    }

    const val = String(props.value);
    if (props.length && val.length > props.length) {
      return {
        errorMessage: StringUtil.format(ErrorMessages.INVALID_LENGTH, props.length),
      };
    }
    return null;
  }
}
