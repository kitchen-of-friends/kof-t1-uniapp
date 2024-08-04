const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  transpileDependencies: ["@dcloudio/uni-ui"],
  // configureWebpack: {
  //   plugins: [
  //     // new CompressionWebpackPlugin(),
  //     new BundleAnalyzerPlugin({
  //       openAnalyzer: true,
  //       analyzerPort: 8889,
  //     }),
  //   ],
  // },
};
