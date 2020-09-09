<template>
  <div class="single-pagecon">
    <h2 class="single-page-title">
      <span>全部分类</span>
    </h2>
    <ul class="list-wrap">
      <li v-for="item in categories" :key="item.key" class="list">
        <nuxt-link :to="{ name: 'category-id', params: { id:  item.id }, query: { name: item.name} }">
          {{ item.name }}
          <span class="single-page-badge">{{$changenum(item.articles.length)}}</span>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import categorysQuery from '~/apollo/queries/category/categories'
  export default {
    name: 'Page',
    layout: 'page',
    computed: {
      ...mapState(['blogSetting']),
    },
    head () {
      return {
        title: `全部分类-${this.blogSetting.title}`,
        link: [
        ],
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: '全部分类'
          }, {
            hid: 'author',
            name: 'author',
            content: this.blogSetting.title
          }, {
            hid: 'applemobileweapptitle',
            name: 'apple-mobile-web-app-title',
            content: this.blogSetting.title
          }
        ],
      }
    },
    apollo:{
      categories:{
        prefetch:true,
        query:categorysQuery,
        variables(){
          return { limit: 10,start:0}
        }
      },
    }
  }
</script>

<style lang="scss">

</style>
