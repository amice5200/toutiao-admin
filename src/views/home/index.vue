<template>
  <el-container class="my-container">
    <!-- 左边侧栏 -->
    <el-aside width="200px" class="my-aside">Aside</el-aside>
    <!-- 右边内容区 -->
    <el-main class="my-main">
      <el-container>
        <!-- 右边的头部 -->
        <el-header class="main-header">Header</el-header>
        <!-- 右边内容区 -->
        <el-main>Main</el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
export default {};
</script>

<style lang="less">
.my-container {
  height: 100%;

  .my-aside {
    background-color: #323745;
  }

  .my-main {
    padding: 0;

    .main-header {
      background-color: hotpink;
    }
  }
}
</style>
