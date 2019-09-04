<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <p class="title">全部图文</p>
      <el-divider></el-divider>
      <el-form ref="form" :model="searchForm">
        <el-form-item label="文章状态:">
          <el-radio-group v-model="searchForm.status">
            <el-radio label>全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道列表:">
          <el-select placeholder="请选择活动区域" v-model="searchForm.select_id">
            <el-option label="所有频道" value></el-option>
            <el-option
              v-for="item in selectList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="时间选择:">
          <el-date-picker
            v-model="searchForm.date"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="doSearch">筛选</el-button>
        </el-form-item>
      </el-form>
    </div>
    <p>
      共找到
      <b>{{total}}</b> 条符合条件的内容
    </p>
    <br />
    <el-table v-loading="loading" :data="tableData" stripe style="width: 100%">
      <el-table-column prop="cover.images[0]" label="封面" width="150">
        <template slot-scope="scope">
          <img width="60" :src="scope.row.cover.images[0]" alt />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="status" label="状态" width="120">
        <template slot-scope="scope">
          <el-tag>{{scope.row.status | formateStatus}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="pubdate" label="发布时间" width="200"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" plain type="primary">编辑</el-button>
          <el-button size="small" plain type="danger" @click="doDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-size="10"
      layout="total, prev, pager, next"
      :total="total"
      :disabled="loading"
    ></el-pagination>
  </el-card>
</template>

<script>
export default {
  name: "articless",
  data() {
    return {
      //选项列表
      selectList: [],
      loading: false,
      total: 0,
      searchForm: {
        status: "",
        select_id: "",
        date: ""
      },

      tableData: []
    };
  },

  methods: {
    //筛选点击事件
    doSearch() {
      this.loadTableData(1);
    },

    //删除
    doDel(row) {
      this.$confirm("是否确认要删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.delete(`/mp/v1_0/articles/${row.id}`).then(res => {
            // console.log(res);
            this.$message({
              type: "success",
              message: "删除成功!"
            });

            this.loadTableData(1);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 封装的获取表格数据的方法
    loadTableData(page) {
      const status =
        this.searchForm.status === "" ? undefined : this.searchForm.status;
      const channel_id =
        this.searchForm.select_id === ""
          ? undefined
          : this.searchForm.select_id;
      // let obj = JSON.parse(window.sessionStorage.getItem("user-Info"));
      // console.log(obj);
      this.loading = true;

      this.$axios
        .get("/mp/v1_0/articles", {
          /* headers: {
            Authorization: `Bearer ${obj.token}`
          }, */
          params: {
            status,
            channel_id,
            begin_pubdate: this.searchForm.date[0],
            end_pubdate: this.searchForm.date[1],
            page: page
          }
        })
        .then(res => {
          // console.log(res);
          // 给表格数据源赋值
          this.tableData = res.data.data.results;
          this.total = res.data.data.total_count;

          this.loading = false;
        });
    },

    handleCurrentChange(page) {
      this.loadTableData(page);
    }
  },

  created() {
    this.loadTableData(1);

    this.$axios.get("/mp/v1_0/channels").then(res => {
      console.log(res);
      this.selectList = res.data.data.channels;
    });
  },

  filters: {
    formateStatus(val) {
      switch (val) {
        case 0:
          return "草稿";
        case 1:
          return "待审核";
        case 2:
          return "审核通过";
        case 3:
          return "审核失败";
        case 4:
          return "已删除";
      }
    }
  }
};
</script>

<style lang="less">
</style>