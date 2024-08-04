<template>
  <view class="zero-markdown-view">
    <mp-html
      :key="mpkey"
      :selectable="selectable"
      :scroll-table="scrollTable"
      :tag-style="tagStyle"
      :markdown="true"
      :content="html"
      @linktap="onLinkTap"
    >
    </mp-html>
  </view>
</template>

<script>
import mpHtml from "../mp-html/mp-html";

export default {
  name: "zero-markdown-view",
  components: {
    mpHtml,
  },
  props: {
    markdown: {
      type: String,
      default: "",
    },
    selectable: {
      type: [Boolean, String],
      default: true,
    },
    scrollTable: {
      type: Boolean,
      default: true,
    },
    themeColor: {
      type: String,
      default: "#1D2939",
    },
    codeBgColor: {
      type: String,
      default: "#2d2d2d",
    },
  },
  data() {
    return {
      html: "",
      tagStyle: "",
      mpkey: "zero",
    };
  },
  watch: {
    markdown: function (val) {
      this.html = this.markdown;
    },
  },
  created() {
    this.initTagStyle();
  },
  mounted() {
    this.html = this.markdown;
  },
  methods: {
    initTagStyle() {
      const themeColor = this.themeColor;
      const codeBgColor = this.codeBgColor;
      let zeroStyle = {
        p: `
				margin:0px;
				font-size: 14px;
				line-height:1.75;
				letter-spacing:0em;
				word-spacing:0.1em;
        white-space: pre-wrap;
				`,
        // 一级标题
        h1: `
				margin:25px 0;
				font-size: 24px;
			
				font-weight: bold;
				color: ${themeColor};
				padding:3px 10px 1px;
				border-bottom: 2px solid ${themeColor};
				border-top-right-radius:3px;
				border-top-left-radius:3px;
				`,
        // 二级标题
        h2: `
				margin:40px 0 20px 0;	
				font-size: 20px;
			
				color:${themeColor};
				font-weight:bolder;
				padding-left:10px;
				// border:1px solid ${themeColor};
				`,
        // 三级标题
        h3: `
				margin:30px 0 10px 0;
				font-size: 18px;
				color: ${themeColor};
				padding-left:10px;
				border-left:3px solid ${themeColor};
				`,
        // 引用
        blockquote: `
				margin:15px 0;
				font-size:15px;
				color: #777777;
				border-left: 4px solid #dddddd;
				padding: 0 10px;
				 `,
        // 列表
        ul: `
				margin: 10px 0;
				color: #555;
				`,
        li: `
				margin: 5px 0;
				color: #555;
				`,
        // 链接
        a: `
				// color: ${themeColor};
				`,
        // 加粗
        strong: `
				font-weight: border;
				color: ${themeColor};
				`,
        // 斜体
        em: `
				color: ${themeColor};
				letter-spacing:0.3em;
				`,
        // 分割线
        hr: `
				height:1px;
				padding:0;
				border:none;
				// border-top:medium solid #333;
				text-align:center;
				background-image:linear-gradient(to right,rgba(248,57,41,0),${themeColor},rgba(248,57,41,0));
				`,
        // 表格
        table: `
				border-spacing:0;
				overflow:auto;
				min-width:100%;
				margin:10px 0;
				border-collapse: collapse;
				`,
        th: `
				border: 1px solid #202121;
				color: #555;
				`,
        td: `
				color:#555;
				border: 1px solid #555555;
				`,
        pre: `
				border-radius: 5px;
				white-space: pre;
				background: ${codeBgColor};
				font-size:12px;
				position: relative;
				`,
      };
      this.tagStyle = zeroStyle;
    },
    onLinkTap(e) {
      console.log(e.href);
      const href = e.href;
      if (href) {
        if (
          href.endsWith(".pdf") ||
          href.endsWith(".doc") ||
          href.endsWith(".docx")
        ) {
          // 下载并打开文档
          wx.downloadFile({
            url: href,
            success: function (res) {
              var filePath = res.tempFilePath;
              wx.openDocument({
                filePath: filePath,
                showMenu: true,
                success: function (res) {
                  console.log("打开文档成功");
                },
              });
            },
            fail: function (err) {
              console.error("下载文件失败", err);
            },
          });
        } else if (href.includes("://")) {
          // 打开外链
          uni.setClipboardData({
            data: href,
          });
          uni.showModal({
            content: "已自动复制网址，请在手机浏览器里粘贴该网址",
            showCancel: false,
          });
        } else {
          // 内部链接跳转
          wx.navigateTo({
            url: href,
            fail() {
              wx.switchTab({
                url: href,
              });
            },
          });
        }
      }
    },
  },
};
</script>

<style lang="scss">
.zero-markdown-view {
  position: relative;
}
</style>
