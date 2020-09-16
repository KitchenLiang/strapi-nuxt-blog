<template>
  <div class="single-pagecon">
    <div class="phone-hide">
      <span class="more-list" @click="showmorefun" v-if="!showmore">
        更多
        <i class="el-icon-arrow-down"></i>
      </span>
      <span class="more-list" @click="showmorefun" v-if="showmore">
        收起
        <i class="el-icon-arrow-up"></i>
      </span>
      <div class="mr-5" v-if="tags">
        <ul class="list-tag clearfix">
          <li class="list">
            <nuxt-link :to="{ name: 'activity', query: {} }">全部</nuxt-link>
          </li>
          <template v-for="(t, index) in tags">
            <li :key="t.key" v-if="index < 7" class="list">
              <nuxt-link :to="{ name: 'activity', query: { tags: t.name} }">{{ t.name }}</nuxt-link>
            </li>
          </template>
        </ul>
        <ul class="list-tag clearfix" v-if="showmore">
          <template v-for="(t, index) in tags">
            <li :key="t.key" v-if="index > 7" class="list">
              <nuxt-link :to="{ name: 'activity', query: { tags: t.name} }">{{ t.name }}</nuxt-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <ul class="list-tag clearfix phone-show" v-if="tags">
      <li class="list">
        <nuxt-link :to="{ name: 'activity', query: {} }">全部</nuxt-link>
      </li>
      <template v-for="(t, index) in tags">
        <li :key="t.key" v-if="index < 2" class="list">
          <nuxt-link :to="{ name: 'activity', query: { tags: t.name} }">{{ t.name }}</nuxt-link>
        </li>
      </template>
      <li class="list" @click="drawer = true">
        <span class="el-dropdown-link">更多</span>
      </li>
    </ul>

    <div class="container">
      <div class="activities-list">
        <div class="activity" v-for="item in activities" :key="item.key">
          <div class="activity-inner">
            <nuxt-link :to="{ name: 'activity-id', params: { id: item.id} }">
              <div class="banner" :style="'background-image:url('+api_url+item.banner.url+')'"></div>
            </nuxt-link>
            <div class="message">
              <nuxt-link :to="{ name: 'activity-id', params: { id: item.id} }">
                <div class="title">{{item.title}}</div>
              </nuxt-link>
              <div class="date">
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
                {{$moment(item.updated_at).fromNow()}}
              </div>
              <div class="bottom">
                <div class="class">
                  <svg
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2834"
                  >
                    <path
                      d="M956.98777 383.284453l-32.18912-203.656353c-6.134721-39.130206-43.123147-76.157517-82.036411-82.373079L639.797641 65.040319c-5.238304-0.827855-10.759041-1.225921-16.457834-1.225921-36.764322 0-81.007989 16.541745-105.166201 40.793078L85.712127 538.576285c-27.883047 27.967982-27.883047 73.792657 0 101.805664l297.820989 298.810526c13.957897 13.990642 32.364105 20.993127 50.764174 20.993127 18.387789 0 36.768415-6.992251 50.706869-20.993127l432.481945-433.924807C958.405049 464.212624 963.14398 422.370657 956.98777 383.284453L956.98777 383.284453zM878.235149 465.972711 445.728644 899.922077c-4.037966 4.055362-8.895601 4.66116-11.431354 4.66116-2.553149 0-7.447623-0.61296-11.514241-4.686742L124.987642 601.109504c-6.282077-6.309706-6.29538-16.947997-0.021489-23.24133l432.469666-433.976996c13.216-13.267165 43.396369-24.475438 65.903989-24.475438 2.888793 0 5.517667 0.184195 7.779174 0.541329l202.963575 32.214702c7.036253 1.143033 15.743566 6.204305 22.740934 13.223163 7.013741 7.037277 12.060687 15.796778 13.166881 22.861684l0.00614 0.033769 0.005117 0.034792 32.184003 203.626677C906.267599 417.862993 903.756405 440.365496 878.235149 465.972711L878.235149 465.972711z"
                      p-id="2835"
                    />
                    <path
                      d="M698.197726 231.719502c-48.930409 0-88.600921 39.759539-88.600921 88.798419 0 49.081858 39.671535 88.797395 88.62241 88.797395 48.906873 0 88.600921-39.802518 88.579431-88.797395C786.754644 271.480065 747.08311 231.719502 698.197726 231.719502L698.197726 231.719502z"
                      p-id="2836"
                    />
                  </svg>

                  <el-tag
                    class="mr-2"
                    size="mini"
                    v-for="t in item.tags"
                    :key="t.id"
                    :index="t.name"
                  >{{t.name}}</el-tag>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-pagination
        small
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :pager-count="5"
        :total="activitiesCount"
      ></el-pagination>
    </div>

    <el-drawer
      class="activit-drawer"
      :visible.sync="drawer"
      direction="ttb"
      ref="drawer"
      size="40%"
    >
      <ul class="drawer-list" v-if="tags">
        <template v-for="(t, index) in tags">
          <li :key="t.key" v-if="index > 2" class="list" @click="$refs.drawer.closeDrawer()">
            <nuxt-link :to="{ name: 'activities', query: { tags: t.name} }">{{ t.name }}</nuxt-link>
          </li>
        </template>
      </ul>
    </el-drawer>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

import activitiesQuery from "~/apollo/queries/activities/activities";
import tagsQuery from "~/apollo/queries/tags/tags";
export default {
  name: "Details",
  layout: "page",
  fetch({ params, query, store }) {
    return store.dispatch("GetActivitiesCountAct", {});
  },
  components: {},
  data() {
    return {
      api_url: process.env.strapiBaseUri,
      activities: {},
      pageSize: 16,
      currentPage: 1,
      drawer: false,
      showmore: false
    };
  },
  computed: {
    ...mapState(["blogSetting"]),
    ...mapState(["activitiesCount"])
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
        },{
          hid: "author",
          name: "author",
          content: this.blogSetting.username
        }
      ]
    };
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    handleCurrentChange(val) {
      this.$router.push({
        name: "activities",
        query: { page: val }
      });
    },
    showmorefun() {
      this.showmore = !this.showmore;
    }
  },
  apollo: {
    activities: {
      prefetch: true,
      query: activitiesQuery,
      variables() {
        return {
          limit: this.pageSize,
          start: this.$route.query.page
            ? (this.$route.query.page - 1) * this.pageSize
            : 0,
          where: { tags: { name: this.$route.query.tags } }
        };
      }
    },
    tags: {
      prefetch: true,
      query: tagsQuery,
      variables() {
        return { sort: "index:desc" };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.list-tag {
  .list {
    width: 12.5%;
    float: left;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    justify-content: center;
    background-color: #fff;
    a,
    .el-dropdown-link {
      white-space: nowrap;
      text-overflow: ellipsis;
      display: block;
      padding: 0 1rem;
      border-radius: 100px;
      line-height: 2rem;
      background-color: #f4f5f5;
      text-align: center;
      margin: 0.4rem;
      overflow: hidden;
    }
    a:hover {
      color: #409eff;
    }
  }
}
.more-list {
  float: right;
  border-radius: 100px;
  line-height: 2rem;
  text-align: center;
  margin: 0.4rem 0;
  cursor: pointer;
}
.el-dropdown-link {
  cursor: pointer;
  color: #999999;
}
.activities-list {
  margin-top: 1rem;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  .activity {
    width: 25%;
    padding-left: 7px;
    padding-right: 7px;
    box-sizing: border-box;
    transition: all 0.2s linear;
    position: relative;
    &:hover {
      box-shadow: $box-shadow;
      transition: all 0.2s linear;
    }
    margin-bottom: 30px;
    .activity-inner {
      border-radius: 2px;
      overflow: hidden;
      color: #333;
      .banner {
        padding-top: 58.82%;
        background-color: #ccc;
        background-repeat: no-repeat;
        background-size: cover;
      }
      .message {
        padding: 20px 12px 15px;
        .title {
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          height: 40px;
          font-size: 14px;
          font-weight: 700;
        }
        .icon {
          width: 16px;
          height: 16px;
          margin-right: 5px;
          display: inline-block;
          background-position: 50%;
          background-repeat: no-repeat;
          background-size: contain;
          vertical-align: -0.125em;
          fill: currentColor;
        }
        .date {
          color: $color-sub-text;
        }
        .bottom {
          color: $color-sub-text;
          margin-top: 6px;
          display: flex;
          justify-content: space-between;
          .btn-join {
            width: 100px;
            height: 25px;
            border-radius: 30px;
            background-color: $color-theme;
            line-height: 25px;
            color: #fff;
            text-align: center;
          }
        }
      }
    }
  }
  .activity:before {
    content: "";
    position: absolute;
    left: 7px;
    right: 7px;
    top: 0;
    bottom: 0;
    z-index: -1;
    border-radius: 2px;
    overflow: hidden;
    background-color: #fff;
    transition: all 0.2s linear;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
  }
}

@media (max-width: 960px) {
  .activities-list {
    .activity {
      width: 50%;
    }
  }
  .list-tag {
    .list {
      width: 25%;
    }
  }
}
@media (max-width: 480px) {
  .activities-list {
    .activity {
      width: 100%;
    }
  }
}
.el-menu.el-menu--horizontal {
  border-bottom: 0;
}

.drawer-list {
  display: flex;
  padding: 0 1rem 1rem 1rem;
  flex-wrap: wrap;
  li {
    display: block;
    width: 33.333%;
    float: left;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    justify-content: center;
    background-color: #fff;
    a {
      white-space: nowrap;
      text-overflow: ellipsis;
      display: block;
      padding: 0 1rem;
      border-radius: 100px;
      line-height: 2rem;
      background-color: #f4f5f5;
      text-align: center;
      margin: 0.4rem;
      overflow: hidden;
    }
  }
}
.list .nuxt-link-exact-active,
.el-dropdown-menu .nuxt-link-exact-active,
.drawer-list .nuxt-link-exact-active {
  background-color: $color-theme !important;
  color: #fff !important;
}
.activit-drawer {
  ::v-deep header {
    margin-bottom: 0.5rem;
  }
  ::v-deep .el-drawer__body {
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
