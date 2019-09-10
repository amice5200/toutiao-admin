<template>
  <el-container class="my-container">
    <!-- 左边侧栏 -->
    <el-aside width="200px" class="my-aside">
      <el-container>
        <el-header class="my-aside-header">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ8AAAAoCAYAAADg1CgtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTg3RjBBMDcxOEEyMTFFOThEODI4NjFFNkZBMUY2ODEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTg3RjBBMDgxOEEyMTFFOThEODI4NjFFNkZBMUY2ODEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1ODdGMEEwNTE4QTIxMUU5OEQ4Mjg2MUU2RkExRjY4MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1ODdGMEEwNjE4QTIxMUU5OEQ4Mjg2MUU2RkExRjY4MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuQY0pYAAAriSURBVHja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"
            alt
          />
        </el-header>
        <el-main class="my-aside-main">
          <el-menu
            :router="true"
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="#353b4e"
            text-color="#fff"
            active-text-color="#ffd04b"
            :unique-opened="true"
          >
            <el-menu-item index="1">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>内容管理</span>
              </template>
              <el-menu-item index="/publish">发布文章</el-menu-item>
              <el-menu-item index="/article">内容列表</el-menu-item>
              <el-menu-item index="/comment">评论列表</el-menu-item>
              <el-menu-item index="2-4">素材管理</el-menu-item>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-star-on"></i>
                <span>粉丝管理</span>
              </template>
              <el-menu-item index="3-1">图文数据</el-menu-item>
              <el-menu-item index="3-2">粉丝概况</el-menu-item>
              <el-menu-item index="3-3">粉丝图像</el-menu-item>
              <el-menu-item index="3-4">粉丝列表</el-menu-item>
            </el-submenu>

            <el-menu-item index="4">
              <i class="el-icon-user-solid"></i>
              <span slot="title">账户信息</span>
            </el-menu-item>
          </el-menu>
        </el-main>
      </el-container>
    </el-aside>
    <!-- 右边内容区 -->
    <el-main class="my-main">
      <el-container>
        <!-- 右边的头部 -->
        <el-header class="main-header">
          <el-row class="my-row">
            <el-col :span="16">
              <span class="mainName">江苏传智播客教育科技股份有限公司</span>
            </el-col>

            <el-col :span="4" :offset="4">
              <el-dropdown class="my-dropdown" trigger="click" @command="logout">
                <span class="el-dropdown-link">
                  <img height="40px" :src="userInfo.photo" alt />
                  <span class="username">{{userInfo.name}}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="info">个人信息</el-dropdown-item>
                  <el-dropdown-item command="git">git地址</el-dropdown-item>
                  <el-dropdown-item divided command="out">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-header>
        <!-- 右边内容区 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        name: "",
        photo: ""
      }
    };
  },
  methods: {
    logout(ot) {
      if (ot == "out") {
        //删除sessionStorage里的值
        window.sessionStorage.removeItem("user-Info");
        //打回登录页
        this.$router.push("/login");
      } else if (ot == "git") {
        window.open("http://www.github.com");
      }
    }
  },
  // 但是它无法访问到data中的数据
  /* beforeCreate() {
    let info = window.sessionStorage.getItem("user-Info");
    // let obj = JSON.parse(info);
    // console.log(obj);
    if(!info){
      this.$message.error('请先登录!');
      //退回到登录页
      this.$router.push('/login');
    }
  }, */

  // 它可以访问到data中的数据
  created() {
    let res = window.sessionStorage.getItem("user-Info");
    //转成对象
    let obj = JSON.parse(res);
    this.userInfo.name = obj.name;
    this.userInfo.photo = obj.photo;
  }
};
</script>

<style lang="less" scoped>
.my-container {
  height: 100%;

  .my-aside {
    background-color: #323745;

    .my-aside-header {
      background-color: #000;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 120px;
      }
    }

    .my-aside-main {
      padding: 0;
      // overflow: visible;

      .el-menu-vertical-demo {
        border: 0;
        overflow: hidden;
      }
    }
  }

  .my-main {
    padding: 0;

    .main-header {
      background-color: pink;

      .my-row {
        height: 100%;
        display: flex;
        align-items: center;

        .mainName {
          font-size: 18px;
        }

        .my-dropdown {
          .el-dropdown-link {
            display: flex;
            align-items: center;

            img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
            }

            .username {
              margin: 0 10px;
            }
          }
        }
      }
    }
  }
}
</style>
