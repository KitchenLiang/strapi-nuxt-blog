<template>
  <div class="wrap mt-3">
    <div class="main-content">
      <div class="container">
        <div class="book-card">
          <div class="book-info">
            <div class="poster" v-if="activity.banner">
              <img :src="api_url+activity.banner.url" />
            </div>
            <div class="info">
              <div class="title-line">
                <a :href="activity.url" target="_blank" class="title">
                  <span>{{activity.title}}</span>
                </a>
              </div>
              <div class="media">
                <div class="desc">{{activity.description}}</div>
                <div class="author">
                  <el-avatar :src="gravatar+$md5(blogSetting.user_email)"></el-avatar>
                  <div class="author-info ml-2">{{blogSetting.username}}</div>
                  <div class="author-desc phone-hide">
                    <span>更新时间：{{$moment(activity.updated_at).format('lll')}}</span>
                  </div>
                  <div class="author-desc phone-show">
                    <span>
                      <svg
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="3651"
                      >
                        <path
                          d="M512 64C264.96 64 64 264.96 64 512s200.96 448 448 448 448-200.96 448-448S759.04 64 512 64z m0 831.712c-211.584 0-383.712-172.16-383.712-383.712 0-211.584 172.128-383.712 383.712-383.712 211.552 0 383.712 172.128 383.712 383.712 0 211.552-172.16 383.712-383.712 383.712z"
                          p-id="3652"
                        />
                        <path
                          d="M671.968 512H512V288.064c0-17.76-14.24-32.128-32-32.128s-32 14.4-32 32.128V544c0 17.76 14.272 32 32 32h191.968c17.76 0 32.128-14.24 32.128-32s-14.368-32-32.128-32z"
                          p-id="3653"
                        />
                      </svg>
                      {{$moment(activity.updated_at).format('lll')}}
                    </span>
                  </div>
                </div>
              </div>
              <div class="other">
                <!---->
                <div class="not-buy" style="padding-bottom: 30px;">
                  <div class="buy-box">
                    <a class="button--buy" :href="activity.url" target="_blank">京东自营</a>
                  </div>
                  <a class="button--write" :href="activity.url2" target="_blank">天猫旗舰店</a>
                </div>
              </div>
            </div>
          </div>
          <div class="book-mobile-other">
            <a class="button--buy" :href="activity.url2" target="_blank">京东自营</a>
            <a class="button--write" :href="activity.url" target="_blank">天猫旗舰店</a>
          </div>
        </div>
        <div class="book-card">
          <div class="book-menu-wrap">
            <div class="book-menu">
              <div class="item active">
                <span class="text">介绍</span>
              </div>
            </div>
          </div>
          <div class="book-content" v-html="$md.render(activity.content)" v-if="activity.content"></div>
        </div>
      </div>
      <Comment :commentTotal="commentsCount" type="activity"></Comment>
    </div>
    <app-sidebar class="sidebar-wrap" pagetype="activity"></app-sidebar>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AppSidebar from "@/components/AppSidebar";
import Comment from "@/components/Comment/index.vue";
import activityQuery from "~/apollo/queries/activities/activity";

export default {
  name: "Details",
  components: {
    AppSidebar,
    Comment
  },
  async fetch({ params, error, store }) {
    await store.dispatch("GetCommentsCountAct", {
      id: params.id
    });
  },
  data() {
    return {
      gravatar: "http://2.gravatar.com/avatar/",
      api_url: process.env.strapiBaseUri,
      activity: {}
    };
  },
  computed: {
    ...mapState(["blogSetting", "commentsCount"])
  },
  head() {
    return {
      title: `活动-${this.blogSetting.title}`,
      meta: [
        {
          name: "keywords",
          content: "活动"
        },
        {
          name: "description",
          content: this.blogSetting.description
        }
      ]
    };
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {},
  apollo: {
    activity: {
      prefetch: true,
      query: activityQuery,
      variables() {
        return { id: parseInt(this.$route.params.id) };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.icon {
  width: 16px;
  height: 16px;
  margin-right: 5px;
  display: inline-block;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: contain;
  vertical-align: -0.2em;
  fill: currentColor;
}
.book-card {
  max-width: 1000px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 12px;
  position: relative;
  box-shadow: $box-shadow;
  background-color: #fff;

  .poster {
    width: 230px;
    height: 230px;
    border-radius: 2px;
    background-repeat: no-repeat;
    float: left;
    margin-right: 20px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      cursor: zoom-in;
    }
  }
}

.book-info {
  padding: 20px;
  .info {
    font-size: 14px;
    min-height: 230px;
    .title {
      font-size: 20px;
      font-weight: 700;
      color: #333;
    }
    .media {
      display: flex;
      flex-direction: column;
      .desc {
        margin-top: 10px;
        min-height: 40px;
        max-height: 60px;
        line-height: 20px;
        overflow: hidden;
        color: #71777c;
      }
      .author {
        position: relative;
        display: flex;
        align-items: center;
        margin-top: 12px;
        .author-info {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          color: #333;
          .user {
            display: flex;
            align-items: center;
            color: #000;
          }
        }
        .hero {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          margin-right: 8px;
        }
        .author-desc {
          color: #71777c;
          margin-left: 10px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .other {
      margin-top: 25px;
      position: relative;
      .not-buy {
      }
      .buy-box {
        float: left;
      }
    }
  }
  .button--buy {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    padding-left: 30px;
    padding-right: 30px;
    background-color: #007fff;
    color: #fff;
    text-align: center;
    display: inline-block;
  }
  .button--write {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    padding-left: 30px;
    padding-right: 30px;
    color: #71777c;
    text-align: center;
    background-color: #fff;
    border: 1px solid #aeb6c0;
    margin-left: 5px;
    display: inline-block;
  }
}
.book-mobile-other {
  border-top: 1px solid #ecf0f3;
  display: none;
  padding: 15px;
  background: #fff;
  position: relative;
  .button--buy {
    width: 48%;
    display: inline-block;
    margin-right: 4%;
  }
  .button--write {
    width: 48%;
    display: inline-block;
  }
}
.button--buy {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  padding-left: 30px;
  padding-right: 30px;
  background-color: #007fff;
  color: #fff;
  text-align: center;
  box-sizing: border-box;
}
.button--write {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  padding-left: 30px;
  padding-right: 30px;
  color: #71777c;
  text-align: center;
  background-color: #fff;
  border: 1px solid #aeb6c0;
  box-sizing: border-box;
}
.book-menu-wrap {
  width: 100%;
  background: #fff;
}
.book-menu {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  height: 50px;
  line-height: 50px;
  position: relative;
  border-bottom: 1px solid #ecf0f3;
  .item {
    padding-left: 20px;
    padding-right: 20px;
    font-size: 16px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .item.active {
    color: #007fff;
    border-bottom: 2px solid #007fff;
  }
}
.book-content {
  padding: 30px;
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
@media (max-width: 720px) {
  .book-mobile-other {
    display: flex;
  }
  .book-card {
    .poster {
      width: 100%;
      height: 180px;
      text-align: center;
      img {
        vertical-align: middle;
        width: auto;
        max-width: 100%;
        max-height: 180px;
      }
    }
  }
  .book-info {
    .other {
      display: none;
    }
    .info {
      margin-left: 0;
      .media {
        .desc {
          max-height: 100px;
        }
        .author-desc {
        }
      }
    }
  }
  .book-content {
    ::v-deep iframe {
      height: 300px;
    }
  }
}
</style>
