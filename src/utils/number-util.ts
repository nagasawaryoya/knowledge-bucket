/**
 * 数値ユーティリティークラス。
 */
export default class NumberUtil {
  /**
   * 引数で与えられる数値を加算した合計数値を返却する。
   *
   * @param numbers 任意数値
   * @returns 合計数値
   */
  public static sum(...numbers: number[]): number {
    return numbers.reduce((accumulator: number, currentValue: number) => accumulator + currentValue);
  }

  /**
   * 引数で与えられる数値を減算した合計数値を返却する。
   *
   * @param numbers 任意数値
   * @returns 合計数値
   */
  public static diff(...numbers: number[]): number {
    return numbers.reduce((accumulator: number, currentValue: number) => accumulator - currentValue);
  }
}
