<template>
  <div class="wrap mt-3">
    <div class="main-content">
      <div class="container">
        <!-- 文章内容开始 -->
        <article class="section article js-toc-content" id="viewer-images">
          <div class="AuthorInfo">
            <el-avatar :src="gravatar+$md5(blogSetting.user_email)"></el-avatar>
            <div class="AuthorInfo-content">
              <div class="AuthorInfo-head">{{blogSetting.username}}</div>
              <div
                class="AuthorInfo-detail"
              >{{ $moment(article.created_at).format("YYYY年MM月DD日") }} 阅读{{articleVisits}}</div>
            </div>
          </div>
          <div class="image-view">
            <img :src="api_url+article.image.url" v-if="article.image" />
          </div>
          <h1 class="title">{{article.title}}</h1>
          <div
            class="content-details"
            ref="articleContent"
            v-html="$md.render(article.content)"
            v-if="article.content"
          ></div>
          <!--<div class="tag-list-box">
            <div class="tag-list-title">点击下面的标签，发现更多相似文章</div>
            <ul class="tag-list">
              <li v-for="item in detail.tags" :key="item.key" class="list" :class="`color-${Math.floor(Math.random() * 8) + 1}`">
                <nuxt-link :to="{ name: 'tags-id', params: { id: 1 }, query: { type: item.term_id, title: item.name } }">{{
                item.name }}
                </nuxt-link>
              </li>
            </ul>
          </div>-->
        </article>

        <!-- 文章内容结束 -->

        <!--分享-->
        <Share :article="article" :commentTotal="commentsCount"></Share>
      </div>
      <Comment :commentTotal="commentsCount" type="article_id"></Comment>
    </div>
    <app-sidebar class="sidebar-wrap" pagetype="article"></app-sidebar>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppSidebar from "@/components/AppSidebar";
import Share from "@/components/Share/index.vue";
import Comment from "@/components/Comment/index.vue";
import articleQuery from "~/apollo/queries/article/article";

export default {
  name: "Details",
  components: {
    Share,
    Comment,
    AppSidebar
  },
  async fetch({ params, error, store }) {
    await store.dispatch("GetCommentsCountAct", {
      id: params.aid
    });
    await store.dispatch("updateVisits", {
      id: params.aid
    });
  },
  data() {
    return {
      gravatar: "http://2.gravatar.com/avatar/",
      api_url: process.env.strapiBaseUri,
      viewer: {},
      profile: {},
      article: {}
    };
  },
  computed: {
    ...mapState([
      "blogSetting",
      "articleVisits",
      "articleLikes",
      "commentsCount"
    ])
  },
  head() {
    return {
      title: `${this.blogSetting.title}-${this.article.title}`,
      link: [],
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.article.summary
        },
         {
          hid: "keywords",
          name: "keywords",
          content: this.article.keywords
        },
        {
          hid: "author",
          name: "author",
          content: this.blogSetting.username
        },
        {
          hid: "applemobileweapptitle",
          name: "apple-mobile-web-app-title",
          content: this.article.title
        }
      ]
    };
  },
  created() {},
  mounted() {
    $("#qrcode").qrcode({
      width: 200,
      height: 200,
      text: window.location.href
    });
    this.jqplugins();
  },
  beforeDestroy() {
    $(function() {
      this.viewer.destroy();
    });
  },
  updated() {
    this.jqplugins();
  },
  methods: {
    jqplugins: function() {
      $(function() {
        tocbot.init({
          // Where to render the table of contents.
          tocSelector: ".js-toc",
          // Where to grab the headings to build the table of contents.
          contentSelector: ".js-toc-content",
          // Which headings to grab inside of the contentSelector element.
          headingSelector: "h2,h3,h4"
          // For headings inside relative or absolute positioned containers within content.
        });
        $("pre").addClass("line-numbers");
        Prism.highlightAll();
        this.viewer = new Viewer(document.getElementById("viewer-images"));
      });
    }
  },
  apollo: {
    article: {
      prefetch: true,
      query: articleQuery,
      variables() {
        return { id: parseInt(this.$route.params.aid) };
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.article {
  font-size: 1rem;
  margin-top: 0;
  box-shadow: $box-shadow;

  .title {
    padding: 10px 0;
    text-align: center;
    font-weight: 600;
    font-size: 1.5rem;
  }

  .other-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    padding-bottom: 5px;
    border-bottom: 1px solid $color-border;
    text-align: center;
    color: $color-sub-text;

    .iconfont {
      vertical-align: baseline;
    }
  }

  .image-view {
    text-align: center;
    width: 100%;
    max-height: 20rem;
    overflow: hidden;
    position: relative;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      transform: translate3d(-50%, -50%, 0);
    }
  }
  // 正文
  .content-details {
    line-height: 2;
    word-break: break-all;

    ::v-deep a {
      color: $color-theme;
    }

    ::v-deep h2 {
      margin-top: -3.1rem;
      padding-top: 4.6rem;
      padding-bottom: 12px;
      font-size: 24px;
      border-bottom: 1px solid $color-border;
    }
    ::v-deep h3 {
      margin-top: -3.1rem;
      padding-top: 4.6rem;
      font-size: 18px;
      padding-bottom: 0;
    }
    ::v-deep p {
      margin: 1rem 0;
    }
    ::v-deep img {
      height: auto !important;
      cursor: zoom-in;
      margin: 0 auto;
      display: block;
      max-width: 100%;
    }

    h1::before,
    h2::before,
    h3::before,
    h4::before,
    h5::before,
    h6::before {
      display: block;
      content: " ";
      height: 60px;
      margin-top: -60px;
      visibility: hidden;
    }
    ::v-deep iframe {
      width: 100%;
      height: 500px;
    }
  }
}

// 文章标签
.tag-wrap {
  margin-bottom: $container-margin;

  .iconfont {
    margin-right: 3px;
    font-size: 20px;
  }
}

// 上一篇、下一篇
.relative-link-wrap {
  .next {
    margin-top: 10px;
  }
}

// 作者信息
.author-introduct {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .right {
    flex: 1;
  }

  .header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 5px;
    padding-bottom: 5px;
    border-bottom: 1px solid $color-border;
  }

  .reward {
    margin-left: 10px;
    cursor: pointer;

    .iconfont-colour {
      vertical-align: bottom;
    }
  }

  .name {
    font-size: $font-size-large;
  }

  img {
    margin-right: 10px;
    border-radius: $border-radius;
  }
}

.author-link {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;

  .list {
    box-sizing: border-box;
    margin-right: 10px;
    margin-bottom: 5px;
    padding: 5px;
    border-radius: $border-radius;
    font-size: $font-size-small;

    svg {
      width: 2em;
      height: 2em;
    }
  }

  .iconfont-colour {
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
}

.comment-title {
  margin-bottom: 10px;
  padding: 10px 0;
  border-radius: $border-radius;
  background: $color-sub-background;
  font-size: $font-size-large;
  text-align: center;
}

.AuthorInfo {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin: 0 0 1rem 0;
}

.AuthorInfo-content {
  -webkit-box-flex: 1;
  -ms-flex: 1 1;
  flex: 1 1;
  margin-left: 14px;
  overflow: hidden;
}

.AuthorInfo-head {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 1rem;
  line-height: 1.1;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}

@media screen and (max-width: 767px) {
  .opinion {
    justify-content: space-between;

    .list {
      margin: 0;
    }
  }
  .content-details {
    ::v-deep iframe {
      height: 300px;
    }
  }
  .create-poster-btn {
    display: none;
  }
}
</style>
