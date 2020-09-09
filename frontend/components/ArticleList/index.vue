<template>
  <div class="infinite-list-wrapper" style="overflow:auto">
      <article class="article-list p-3" v-for="item in articleList" :key="item.key" >
        <h2 class="title">
          <span class="classify" v-if="item.topPriority===1">热门</span>
          <nuxt-link :to="{ name: 'archives-id', params: { id: item.id} }" class="vertical-middle" >{{item.title}}</nuxt-link>
        </h2>
        <nuxt-link :to="{ name: 'archives-id', params: { id: item.id} }" class="thumbnail-wrap mr-3" v-if="item.image">
          <img :src="api_url+item.image.url" class="thumbnail" alt="">
        </nuxt-link>
        <div class="list-content">
          <div class="summary">{{ item.summary }}</div>
        </div>
        <div class="information">
          <div class="info-left" v-if="item.category">
            <span>{{item.category.name}}</span>
          </div>
          <div class="info-right">
            <span>
                  <svg class="svg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path
                    d="M512 938.666667c235.637333 0 426.666667-191.029333 426.666667-426.666667S747.637333 85.333333 512 85.333333 85.333333 276.362667 85.333333 512s191.029333 426.666667 426.666667 426.666667zM329.376 649.376L480 498.741333V320a32 32 0 0 1 64 0v192a32 32 0 0 1-9.376 22.624l-160 160a32 32 0 1 1-45.248-45.248z"></path></svg>
                  {{ $moment(item.published_at).fromNow() }}
                </span>
            <span>
                  <svg class="svg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path
                    d="M512 192c156.448 0 296.021333 98.730667 418.410667 291.605333a52.938667 52.938667 0 0 1 0 56.789334C808.021333 733.269333 668.448 832 512 832c-156.448 0-296.021333-98.730667-418.410667-291.605333a52.938667 52.938667 0 0 1 0-56.789334C215.978667 290.730667 355.552 192 512 192z m0 128c-106.037333 0-192 85.962667-192 192s85.962667 192 192 192 192-85.962667 192-192-85.962667-192-192-192z m0 320c70.688 0 128-57.312 128-128s-57.312-128-128-128-128 57.312-128 128 57.312 128 128 128z"></path></svg>
                  {{ $changenum(item.visits) }}
            </span>
            <span>
                  <svg class="svg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path
                    d="M512 85.333333c235.637333 0 426.666667 191.029333 426.666667 426.666667S747.637333 938.666667 512 938.666667a424.778667 424.778667 0 0 1-219.125333-60.501334 2786.56 2786.56 0 0 0-20.053334-11.765333l-104.405333 28.48c-23.893333 6.506667-45.802667-15.413333-39.285333-39.296l28.437333-104.288c-11.008-18.688-18.218667-31.221333-21.802667-37.909333A424.885333 424.885333 0 0 1 85.333333 512C85.333333 276.362667 276.362667 85.333333 512 85.333333z m-102.218667 549.76a32 32 0 1 0-40.917333 49.216A223.178667 223.178667 0 0 0 512 736c52.970667 0 103.189333-18.485333 143.104-51.669333a32 32 0 1 0-40.906667-49.216A159.189333 159.189333 0 0 1 512 672a159.189333 159.189333 0 0 1-102.218667-36.906667z"></path></svg>
                  {{ $changenum(item.comments.length) }}
            </span>
            <span class="mobile-hide">
                  <svg class="svg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path
                    d="M621.674667 408.021333c16.618667-74.24 28.224-127.936 34.837333-161.194666C673.152 163.093333 629.941333 85.333333 544.298667 85.333333c-77.226667 0-116.010667 38.378667-138.88 115.093334l-0.586667 2.24c-13.728 62.058667-34.72 110.165333-62.506667 144.586666a158.261333 158.261333 0 0 1-119.733333 58.965334l-21.909333 0.469333C148.437333 407.808 106.666667 450.816 106.666667 503.498667V821.333333c0 64.8 52.106667 117.333333 116.394666 117.333334h412.522667c84.736 0 160.373333-53.568 189.12-133.92l85.696-239.584c21.802667-60.96-9.536-128.202667-70.005333-150.186667a115.552 115.552 0 0 0-39.488-6.954667H621.674667z"></path></svg>
                  {{ $changenum(item.likes)}}
            </span>
          </div>
        </div>
      </article>
    <article class="article-list p-3" v-if="articleList.length===0">
      <h2 class="title text-center">
        暂无结果
      </h2></article>
    <el-pagination
      small
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :pager-count="5"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
    export default {
      data: function() {
        return {
          api_url: process.env.strapiBaseUri
        };
      },
      name: 'article-list',
      props: ['articleList','pageSize','total','currentPage'],
      methods: {
        handleSizeChange(val) {
          this.$emit('fatherMethod',val);
        },
        handleCurrentChange(val) {
          this.$emit('fatherMethod',val);
        },


      }
    }

</script>

<style lang="scss" scoped>
.loadmore{
  margin: 30px auto 10px;
}
</style>
