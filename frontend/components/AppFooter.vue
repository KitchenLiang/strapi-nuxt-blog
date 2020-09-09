<template>
  <footer class="footer">
    <div class="copyright">
        <div class="copyright-text">Copyright © 2020 {{blogSetting.title}} All Rights Reserved</div>
        <div class="copyright-text" v-html="blogSetting.beian"></div>
      </div>
    <el-backtop></el-backtop>
  </footer>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'AppFooter',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['blogSetting']),
  },
  mounted () {

  },
  methods: {

  }
}
</script>
<style lang="scss">
.footer {
  padding: 1rem 0;
  transition: .5s;
  color: #999;

  &.is-show-menu {
    transform: translateX(-240px);
  }

  &.is-error {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
}

.link-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #3b424a;
  line-height: 2;

  &:after {
    content: "";
    flex: auto;
  }


}

.copyright {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: $font-size-small;
    flex-direction: column;
  .footer-menu {
    display: flex;
    flex-wrap: wrap;

    .list {
      margin-right: 15px;
      line-height: 1.8;

      a {
        padding-right: 15px;
        border-right: 1px solid #666;
        font-size: $font-size-base;
      }

      &:last-child {
        a {
          border: 0;
        }
      }
    }
  }

  img {
    vertical-align: baseline;
  }

  .right {
    align-self: flex-end;
  }
}
.copyright-text{
  text-align: center;
  a{
    color: #999;
    &:hover {
      color: $color-theme;
    }
  }
}


@media screen and (max-width:1024px) {
  .copyright {
    flex-wrap: wrap;
  }

  .left {
    width: 100%;
  }

  .right {
    width: 100%;
    margin-top: $container-margin;
    text-align: right;
  }
}
</style>
