<template>
  <div>
    <el-form ref="editorForm" :rules="rules" :model="editorForm" label-width="55px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="editorForm.title" placeholder="文章名称"></el-input>
      </el-form-item>

      <el-form-item label="内容">
        <quill-editor v-model="editorForm.content" :options="editorOption"></quill-editor>
      </el-form-item>

      <el-form-item label="封面"></el-form-item>

      <el-form-item label="频道">
        <ttchannel></ttchannel>
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
      editorForm: {
        title: "",
        content: ""
      },

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
              channel_id: 2
            })
            .then(res => {
              // console.log(res);
              if (res.data.message.toLowerCase() == "ok") {
                this.$message.success("发布成功!");
                this.$router.push("/article");
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less">
/* 要改变富文本内容的高度，那么要给它自己生成的这个div加高度，否则布局有问题 */
.ql-editor {
  height: 300px;
}
</style>