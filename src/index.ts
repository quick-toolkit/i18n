/**
 * MIT License
 * Copyright (c) 2021 RanYunLong<549510622@qq.com> @quick-toolkit/i18n
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import merge from 'lodash.merge'
import { Exception } from './exception';

export type DepPartial<T> = {
  [P in keyof T]?: DepPartial<T[P]>;
};

export class I18n<T extends object> {
  private _locales = new Map<string, DepPartial<T>>();

  private current: string;

  private default: string;

  /**
   * 构造函数
   * @param defaultLocale 默认语言配置
   */
  public constructor(public defaultLocale: BaseLocale & T) {
    if (!defaultLocale.code) {
        throw new Exception('locale code cannot be empty!');
    }
    this.default = defaultLocale.code;
    this.current = defaultLocale.code;
    this.defined(defaultLocale);
  }

  /**
   * 定义语言
   * @param locale
   */
  public defined(locale: BaseLocale & DepPartial<T>) {
    return this._locales.set(locale.code, locale);
  }

  /**
   * 获取当前语言
   */
  public locale(): string;
  /**
   * 设置当前语言
   * @param code
   */
  public locale(code: string): void;
  public locale(code?: string): string | void{
    if (code) {
      if (!this._locales.has(code)) {
        throw new Exception(`Not defined locale ${code}!`)
      }
      this.current = code;
    }

    return this.current;
  }

  /**
   * 获取当前语言配置
   */
  public localeData(): BaseLocale & T {
    const currentData = this._locales.get(this.current) || {};
    return merge({}, this.defaultLocale, currentData);
  }

  /**
   * 已定义语言列表
   */
  public locales() {
    return Array.from(this._locales.keys());
  }
}

export interface BaseLocale {
  /**
   * 语言名称
   */
  code: string;

  /**
   * 语言名称
   */
  label: string;
}

export { Exception }

export default I18n;