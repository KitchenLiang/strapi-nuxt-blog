<template>
  <div class="gt-reply">
    <div class="gt-comments" v-for="item in replycomments" :key="item.key" v-if="item.admin_audit">
      <div class="gt-comment">
        <div class="gt-avatar gt-comment-avatar">
          <img :src="gravatar+$md5(item.rc_email)" :alt="'@'+item.rc_username">
        </div>
        <div class="gt-comment-content">
          <div class="gt-comment-header">
            <span class="gt-comment-username" >{{item.rc_username}}</span>
            <span class="gt-comment-date">{{ $moment(item.created_at).fromNow() }}</span>
          </div>
          <div class="gt-comment-body markdown-body" v-html="$md.render(item.content)" v-if="item.content"></div>
          <div class="gt-comment-action">
             <div class="com-action">
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 20 20" >
                <g fill="none" fill-rule="evenodd">
                  <path  d="M0 0h20v20H0z"></path>
                  <path stroke="#8A93A0" stroke-linejoin="round" d="M10 17c-4.142 0-7.5-2.91-7.5-6.5S5.858 4 10 4c4.142 0 7.5 2.91 7.5 6.5 0 1.416-.522 2.726-1.41 3.794-.129.156.41 3.206.41 3.206l-3.265-1.134c-.998.369-2.077.634-3.235.634z"></path></g>
              </svg>
               <a href="#comment-form" @click="addreply(item)">回复</a>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="fetch-more" v-if="replycomments.length>=replyPageSize" @click="getreplyist">加载更多</div>
  </div>
</template>

<script>
  import replycommentsQuery from '~/apollo/queries/comment/replaycomments'

  export default {
    name: 'replyComment',
    props: ['parentComment','ruleForm'],
    data() {
      return {
        gravatar:'http://2.gravatar.com/avatar/',
        replycomments:[],
        replyPageSize:2
      }
    },
    computed: {

    },
    head() {

      return {

      }
    },
    mounted() {



    },
    methods: {
      addreply(item){
        this.ruleForm.comment_id=item.comment_id.id;
        this.ruleForm.comContent='回复 '+item.rc_username+': ';
        this.ruleForm.addreply=true;
        },
      async getreplyist(){
        this.replyPageSize=this.replyPageSize+2;
        let {data}=await this.$apollo.mutate({mutation:replycommentsQuery,variables:{sort:'created_at:desc', limit: this.replyPageSize,start:0,where:{comment_id:{id:this.parentComment.id}}}});
        this.replycomments=data.replycomments
      },
    },
    apollo: {
      replycomments: {
        prefetch: true,
        query: replycommentsQuery,
        variables () {
          return { sort:'created_at:desc',limit: this.replyPageSize,start:0,where:{comment_id:{id:this.parentComment.id}} }
        }
      },
    }
  }
</script>

<style lang="scss" scoped>

 .gt-reply{
   margin-left: 2rem;
   background-color: #f8f8f8;
   .gt-comment{
     padding-left: 1rem;
   }
   .gt-comments{
     border-bottom: 1px solid $color-border;
     margin-bottom: 0;
   }
   .gt-comments:last-child{
     border-bottom: 0;
   }
 }
</style>
