import settingQuery from '~/apollo/queries/setting/setting'
import navsQuery from '~/apollo/queries/navigation/navs'

export const state = () => ({
  articleCount:0,
  commentsCount:0,
  articleVisits:0,
  articleLikes:0,
  activitiesCount:0,
  blogSetting:{},
  navs:{},
})
export const mutations = {
  GetArticleCount (state, data) {
    state.articleCount = data
  },
  GetCommentsCount (state, data) {
    state.commentsCount = data
  },
  GetSetting(state, data){
    state.blogSetting = data
  },
  GetNavdata(state, data){
    state.navs = data
  },
  GetArticleVisits(state, data){
    state.articleVisits = data
  },
  GetArticleLikes(state, data){
    state.articleLikes = data
  },
  GetactivitiesC(state, data){
    state.activitiesCount = data
  },
}

export const actions = {
  // 获取公用信息
  async nuxtServerInit (store, context) {
    try {
      let client = context.app.apolloProvider.defaultClient;
      let {data}  = await client.query({query:settingQuery,variables:{id:1}});
      store.commit('GetSetting',data.setting);
      let navdata  = await client.query({query:navsQuery,variables:{limit: 5,start:0}});
      store.commit('GetNavdata',navdata.data.navigations);
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }

  },
  //文章数量
  async GetArticleCountAct ({ commit }) {
    try {
      let data  = await this.$axios.$get(`${process.env.strapiBaseUri}/articles/count`)
      // console.log(data)
      commit('GetArticleCount', data)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  }, //文章数量
  async SearchArticleCountAct ({ commit },Parameters) {
    try {
      let data  = await this.$axios.$get(`${process.env.strapiBaseUri}/articles/search/count?${Parameters.query}`)
      commit('GetArticleCount', data)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  //数量
  async GetCommentsCountAct ({ commit },Parameters) {
    try {
      let data  = await this.$axios.$get(`${process.env.strapiBaseUri}/comments/count/${Parameters.id}`)
      // console.log(data)
      commit('GetCommentsCount', data)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  //活动数量
  async GetActivitiesCountAct ({ commit },Parameters) {
    try {
      let data  = await this.$axios.$get(`${process.env.strapiBaseUri}/activities/count`)
      commit('GetactivitiesC', data)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async AddComment ({ commit },Parameters) {
    try {
      let data  =await this.$axios.$post(`${process.env.strapiBaseUri}/comments`,Parameters);
      Parameters.message({
        message: '成功提交评论，等待管理员审核',
        type: 'success'
      });
      return Promise.resolve(data)
    } catch (error) {
      Parameters.message.error("提交失败，失败信息："+error)
      return Promise.reject(error)
    }
  },
  async AddReply ({ commit },Parameters) {
    try {
      let data  =await this.$axios.$post(`${process.env.strapiBaseUri}/replycomments`,Parameters);
      Parameters.message({
        message: '成功提交评论，等待管理员审核',
        type: 'success'
      });
      return Promise.resolve(data)
    } catch (error) {
      Parameters.message.error("提交失败，失败信息："+error)
      return Promise.reject(error)
    }
  },
  async updateVisits ({ commit },Parameters) {
    try {
      let data  =await this.$axios.$put(`${process.env.strapiBaseUri}/articles/visits/${Parameters.id}`);
      commit('GetArticleVisits', data)
      return Promise.resolve(data)
    } catch (error) {
      Parameters.message.error("提交失败，失败信息："+error)
      return Promise.reject(error)
    }
  },
  async updateLikes ({ commit },Parameters) {
    try {
      let data  =await this.$axios.$put(`${process.env.strapiBaseUri}/articles/likes/${Parameters.id}`);
      commit('GetArticleLikes', data)
      return Promise.resolve(data)
    } catch (error) {
      Parameters.message.error("提交失败，失败信息："+error)
      return Promise.reject(error)
    }
  },
}
