<template>
  <el-select placeholder="请选择频道" :value="select_id" @change="toFather($event)">
    <!-- <el-select placeholder="请选择频道" v-model="select_id" @change="$emit('change',select_id)"> -->
    <el-option label="所有频道" value></el-option>
    <el-option v-for="item in selectList" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: "ttchannel",
  props: ["select_id"],
  data() {
    return {
      selectList: []
    };
  },
  model: {
    prop: "select_id",
    event: "change"
  },
  created() {
    this.$axios.get("/mp/v1_0/channels").then(res => {
      // console.log(res);
      this.selectList = res.data.data.channels;
    });
  },
  methods: {
    toFather(e) {
      // console.log(e);
      this.$emit("change", e);
    }
  }
};
</script>

<style>
</style>