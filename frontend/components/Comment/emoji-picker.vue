<template>
  <el-popover popper-class="p-0" placement="bottom-start" width="340" trigger="click">
      <div class="face-container">
        <div class="scroll-wrapper">
          <div class="face-content" @touchmove.prevent ref="faceContent">
            <div class="face-page">
              <a v-for="(item, j) in faces" :key="j" @click="onFaceClick(item.value)">
                <img :src="item.src" width="20" height="20" :title="item.value"/>
              </a>
            </div>
          </div>
        </div>
        <div class="face-footer">
          <div class="footer-title">
            <a
              v-for="(faceList, index) in faceData"
              @click="onTypeClick(index)"
              :class="index === faceIndex ? 'active' : ''"
              :key="index"
            >
              <img :src="faceList.faceList[0].src" width="20" height="20" />
            </a>
          </div>
        </div>
      </div>
      <svg
        class="Zi--Emotion"
        fill="currentColor"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        slot="reference"
      >
        <path
          d="M7.523 13.5h8.954c-.228 2.47-2.145 4-4.477 4-2.332 0-4.25-1.53-4.477-4zM12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18zm0-1.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm-3-8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
        />
      </svg>
    </el-popover>
</template>

<script>
import faceJSON from "./face.json";
export default {
  data: () => ({
    faceData: faceJSON,
    faceIndex: 0
  }),
  computed: {
    faces: function() {
      const { faceData, faceIndex } = this;
      const list = faceData[faceIndex].faceList;
      return list;
    }
  },
  mounted() {
    const el = this.$refs.faceContent;
    let x1 = 0;
    let x2 = 0;
    el.ontouchstart = evt => {
      x1 = evt.targetTouches[0].pageX;
    };
    el.ontouchend = evt => {
      x2 = evt.changedTouches[0].pageX;
      if (x2 - x1 > 50) {
        this.active !== 0 && this.active--;
      } else if (x2 - x1 < -50) {
        this.active !== this.faces.length - 1 && this.active++;
      }
    };
  },
  methods: {
    onTypeClick(index) {
      this.faceIndex = index;
      this.active = 0;
    },
    onFaceClick(face) {
      this.$emit("onFaceChoose", face);
    }
  }
};
</script>

<style lang="scss" scoped>
.Zi--Emotion{
  vertical-align: middle;
}
.face-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  .scroll-wrapper {
    width: 100%;
    height: 157px;
    position: relative;
    .face-content {
      height: 100%;
      overflow-y: auto;
      transition: margin-left 0.5s;
      .face-page {
        width: 100%;
        height: 140px;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        a {
          width: 2rem;
          height: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          border-radius: 4px;
        }
        a:hover{
          background-color: #ddd;
        }
      }
    }
    .page-dot {
      position: absolute;
      bottom: 10px;
      width: 100%;
      display: flex;
      justify-content: center;
      .dot-item {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #cccccc;
        margin: 0 3px;
      }
      .dot-item.active {
        background: #ff8140;
      }
    }
  }
  .face-footer {
    position: relative;
    width: 100%;
    height: 36px;
    overflow-x: auto;
    .footer-title {
      width: 280px;
      height: 100%;
      overflow-x: auto;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      a {
        height: 100%;
        width: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      a.active {
        background: #e9e9e9;
      }
    }
  }
}

</style>

