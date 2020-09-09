<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="0px"
    class="gt-header-comment"
  >
    <el-row class="gt-author-info" :gutter="20">
      <el-col :span="12">
        <el-form-item prop="co_username">
          <el-input type="text" placeholder="昵称" v-model="ruleForm.co_username" maxlength="10"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="co_email">
          <el-input type="text" placeholder="电子邮箱" v-model="ruleForm.co_email" maxlength="30"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item prop="comContent">
      <el-input
        type="textarea"
        class="gt-header-textarea"
        placeholder="说点什么"
        v-model="ruleForm.comContent"
        :rows="4"
        ref="shareTextArea"
        maxlength="500"
        @keyup.ctrl.enter.native="submitForm('ruleForm')"
      ></el-input>
    </el-form-item>
    <div class="gt-header-preview markdown-body hide"></div>
    <div class="gt-header-controls">
      <emojiPicker class="gt-ico-text" @onFaceChoose="handleFaceChoose"></emojiPicker>
      <!--        <el-button class="gt-btn gt-btn-preview"><span class="gt-btn-text">预览</span></el-button>-->
      <el-button class="gt-btn gt-btn-login" @click="submitForm('ruleForm')">
        <span class="gt-btn-text">提交</span>
      </el-button>
      <span class="submit-tip">Ctrl + Enter</span>
    </div>
  </el-form>
</template>

<script>
import emojiPicker from "./emoji-picker";
export default {
  name: "commentForm",
  props: ["ruleForm","type"],
  components: {
    emojiPicker
  },
  data() {
    return {
      gravatar: "http://2.gravatar.com/avatar/",
      rules: {
        co_username: [
          { required: true, message: "请输入昵称", trigger: "blur" }
        ],
        co_email: [
          { required: true, message: "请输入电子邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        comContent: [{ required: true, message: "请输入评论", trigger: "blur" }]
      },
      search: "",
      comments: []
    };
  },
  computed: {
    emojiDataAll() {
      return EmojiAllData;
    },
    emojiGroups() {
      return EmojiGroups;
    }
  },
  head() {
    return {};
  },
  mounted() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.addreply) {
            this.addReply();
          } else {
            this.addComment();
          }
          this.ruleForm.comContent = "";
          this.childgetcomment();
        } else {
          return false;
        }
      });
    },
    addComment: function() {
      var condition;
      if (this.type === "article_id") {
        condition = {
          content: this.ruleForm.comContent,
          article_id: this.$route.params.id,
          co_username: this.ruleForm.co_username,
          co_email: this.ruleForm.co_email,
          message: this.$message
        };
      }
      if (this.type === "activity") {
        condition = {
          content: this.ruleForm.comContent,
          activity: this.$route.params.id,
          co_username: this.ruleForm.co_username,
          co_email: this.ruleForm.co_email,
          message: this.$message
        };
      }
      this.$store.dispatch("AddComment", condition);
    },
    addReply: function() {
      this.$store.dispatch("AddReply", {
        content: this.ruleForm.comContent,
        comment_id: this.ruleForm.comment_id,
        rc_username: this.ruleForm.co_username,
        rc_email: this.ruleForm.co_email,
        message: this.$message
      });
    },
    childgetcomment() {
      this.$emit("fatherMethod");
    },
    handleFaceChoose(face) {
      const value = this.ruleForm.comContent;
      const el = this.$refs.shareTextArea.$refs.textarea;
      const startPos = el.selectionStart;
      const endPos = el.selectionEnd;
      const newValue =
        value.substring(0, startPos) +
        face +
        value.substring(endPos, value.length);
      this.ruleForm.comContent = newValue;
      if (el.setSelectionRange) {
        setTimeout(() => {
          const index = startPos + face.length;
          el.setSelectionRange(index, index);
        }, 0);
      }
      el.focus();
    }
  }
};
</script>

<style lang="scss">
.btn-emoji-default {
  position: absolute;
  right: 0.6rem;
  bottom: 0.6rem;
  svg {
    fill: #8590a6;
  }
}
</style>
