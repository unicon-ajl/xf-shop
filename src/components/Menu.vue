<template>
  <div>
    <van-grid :column-num="5" :border="false">
      <van-grid-item
        v-for="item in MenuImgs"
        :key="item.picUrl"
        :icon="item.picUrl"
        :text="item.title"
        to="/categary"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: "Menu",
  components: {},
  data() {
    return {
        MenuImgs:[
        {picUrl:"http://s.weituibao.com/1583585285461/cs.png",title:"小熊超市"},
        {picUrl:"http://s.weituibao.com/1583585285468/fs.png",title:"小熊服饰"},
        {picUrl:"http://s.weituibao.com/1583585285470/qq.png",title:"全球购"},
        {picUrl:"http://s.weituibao.com/1583585285472/sx.png",title:"小熊生鲜"},
        {picUrl:"http://s.weituibao.com/1583585285467/dj.png",title:"邮寄到家"},
        {picUrl:"http://s.weituibao.com/1583585285465/cz.png",title:"充值缴费"},
        {picUrl:"http://s.weituibao.com/1583585285469/pt.png",title:"9.9元拼"},
        {picUrl:"http://s.weituibao.com/1583585285468/juan.png",title:"领券"},
        {picUrl:"http://s.weituibao.com/1583585285471/sq.png",title:"省钱"},
        {picUrl:"http://s.weituibao.com/1583585285470/qb.png",title:"全部"},
      ],
    };
  },
  methods: {},
};
</script>

<style scoped lang="less">
</style>