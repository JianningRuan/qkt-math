<template>
  <div class="comment-wrapper">
    <BaseNone class="mt" v-if="summaryList.length === 0">
      <p slot="tips">暂无评论</p>
    </BaseNone>
    <!--评论-->
    <div class="comment flex pt pb pl" v-for="(summary, index) in summaryArr" :key="summary.id" :id="setDiveId(summary)">
      <div class="comment-head-pic">
        <img :src="summary.userIcon || './images/stu-head.png'" />
      </div>
      <div class="comment-cont flex1">
        <div class="comment-box pr">
          <div class="comment-name">{{summary.userName}}<span class="fr">发布于{{summary.createTimestamp | fromNow}}</span></div>
          <div class="study-time">已坚持学习{{summary.signInCount}}天</div>
          <div class="comment-msg" v-html="returnToEnter(summary.comment)"></div>
          <div class="comment-pic" v-for="(pic, pIndex) in summary.picList" :key="pIndex">
            <img :src="pic.pic" @click="imgClick(pic.pic)" />
          </div>
          <div class="comment-opa flex">
            <span class="opa-btn mr" @click="like(summary, index)"><svg-icon :icon-class="summary.isLike ? 'like-filled' : 'like'"><!-- :class="[summary.userIsLike ? 'orange-color' : '']"--></svg-icon>{{summary.likeCount}}</span>
            <span class="opa-btn mr" @click="reply(summary, index)"><svg-icon icon-class="msg"></svg-icon><em class="icon icon-message"></em>回复</span>
          </div>
        </div>
        <div class="comment-reply-wrapper" v-if="summary.answerList !== null">
          <div class="comment-reply" v-for="reply in summary.answerList" :key="reply.id">
            <div class="comment-name">{{reply.userName}}<span class="ml">发布于{{reply.createTimestamp | fromNow}}</span></div>
            <div class="comment-msg" v-html="returnToEnter(reply.comment)"></div>
            <div class="comment-pic" v-for="(quotePic, qIndex) in reply.quotePicList" :key="qIndex">
              <img :src="quotePic.pic" @click="imgClick(quotePic.pic)" />
            </div>
          </div>
        </div>
        <a class="more" v-if="summary.quoteCount > 2" @click="showMoreReply(summary, index)">共{{summary.quoteCount}}条回复<svg-icon icon-class="right"></svg-icon></a>
      </div>
    </div>
    <!--评论-end-->
  </div>
</template>
<script>
import { ImagePreview } from 'vant'
export default {
  name: 'BaseReplyList',
  props: {
    summaryList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {}
  },
  components: {},
  created () {},
  mounted () {},
  activated () {},
  watch: {},
  computed: {
    summaryArr () {
      this.summaryList.forEach((summary) => {
        if (summary.showMore === undefined) {
          summary.showMore = false
        }
      })
      return this.summaryList
    }
  },
  filters: {},
  methods: {
    setDiveId (summary) {
      return `topic${summary.id}`
    },
    imgClick (pic) {
      ImagePreview([pic])
    },
    // 回车换行符转化
    returnToEnter (content) {
      return content.replace('\n', '<br/>')
    },
    // 点赞
    like (summary, index) {
      this.$emit('like', summary, index)
    },
    // 回复
    reply (summary, index) {
      this.$emit('reply', summary, index)
    },
    showMoreReply (summary, index) {
      this.$emit('showMoreReply', summary, index)
    }
  }
}
</script>
<style lang="scss" scoped type="text/css" src="./BaseReplyList.scss"></style>
