<template>
  <div>
    <!-- 公告栏 -->
    <div v-if="blogSetting.notice" class="sidebar-list notice">
      <div class="header">
        <span>公告</span>
      </div>
      <div class="sidebar-content" v-html="$md.render(blogSetting.notice)"></div>
    </div>
    <!-- 最新评论 -->
    <div class="sidebar-list sidebar-card tag-cloud" v-if="pagetype!=='activity'">
      <div class="header">
        <span>热门分类</span>
        <router-link :to="{ name: 'category' }">更多</router-link>
      </div>
      <div v-for="item in categories" :key="item.key" class="sidebar-card-item">
        <nuxt-link
          :to="{ name: 'category-id', params: { id:  item.id }, query: { name: item.name} }"
        >
          {{ item.name }}
          <el-badge
            :value="item.articles.length"
            :max="99"
            class="sidebar-card-badge"
            type="primary"
          ></el-badge>
        </nuxt-link>
      </div>
    </div>

    <!-- 站点统计 -->
    <div v-if="sidebar.isOpenAsideCount" class="sidebar-list count">
      <div class="header">
        <span>站点统计</span>
      </div>
      <ul class="content">
        <li class="list">标签：{{ sidebar.getAllCountTag }}个</li>
        <li class="list">文章：{{ sidebar.getAllCountArticle }}篇</li>
        <li class="list">页面：{{ sidebar.getAllCountPage }}个</li>
        <li class="list">评论：{{ sidebar.getAllCountComment }}条</li>
        <li class="list">分类：{{ sidebar.getAllCountCat }}个</li>
        <li class="list">最后更新：{{ sidebar.lastUpDate }}</li>
      </ul>
    </div>
    <!-- 标签云 -->
    <div class="sidebar-list tag-cloud mt-3" v-if="pagetype==='activity'">
      <div class="header">
        <span>热门标签</span>
        <nuxt-link :to="{ name: 'activity' }">更多</nuxt-link>
      </div>
      <ul class="content">
        <template v-for="(item, index) in tags">
          <li
            :key="item.key"
            v-if="index < 20"
            class="list"
           >
            <nuxt-link :to="{ name: 'activity', query: { tags: item.name} }">{{ item.name }}</nuxt-link>
          </li>
        </template>
      </ul>
    </div>
    <div class="sidebar-list tag-cloud sticky-bar mt-3" v-if="pagetype==='article'">
      <div class="header">
        <span>文章目录</span>
      </div>
      <div class="js-toc"></div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import categorysQuery from "~/apollo/queries/category/categories";
import tagsQuery from "~/apollo/queries/tags/tags";
export default {
  name: "AppSidebar",
  props: ["pagetype"],
  mounted() {},
  data() {
    return {
      sidebar: {}
    };
  },
  computed: {
    ...mapState(["blogSetting"])
  },
  apollo: {
    categories: {
      prefetch: true,
      query: categorysQuery,
      variables() {
        return { limit: 10, start: 0 };
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
<style lang="scss">
.sticky-bar {
  position: sticky;
  top: 4.5rem;
  right: 0;
}

.toc {
  overflow-y: auto;
}

.toc > .toc-list {
  overflow: hidden;
  position: relative;
}

.toc > .toc-list li {
  list-style: none;
}

.toc-list {
  margin: 0;
  padding-left: 10px;
}

a.toc-link {
  height: 100%;
}

.is-collapsible {
  max-height: 1000px;
  overflow: hidden;
  transition: all 300ms ease-in-out;
}

.is-collapsed {
  max-height: 0;
}

.is-position-fixed {
  position: fixed !important;
  top: 0;
}

.is-active-link {
  font-weight: bold;
  color: $color-theme;
}


</style>
