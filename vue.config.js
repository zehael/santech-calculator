const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            "primary-color": "#ffc900",
            "link-color": "#ffc900",
            "border-radius-base": "8px",
          },
          javascriptEnabled: true,
        },
        additionalData: `
          @import "@/styles/vars.less";
        `,
      },
    },
  },
});
