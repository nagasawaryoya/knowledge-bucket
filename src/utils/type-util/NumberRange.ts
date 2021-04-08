/**
 * 数値範囲を表す型
 */
export type NumberRange = {
  /**
   * 範囲の最小値
   */
  start: number;
  /**
   * 範囲の最大値
   */
  end: number;
};

/**
 * NumberRange型か判定する
 */
export const isNumberRangeType = (value: any): value is NumberRange =>
  typeof value === 'object' && 'start' in value && 'end' in value;
