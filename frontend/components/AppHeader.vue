<template>
  <header :class="['header-container']">
    <div class="hide-header"></div>
    <div class="header-content" ref="header">
      <div class="wrap h-f-100">
        <!-- logo 开始 -->
        <div class="logo">
          <h1>{{ blogSetting.title }}</h1>
          <nuxt-link :to="{ name: 'index' }" class="block">
            <img :src="api_url+blogSetting.logo.url" class="vertical-middle headerlogo" width="130" height="32" v-if="blogSetting.logo">
          </nuxt-link>
        </div>
        <!-- logo结束 -->
        <!-- 导航开始 -->

        <el-menu :default-active="$nuxt.$route.fullPath" router class="el-menu-demo nav-wrapper" mode="horizontal">
          <el-menu-item v-for="item in navs" :key="item.id" :index="item.url">
             {{ item.label }}
          </el-menu-item>
        </el-menu>

        <!-- 导航结束 -->
        <!-- 右侧搜索开始 -->
        <div class="search-content">
          <el-input
            v-model="searchText"
            type="text"
            size="small"
            placeholder="请输入关键字"
            @keyup.native.enter="search">
            <i slot="suffix" class="el-input__icon el-icon-search" @click="search" style="cursor: pointer"></i>
          </el-input>
        </div>
        <svg class="search-svg phone-show" @click="changeNavWrap" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="43657"><path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zM904 784H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zM904 472H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z" p-id="43658"></path></svg>
        <!-- 右侧搜索结束 -->
      </div>
    </div>
    <el-drawer
      :visible.sync="drawer"
      direction="rtl">
      <el-menu :default-active="$nuxt.$route.fullPath" router class="el-menu-demo" mode="vertical" @select="changeNavWrap">
        <el-menu-item v-for="item in navs" :key="item.id" :index="item.url">
          {{ item.label }}
        </el-menu-item>
      </el-menu>
    </el-drawer>
  </header>
</template>
<script>
import { mapState } from 'vuex'

export default {
  watchQuery: ['type'],
  name: 'AppHeader',
  data () {
    return {
      api_url: process.env.strapiBaseUri,
      searchText: '',
      info:{},
      menu:[],
      drawer: false,
    }
  },
  head () {
    return {
    }
  },
  computed: {
    ...mapState(['blogSetting','navs']),

  },
  watch: {

  },
  methods: {
    // 搜索
    search () {
      this.$router.push({
        name: 'search',
        query: {
          page: 1,
          keyword: this.searchText
        }
      })
      this.searchText = ''
    },
    changeNavWrap(){
      if(this.drawer){
        this.drawer=false
      }else{
        this.drawer=true
      }


    }
  }

}
</script>
<style lang="scss" scoped>
$headerHeight: 60px;
.header-container {
  position: relative;
  width: 100%;
  height: $headerHeight;


  .hide-header {
    height: $headerHeight;
  }

  .header-content {
    background-color: $color-white;
    position: fixed;
    top: 0;
    left: 0;
    z-index: $z-index + 999;
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #f1f1f1;
  }

  .wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    h1 {
      position: fixed;
      top: -500%;
      left: 0;
    }
    .headerlogo{
      width: 130px;
      height: 32px;
    }
  }

  // 导航
  .nav-wrapper {
    margin: 0 20px;
    flex:1;
    .nav-view {
      display: flex;
    }
    .nav-item {
      position: relative;
      .first-link {
        display: block;
        padding: 0 10px;
        line-height: $headerHeight;
      }

      &:hover {
        .sub-nav-wrapper {
          display: block;
        }
      }
    }
  }
}

@media screen and (min-width:1024px) {
  .header-container {


  }
}
@media screen and (max-width: 1200px) {

  .header-container {

  }
}
@media screen and (max-width:1023px) {
  .search-content{
    margin: 0 10px;
  }
  .header-container {
    .nav-wrapper {
      display: none;
    }
    .logo {
      .headerlogo{
        width: 80px;
      }
    }
  }
}

</style>
