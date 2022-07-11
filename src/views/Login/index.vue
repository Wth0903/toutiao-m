<template>
  <div>
    <van-nav-bar title="登录">
      <template #left>
        <van-icon name="cross" color="#eee" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="rules.mobile"
        required
        type="number"
      >
        <template #left-icon>
          <Toutiaoicon icon="shouji"></Toutiaoicon>
        </template>
      </van-field>
      <!-- type 指定输入框的类型 -->
      <!-- required 指定输入框是否为必填项 带*号 -->
      <!-- maxlength 指定输入的最大位数 -->
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="rules.code"
        required
        type="number"
        maxlength="6"
      >
        <template #left-icon>
          <Toutiaoicon icon="yanzhengma"></Toutiaoicon>
        </template>

        <template #button>
          <!-- 倒计时组件业务逻辑 -->
          <!-- 页面初始化的时候显示的是按钮，点击按钮之后（表单校验通过），再显示倒计时，倒计时结束之后再通过组件自带的finish事件显示验证码按钮 -->
          <van-count-down
            @finish="isShowDown = false"
            v-if="isShowDown"
            :time="5000"
            format="ss s"
          />
          <van-button
            :loading="isDisabled"
            v-else
            native-type="button"
            class="send-sms-btn"
            size="mini"
            type="primary"
            @click="sendSmsCode"
            >发送验证码</van-button
          >
        </template>
      </van-field>

      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import Toutiaoicon from "../../components/Toutiaoicon.vue";
import { login, getSmsCode } from "@/api/user.js";
import { Toast } from "vant";
export default {
  components: { Toutiaoicon },
  data() {
    return {
      user: {
        mobile: 13911111119,
        code: 246810,
      },
      rules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "请输入6位数验证码",
          },
        ],
      },
      isShowDown: false,
      isDisabled: false,
    };
  },
  methods: {
    async onSubmit() {
      //表单校验
      //   {
      //     mobile:'111'
      //     code:'222'
      //   }
      //   await 后面拿到的是promise 只有promise成功了后面才会继续执行
      //利用try catch捕获失败结果
      try {
        const res = await login(this.user);
        // console.log(res);
        this.$store.commit("setUser", res.data.data); //在登录成功后获取token值并传给vuex进行存储
        // 成功提示 也可以写为this.$toast(message:'登陆成功'),这样写不需要再引入Toast
        Toast.success("登陆成功");
        this.$router.push("/"); //登陆成功后跳转到首页
      } catch (e) {
        // console.log(e.response.data.message);
        // 失败提示
        Toast.fail(e?.response?.data?.message || "服务器端错误");
      }
    },
    // 通过传入name值来决定验证哪个表单validate("表单的name值")
    // validate返回的是一个pormis 手机号验证失败则不继续执行
    async sendSmsCode() {
      //表单校验错误会报错，但是没必要让报错提示，用一个try单独拿出报错并return出去不执行报错，校验的错误捕获到就可以了
      try {
        await this.$refs.form.validate("mobile");
      } catch (e) {
        console.log(e);
        return;
      }
      try {
        this.isDisabled = true; //发送请求前按钮禁用
        //调用获取验证码接口
        await getSmsCode(this.user.mobile);
        this.isShowDown = true;
        // 弹出获取成功提示
        this.$toast.success("验证码发送成功");
      } catch (e) {
        // 弹出获取失败提示
        this.$toast.fail(e?.response?.data?.message || "出错了");
        // 获取失败将不显示倒计时，设置为false
        this.isShowDown = false;
      } finally {
        this.isDisabled = false; //发送请求成功解除按钮禁用
      }
    },
  },
};
</script>

<style scoped lang="less">
.send-sms-btn {
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
  color: #666;
}
.van-form {
  .toutiao {
    font-size: 37px;
  }
}
</style>
