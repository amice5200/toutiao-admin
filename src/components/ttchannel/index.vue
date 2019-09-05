<template>
  <el-select placeholder="请选择频道" v-model="select_id">
    <el-option label="所有频道" value></el-option>
    <el-option v-for="item in selectList" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name:"ttchannel",
  data() {
    return {
      selectList:[],
      select_id:""
    }
  },
  created() {
    this.$axios.get("/mp/v1_0/channels").then(res => {
      // console.log(res);
      this.selectList = res.data.data.channels;
    });
  }
};
</script>

<style>
</style>