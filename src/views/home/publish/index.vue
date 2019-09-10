<template>
  <div>
    <el-form
      v-loading="isLoading"
      ref="editorForm"
      :rules="rules"
      :model="editorForm"
      label-width="55px"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="editorForm.title" placeholder="文章名称"></el-input>
      </el-form-item>

      <el-form-item label="内容">
        <quill-editor v-model="editorForm.content" :options="editorOption"></quill-editor>
      </el-form-item>

      <el-form-item label="封面"></el-form-item>

      <el-form-item label="频道">
        <!-- <ttchannel :select_id="editorForm.select_id" @change="editorForm.select_id = $event"></ttchannel> -->
        <ttchannel v-model="editorForm.channel_id"></ttchannel>
      </el-form-item>

      <el-form-item>
        <el-button size="small">保存草稿</el-button>
        <el-button size="small" type="primary" @click="doPublish('editorForm')">发布...</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import ttchannel from "../../../components/ttchannel";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  name: "publish",
  components: {
    quillEditor,
    ttchannel
  },
  data() {
    name: "publish";
    return {
      isLoading: true,

      editorForm: {
        title: "",
        content: "",
        channel_id: ""
      },

      //保存初始的数据
      oldForm: {},

      //表单验证规则
      rules: {
        title: [
          { required: true, message: "标题不能为空", trigger: "blur" },
          {
            min: 5,
            max: 30,
            message: "标题长度必须在5到30个字以内",
            trigger: "blur"
          }
        ]
      },

      //富文本配置
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],

            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }], // text direction

            [{ size: ["small", false, "large", "huge"] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],
            ["image"],
            ["clean"] // remove formatting button
          ]
        }
      }
    };
  },

  methods: {
    doPublish(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.$route.name == "publish-edit") {
            //做修改操作
            this.$axios
              .put(`/mp/v1_0/articles/${this.$route.params.id}`, {
                title: this.editorForm.title,
                content: this.editorForm.content,
                cover: {
                  type: 1,
                  images: [
                    "http://toutiao.meiduo.site/Fjl26KTE9-NFfkRzIZOner4yeqGl"
                  ]
                },
                channel_id: this.editorForm.channel_id
              })
              .then(res => {
                console.log(res);
                if (res.data.message.toLowerCase() == "ok") {
                  this.$message.success("修改成功~~!");

                  this.$router.push("/article");
                }
              });
          } else {
            //发请求新增
            this.$axios
              .post("/mp/v1_0/articles", {
                title: this.editorForm.title,
                content: this.editorForm.content,
                cover: {
                  type: 1,
                  images: [
                    "http://toutiao.meiduo.site/Fjl26KTE9-NFfkRzIZOner4yeqGl"
                  ]
                },
                channel_id: this.editorForm.channel_id
              })
              .then(res => {
                // console.log(res);
                if (res.data.message.toLowerCase() == "ok") {
                  this.$message.success("发布成功!");
                  this.$router.push("/article");
                }
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    loadAxios() {
      this.$axios
        .get(`/mp/v1_0/articles/${this.$route.params.id}`)
        .then(res => {
          // console.log(res);
          this.editorForm = res.data.data;

          // 如果直接赋值，他们访问的都是同一个地址，同一个对象
          // 一方改变，另一方也跟着变，那么他们就永远相等
          // this.oldForm = this.form;
          this.oldForm = { ...this.editorForm };

          this.isLoading = false;
        });
    }
  },

  created() {
    //获取传递过来的id
    // console.log(this.$route.params.id);
    if (this.$route.name == "publish-edit") {
      this.loadAxios();
    } else {
      //新增不用加载中
      this.isLoading = false;
    }
  },

  watch: {
    "$route.params.id"(val) {
      // console.log("变化了:" + val);

      if (val) {
        //有值，代表这是修改，只是把id变了，根据新的id去发请求获取数据渲染界面
        this.loadAxios();
      } else {
        //如果value没值，代表是新增，新增就要把界面清空
        this.editorForm.title = "";
        this.editorForm.content = "";
      }
    }
  },

  beforeRouteLeave(to, from, next) {
    if (this.$route.name == "publish-edit") {
      //判断原来的内容和现在表单的内容是否一样(判断是否有修改)
      if (
        this.editorForm.title == this.oldForm.title &&
        this.editorForm.content == this.oldForm.content
      ) {
        return next();
      }
    } else {
      //新增判断是否为空
      if (this.editorForm.title == "" && this.editorForm.content == "") {
        return next();
      }
    }

    this.$confirm("你有未保存的内容, 是否离开?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        //确定离开
        next();
      })
      .catch(() => {
        //取消
      });
  }
};
</script>

<style lang="less">
/* 要改变富文本内容的高度，那么要给它自己生成的这个div加高度，否则布局有问题 */
.ql-editor {
  height: 300px;
}
</style>