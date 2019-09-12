<template>
  <div>
    <el-table v-loading="isLoading" :data="tableData" style="width: 100%">
      <el-table-column prop="title" label="标题" width="280"></el-table-column>
      <el-table-column prop="comment_status" label="评论状态" width="180">
        <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
      </el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="评论粉丝数"></el-table-column>
      <el-table-column label="允许评论">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="turn(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" plain>修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :disabled="isLoading"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "comment",
  data() {
    return {
      tableData: "",
      total: 0,
      page: 1,
      pageSize: 10,
      isLoading: false
    };
  },

  methods: {
    turn(row) {
      // console.log(row);
      this.$axios
        .put(`/mp/v1_0/comments/status?article_id=${row.id}`, {
          allow_comment: row.comment_status
        })
        .then(res => {
          console.log(res);
        });
    },

    //页容量改变事件
    handleSizeChange(size) {
      // alert(size);
      this.pageSize = size;
      this.loadData();
    },

    //页码改变事件
    handleCurrentChange(page) {
      this.page = page;
      this.loadData();
    },

    loadData() {
      //请求之前isLoading=true
      this.isLoading = true;

      this.$axios
        .get("/mp/v1_0/articles", {
          params: {
            page: this.page,
            per_page: this.pageSize,
            response_type: "comment"
          }
        })
        .then(res => {
          // console.log(res);
          this.tableData = res.data.data.results;
          this.total = res.data.data.total_count;

          //请求回来isLoading=false
          this.isLoading = false;
        });
    }
  },

  created() {
    this.loadData();
  }
};
</script>

<style>
</style>