/**
 * 文字列ユーティリティークラス。
 */
export default class StringUtil {
  /**
   * メッセージ文をフォーマットする。
   * 'あああ{0}いいいい{1}うううう'などの可変指定メッセージのフォーマットを行う。
   *
   * @param メッセージ文
   * @param params 可変値パラメータ
   * @returns フォーマット後の文字列
   */
  public static format(msg: string, ...params: any[]) {
    for (let i = 0; i < params.length; i++) {
      msg = msg.replace(new RegExp(`\\{${i}\\}`, 'g'), params[i]);
    }
    return msg;
  }
}
