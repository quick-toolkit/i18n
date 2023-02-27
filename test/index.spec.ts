import 'reflect-metadata';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import I18n from '../src';

describe('index.spec.ts', () => {
  const i18n = new I18n({
    label: 'English',
    code: 'en_US',
    UI: {
      NEW: 'New',
      SAVE: 'Save',
      SUBMIT: 'Submit',
    },
  });

  i18n.defined({
    label: '中文简体',
    code: 'zh_CN',
    UI: {
      SAVE: '存储',
    },
  });

  i18n.defined({
    label: '中文繁體',
    code: 'zh_HK',
    UI: {
      NEW: '新建',
      SAVE: '存儲',
    },
  });

  it('zh_HK eq i18n.localeData().code.', function () {
    expect(i18n.locale()).eq(i18n.localeData().code);
  });

  it('当繁体中文包含UI.NEW时 使用当前定义的值：此时结果为`新建`', function () {
    i18n.locale('zh_HK');
    expect('新建').eq(i18n.localeData().UI.NEW);
  });

  it('当简体中文不包含UI.NEW时 使用默认语言定义的值：此时结果为`New`', function () {
    i18n.locale('zh_CN');
    expect('New').eq(i18n.localeData().UI.NEW);
  });

  it('当其他语言都不包含时，使用默认语言的值', function () {
    i18n.locale('zh_CN');
    expect('Submit').eq(i18n.localeData().UI.SUBMIT);

    i18n.locale('zh_HK');
    expect('Submit').eq(i18n.localeData().UI.SUBMIT);
  });
});
