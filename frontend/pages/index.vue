<template>
  <div class="wrap mt-3">
    <div class="main-content">
      <div class="container">
        <!-- banner start -->
        <!-- banner end -->
        <!-- article list start -->
        <div class="article-list-wrap">
          <ul class="header p-3">
            <li class="list">最新文章</li>
          </ul>
          <article-list :articleList="articles" :pageSize="pagesize" :total="articleCount" :currentPage="1" @fatherMethod="changePagination" ></article-list>
        </div>
        <!-- article list end -->
      </div>

    </div>
    <app-sidebar class="sidebar-wrap"></app-sidebar>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import AppSidebar from '@/components/AppSidebar'
  import ArticleList from '~/components/ArticleList'
  import articlesQuery from '~/apollo/queries/article/articles'

  export default {
    name: 'Index',
    fetch({store}) {
      return store.dispatch('GetArticleCountAct')
    },
    components: {
      AppSidebar,
      ArticleList,
    },
    computed: {
      ...mapState(['articleCount']),
      ...mapState(['blogSetting']),
      //跟state做关联 articleList: state => state.articleList,
    },
    head() {
      return {
        title: `${this.blogSetting.title}`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.blogSetting.description
          }, {
            hid: 'author',
            name: 'author',
            content: this.blogSetting.title
          }, {
            hid: 'applemobileweapptitle',
            name: 'apple-mobile-web-app-title',
            content: this.blogSetting.title
          }
        ]
      }
    },
    data() {
      return {
        pagesize: 10,
        articles: [],
        info: {},
      }
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      changePagination(val) {
        console.log(this.blogSetting)
        this.$router.push({
          name: 'page-id',
          params: {id:val}
        })
      }
    },
    apollo: {
      articles: {
        prefetch: true,
        query: articlesQuery,
        variables () {
          return { limit: this.pagesize,start:0,sort: "created_at:desc" }
        }
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
