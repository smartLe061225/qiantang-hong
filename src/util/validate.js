import Vue from 'vue'

// 1. 表单验证依赖文件，并且引入的是支持中文错误提示的文件。
import VeeValidate, {Validator} from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN';
Validator.addLocale(zh_CN);

// 2. 中文错误提示的配置
const validateConfig = {
    locale: 'zh_CN'
};
Vue.use(VeeValidate, validateConfig);

// 3. 自定义表单验证的提示语 
const dictionary = {
   zh_CN: {
      messages: {  // message: 提示语
        required: ( field )=> field + "不能为空"
      },
      attributes:{  // attributes: filed
         account: '帐号',
        password: '密码',
           phone: '手机号'
      }
  }
};
Validator.updateDictionary(dictionary);

// 4. 扩展自定义的验证
Validator.extend('phone', {
  messages: {
    zh_CN: field => field + '输入有误',
  },
  validate: value => {
    return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
});

Validator.extend('string', {
  messages: {
    zh_CN: field => '请输入5~15位数字、字母或符号',
  },
  validate: value => {
    return /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{5,15}$/.test(value)
  }
});
