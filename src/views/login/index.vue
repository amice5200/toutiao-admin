<template>
  <div class="login-wrap">
    <!-- 登录表单盒子 -->
    <div class="form-box">
      <!-- logo -->
      <div class="logo">
        <img src="./img/login_logo.png" alt />
      </div>

      <!-- 表单 -->
      <div class="form">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
          <el-form-item prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>

          <el-form-item prop="code">
            <el-row>
              <el-col :span="12">
                <el-input v-model="ruleForm.code" placeholder="请输入验证码"></el-input>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-button
                  class="getCode"
                  :disabled="sec != 60"
                  @click="getCode"
                >{{sec==60?'获取验证码':'还有'+sec+'秒'}}</el-button>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item prop="agree">
            <el-checkbox v-model="ruleForm.agree"></el-checkbox>
            <span>
              我已阅读并同意
              <a href="javascript:void(0)">用户协议</a> 和
              <a href="javascript:void(0)">隐私条款</a>
            </span>
          </el-form-item>

          <el-form-item>
            <el-button
              class="btn-login"
              type="primary"
              round
              @click="doLogin('ruleForm')"
              :loading="isLoading"
            >登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        phone: "18801185985",
        code: "",
        agree: "false"
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { len: 11, message: "请输入11位手机号", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 6, max: 6, message: "请输入6位验证码", trigger: "blur" }
        ],
        //required 是代表值不能为空
        // pattern 规则属性指示一个正则表达式的值必须匹配，才能通过验证。
        // 因为checkbox都有值，要么是true要么是false，所以你验证规则写非空就不能使用
        agree: [{ pattern: /true/, message: "请勾选同意", trigger: "change" }]
      },
      // 获取验证码的倒计时，默认为60
      sec: 60,
      // 控制登录按钮的加载动画，默认为false代表默认不要有加载动画
      isLoading: false
    };
  },

  methods: {
    getCode() {
      // 判断手机号是否为空，为空提示请输入
      if (this.ruleForm.phone.length != 11) {
        this.$message.error("请输入正确手机号哟~O(∩_∩)O嘻嘻~");
        return;
      }

      //在点击事件一开始先-1（不然点完后要等1秒）
      this.sec--;

      let timeID = setInterval(() => {
        this.sec--;

        //等2秒后放验证码
        if (this.sec == 57) {
          this.ruleForm.code = "246810";
        }

        //判断倒计时为0
        if (this.sec == 0) {
          clearInterval(timeID);
          this.sec = 60;
        }
      }, 1000);
    },

    doLogin(formName) {
      // 找到这个表单并调用validate方法（此方法是验证这个表单内所有元素是否全部通过规则）
      //相当于this.$refs('ruleForm')
      this.$refs[formName].validate(valid => {
        if (valid) {
          //能来到这里就代表规则全部通过，此时发请求才比较合理

          this.isLoading = true;

          this.$axios
            .post("http://ttapi.research.itcast.cn/mp/v1_0/authorizations", {
              mobile: this.ruleForm.phone,
              code: this.ruleForm.code
            })
            .then(res => {
              console.log(res);

              let jsonRes = JSON.stringify(res.data.data);
              window.sessionStorage.setItem("user-Info", jsonRes);

              if (res.data.message == "OK") {
                this.$message({
                  message: "登录成功!",
                  type: "success"
                });

                /* res = JSON.stringify(res);
                window.sessionStorage.setItem("info", res); */

                this.$router.push("/home");
              } else {
                //如果错误提示错误信息并不跳转
                this.$message({
                  message: "账号或密码错误!",
                  type: "error"
                });
              }
            })
            .catch(() => {
              this.isLoading = false;

              this.$message({
                message: "账号或密码错误!",
                type: "error"
              });
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-wrap {
  height: 100%;
  background: url("./img/login_bg.jpg") no-repeat center / cover;
  display: flex;
  //主轴居中
  justify-content: center;
  //侧轴居中
  align-items: center;

  .form-box {
    width: 300px;
    background-color: #fff;
    padding: 30px;

    .logo {
      text-align: center;
      margin-bottom: 30px;

      img {
        width: 130px;
      }
    }

    .getCode {
      width: 98px;
    }

    .btn-login {
      width: 100%;
    }
  }
}
</style>