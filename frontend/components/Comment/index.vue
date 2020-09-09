<template>
  <div class="gt-container" id="comment-form">
    <div class="gt-header">
      <a class="gt-avatar-github">
        <span class="gt-ico gt-ico-github">
          <span class="gt-svg">
            <img :src="gravatar+$md5(ruleForm.co_email)" alt />
          </span>
        </span>
      </a>

      <commentForm :ruleForm="ruleForm" @fatherMethod="getcoment" :type="type"></commentForm>
    </div>

    <!--    <div class="gt-comments" v-for="item in comments" :key="item.key"  v-if="item.admin_audit">-->
    <template v-for="item in comments">
      <div class="gt-comments" :key="item.key" v-if="item.admin_audit">
        <div class="gt-comment">
          <div class="gt-avatar gt-comment-avatar">
            <img :src="gravatar+$md5(item.co_email)" :alt="'@'+item.co_username" />
          </div>
          <div class="gt-comment-content">
            <div class="gt-comment-header">
              <span class="gt-comment-username">{{item.co_username}}</span>
              <span class="gt-comment-date">{{ $moment(item.created_at).fromNow() }}</span>
            </div>
            <div class="gt-comment-body" v-html="$twemojiReplace(item.content)" v-if="item.content"></div>
            <div class="gt-comment-action">
              <div class="com-action">
                <svg class="icon" aria-hidden="true" width="16" height="16" viewBox="0 0 20 20">
                  <g fill="none" fill-rule="evenodd">
                    <path d="M0 0h20v20H0z" />
                    <path
                      stroke="#8A93A0"
                      stroke-linejoin="round"
                      d="M10 17c-4.142 0-7.5-2.91-7.5-6.5S5.858 4 10 4c4.142 0 7.5 2.91 7.5 6.5 0 1.416-.522 2.726-1.41 3.794-.129.156.41 3.206.41 3.206l-3.265-1.134c-.998.369-2.077.634-3.235.634z"
                    />
                  </g>
                </svg>
                <a href="#comment-form" @click="addreply(item)">回复</a>
              </div>
            </div>
          </div>
          <replyList :parentComment="item" :ruleForm="ruleForm"></replyList>
        </div>
      </div>
    </template>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :pager-count="5"
      :total="commentTotal"
    ></el-pagination>
  </div>
</template>

<script>
import commentsQuery from "~/apollo/queries/comment/comments";
import commentForm from "./commentform";
import replyList from "./replylist";
export default {
  name: "comment",
  components: {
    commentForm,
    replyList
  },
  props: ["commentTotal", "type"],
  data() {
    return {
      gravatar: "http://2.gravatar.com/avatar/",
      ruleForm: {
        comContent: "",
        co_username: "",
        co_email: "",
        addreply: false
      },
      comments: [],
      currentPage: 1,
      pageSize: 10
    };
  },
  computed: {},
  head() {
    return {};
  },
  mounted() {},
  methods: {
    addreply(item) {
      this.ruleForm.comContent = "回复 " + item.co_username + ": ";
      this.ruleForm.comment_id = item.id;
      this.ruleForm.addreply = true;
    },
    async handleSizeChange(val) {
      var condition;
      if (this.type === "article_id") {
        condition = { article_id: { id: this.$route.params.id } };
      }
      if (this.type === "activity") {
        condition = { activity: { id: this.$route.params.id } };
      }
      let { data } = await this.$apollo.mutate({
        mutation: commentsQuery,
        variables: {
          sort: "created_at:desc",
          limit: this.pageSize,
          start: (val - 1) * 10,
          where: condition
        }
      });
      this.comments = data.comments;
    },
    async handleCurrentChange(val) {
      var condition;
      if (this.type === "article_id") {
        condition = { article_id: { id: this.$route.params.id } };
      }
      if (this.type === "activity") {
        condition = { activity: { id: this.$route.params.id } };
      }
      let { data } = await this.$apollo.mutate({
        mutation: commentsQuery,
        variables: {
          sort: "created_at:desc",
          limit: this.pageSize,
          start: (val - 1) * 10,
          where: condition
        }
      });
      this.comments = data.comments;
    },
    async getcoment() {
      var condition;
      if (this.type === "article_id") {
        condition = { article_id: { id: this.$route.params.id } };
      }
      if (this.type === "activity") {
        condition = { activity: { id: this.$route.params.id } };
      }
      let { data } = await this.$apollo.mutate({
        mutation: commentsQuery,
        variables: {
          sort: "created_at:desc",
          limit: this.pageSize,
          start: 0,
          where: condition
        }
      });
      this.comments = data.comments;
    }
  },
  apollo: {
    comments: {
      prefetch: true,
      query: commentsQuery,
      variables() {
        var condition;
        if (this.type === "article_id") {
          condition = { article_id: { id: this.$route.params.id } };
        }
        if (this.type === "activity") {
          condition = { activity: { id: this.$route.params.id } };
        }
        return {
          sort: "created_at:desc",
          limit: this.pageSize,
          start: 0,
          where: condition
        };
      }
    }
  }
};
</script>

<style lang="scss">
.gt-container {
  padding: 1rem;
  margin-top: 1rem;
  background-color: $color-white;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 1rem;
  box-shadow: $box-shadow;
  .gt-author-info {
    input {
      -webkit-box-shadow: none;
      box-shadow: none;
      border: 1px solid #e1e8ed;
      border-radius: 5px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding: 10px;
      resize: vertical;
      color: $color-main-text;
      width: 100%;
    }
  }
  .gt-header {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .gt-header-comment {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    margin-left: 1.25em;
  }
  .gt-header-controls {
    position: relative;
    margin: 0.5rem 0;
    height: 2rem;
  }
  .gt-avatar-github {
    margin-top: 1rem;
    width: 3em;
    height: 3em;
  }
  .gt-ico-github {
    width: 100%;
    height: 100%;
    .gt-svg {
      width: 3rem;
      height: 3rem;
      img {
        width: 100%;
        border-radius: 100%;
      }
    }
  }

  .gt-ico-text {
    color: $color-text;
    font-size: 0.875em;
    text-decoration: none;
    vertical-align: middle;
  }
  .submit-tip {
    padding: 0.75em 1.25em;
    display: block;
    line-height: 1;
    text-decoration: none;
    white-space: nowrap;
    outline: none;
    font-size: 0.75em;
    float: right;
  }
  .gt-btn {
    padding: 0.75em 1.25em;
    display: block;
    line-height: 1;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #6190e8;
    border-radius: 5px;
    background-color: #6190e8;
    color: #fff;
    outline: none;
    font-size: 0.75em;
    float: right;
  }
  .gt-btn-preview {
    background-color: #fff;
    color: #6190e8;
  }
  .gt-avatar {
    display: inline-block;
    width: 3rem;
    height: 3rem;
    top: 1rem;
    position: absolute;
    img {
      width: 100%;
      border-radius: 100%;
    }
  }
  .gt-comments {
    border-bottom: 1px solid $color-border;
    position: relative;
    display: flex;
    .gt-comment {
      flex: 1 1 auto;
      position: relative;
      margin-bottom: 1rem;
    }
    .gt-comment-content {
      margin-left: 3rem;
      padding: 0.75em 1em;
      overflow: auto;
      -webkit-transition: all ease 0.25s;
      transition: all ease 0.25s;
    }
    .gt-comment-date {
      float: right;
    }
    .gt-comment-username {
    }
    .gt-comment-body {
      img.emojioneemoji {
        font-size: inherit;
        height: 2ex;
        width: 2.1ex;
        min-height: 20px;
        min-width: 20px;
        display: inline-block;
        margin: -0.2ex 0.15em 0.2ex;
        line-height: normal;
        vertical-align: middle;
        max-width: 100%;
        top: 0;
      }
    }
    .gt-comment-action {
      float: right;
      font-size: 0.8rem;
      line-height: 1rem;
      color: $color-sub-text;
      .com-action {
        a {
          color: $color-sub-text;
        }
        .icon {
          display: inline-block;
          background-position: 50%;
          background-repeat: no-repeat;
          background-size: contain;
          vertical-align: -0.125em;
          fill: currentColor;
        }
      }
    }
    .fetch-more {
      padding: 1rem 0;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
}
</style>
