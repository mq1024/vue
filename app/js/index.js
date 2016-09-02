Vue.component('count-down', {
  props: {
    time: { //倒计时总时间
      type: Number,
      default: 60,

    },
    normalText: { //常规状态下文字
      type: String,
      default: "获取验证码"
    },
    waitingText: { //倒计时等待时提示文字
      type: String,
      default: "重新获取"
    },
    active: { //按钮是否可用
      type: Boolean,
      default: false
    }
  },
  template: '#countdown-template',
  data: function() {
    return {
      current: 0
    }
  },
  methods: {
    clickBtn: function() {
      this.$dispatch('ready');
    },
    reduceOne: function() {
      var _this = this;
      this.current--;
      if (this.current > 0) {
        setTimeout(_this.reduceOne, 1000);
      }

    }
  },
  events: {
    "ready": function() {
      this.current = this.time;
      this.reduceOne();
    }
  }

});

var vue = new Vue({
  el: '#app'
});
