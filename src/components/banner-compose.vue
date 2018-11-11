<template lang='pug'>
  el-row(:gutter="30")
    el-col(:span="4").screens
      el-radio-group(v-model="locale")
        el-radio(label="en") en-US
        el-radio(label="zh") zh-CN
      ul
        li(
          v-for="(screen, index) in screens",
          :key="index",
          @click="currScreenIdx = index",
          :class="{'active': currScreenIdx === index}",
          :style="`background-image: url(${screen[locale].src})`"
        )
    el-col(:span="14").stage
      .info-bar {{screenResoution.width}}px * {{screenResoution.height}}
      .preview
        .virtual-screen(
          ref="virtualScreen",
          :style="`height:${virtualScreenHeight}px; background: url(${currScreen[locale].src}) no-repeat center/cover`"
        )
      .operation
        el-button(@click="addElement('button')") add button
        el-button(@click="addElement('text')") add text
        el-button(@click="addElement('image')") add image

    el-col(:span="6").props-panel
      P selected: {{currEditingUUID}}
      el-form(v-if="currNode")
        el-form-item(label="left")
          el-input(size="small", v-model="currNode.left")
        el-form-item(label="top")
          el-input(size="small", v-model="currNode.top")
        el-form-item(label="css")
          el-input(size="small", v-model="currNode.props.style")
        el-form-item(label="link")
          el-input(size="small")

</template>
<script>
import ElCol from "element-ui/lib/col.js";
import ElRow from "element-ui/lib/row.js";
import ElButton from "element-ui/lib/button";
import ElInput from "element-ui/lib/input";
import ElForm from "element-ui/lib/form";
import ElFormItem from "element-ui/lib/form-item";
import ElDialog from "element-ui/lib/dialog";
import ElSwitch from 'element-ui/lib/switch'
import ElRadioGroup from 'element-ui/lib/radio-group'
import ElRadio from 'element-ui/lib/radio'
import screenData from './_screens.js'
import Interact from 'interactjs'
import _throttle from 'lodash/throttle'

export default {
  name: "banner-compose",
  data() {
    return {
      showDialog: false,
      locale: "en",
      currEditingUUID: '',
      screens: screenData,
      screenResoution: {
        width: 1920,
        height: 1080
      },
      virtualScreenHeight: 400,
      currScreenIdx: 0
    };
  },
  components: {
    ElRow,
    ElCol,
    ElButton,
    ElForm,
    ElFormItem,
    ElDialog,
    ElSwitch,
    ElRadio,
    ElRadioGroup,
    ElInput
  },
  computed: {
    ratio() {
      return this.screenResoution.width / this.screenResoution.height;
    },
    currScreen() {
      if (!this.screens.length) return {};
      return this.screens[this.currScreenIdx];
    },
    currNode() {
      return this.findNode(this.currEditingUUID)
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    getVirtualScreenHeight() {
      var height = 0;
      const elem = this.$refs.virtualScreen;
      if (elem) {
        const actualWidth = parseFloat(getComputedStyle(elem).width);
        height = actualWidth / this.ratio;
      }
      this.virtualScreenHeight = height;
    },
    getContent() {
      this.$refs.virtualScreen.innerHTML = ''
      const typeMap = {
        button: "button",
        text: "span",
        image: "img"
      };
      let zIndex = 1;
      function _render(parentNode, data, locale) {
        const self = this
        zIndex++;
        let childrenArray = data.children;
        // 根节点渲染时, 会传入locale
        if (locale) {
          childrenArray = data[locale].children;
        }
        childrenArray.forEach(node => {
          const type = typeMap[node.type];
          const dom = document.createElement(type);
          //初始化样式
          dom.style.cssText =
            `
            position: absolute;
            top: ${node.top};
            left: ${node.left};
            padding: 20px;
            outline: 0;
            z-index: ${zIndex};
          ` + node.props.style;
          // 类样式
          dom.className = node.props.className + " " + node.uuid;
          // 设置interactjs
          parentNode.appendChild(dom);

          // 添加事件
          dom.addEventListener('mousedown', e => {
            this.currEditingUUID = node.uuid
            console.log(this.findNode(node.uuid))
          })

          // 初始化拖拽
          this.bindInteract(dom)

          if (Array.isArray(node.children) && node.children.length > 0) {
            _render(dom, node);
          }
          if (typeof node.children === "string") {
            dom.innerHTML = node.children;
          }
        });
      }
      _render.call(
        this,
        this.$refs.virtualScreen,
        this.currScreen,
        this.locale
      );
    },
    init() {
      setTimeout(() => {
        this.getVirtualScreenHeight();
        this.getContent();
        const self = this
        this.$refs.virtualScreen.addEventListener('click', function(e) {
          if (e.target.className === 'virtual-screen') {
            self.currEditingUUID = ''
          }
        })
      }, 100);
    },
    removeElement(uuid) {

    },
    addElement(type) {
      let elem;
      const uuid = Math.random().toString().replace('0.','')
      switch (type) {
        case "button":
          elem = {
            type: "button",
            uuid,
            top: "100px",
            left: "200px",
            props: {
              className: "banner-btn",
              css: "color: blue"
            },
            children: "请输入按钮文字"
          }
          break
        case "text":
          elem = {};
        case 'image':
          elem = {}
      }
      if (elem) {
        if (this.currNode ) {
          if (typeof this.currNode.children === 'string') {
            return alert('cannot add element to ' + this.currNode.type)
          }
          this.currNode.children.push(elem)
        } else if (this.currScreen) {
          this.currScreen[this.locale].children.push(elem)
        }
      }
    },
    bindInteract(dom) {
      const self = this
      Interact(dom).draggable({
        onmove: _throttle(function({ dx, dy }) {
          const node = self.findNode(self.currEditingUUID)
          node.top = parseFloat(node.top) + dy +'px'
          node.left = parseFloat(node.left) + dx + 'px'
        })
      })
    },
    //根据 uuid 获取node
    findNode(nodeId) {
      function walk(node) {
        if (Array.isArray(node)) {
          for (var  j =0; j < node.length; j++) {
            var t = walk(node[j])
            if (t) {return t}
          }
        } else if (node.uuid == nodeId) {
          return node
        } else if (Array.isArray(node.children)) {
          return walk(node.children)
        }
      }
      for (let i = 0; i < this.screens.length; i++) {
        const currLocaleScreen = this.screens[i][this.locale]
        const t = walk(currLocaleScreen)
        if (t) { return t }
      }
    }
  },
  watch: {
    currScreen: {
      handler: function (val) {
        if (Object.keys(val).length) {
          this.getContent();
        }
      },
      deep: true
    },

    locale() {
      this.getContent();
    }
  }
};
</script>
<style lang='stylus'>
.banner-compose
  .el-dialog
    width: 100% !important
    height: 100% !important
    left: 0 !important
    top: 0 !important
    transform: translate3d(0,0,0)
    background: #fff
    margin-bottom: 0
    .el-dialog__body
      overflow: auto
    .el-input
      width: 50px !important
</style>
<style lang="stylus" scoped>
.screens
  min-height: calc(100vh - 150px)
  border: 1px solid
  li
    box-sizing: border-box
    margin: 20px
    height: 90px
    border: 1px solid #ddd
    background-size: cover
    background-position: center
    &.active
      border-color: red
.stage
  min-height: 500px
  border: 1px solid
  .info-bar
    text-align: center
  .preview
    padding: 20px
    .virtual-screen
      transition: all 300ms ease-out
      border: 2px solid #ddd
      position: relative
.props-panel
  border: 1px solid
  padding: 10px
</style>