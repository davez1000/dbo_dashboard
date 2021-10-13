module.exports = {
  filenameHashing: false,
  configureWebpack: {
    output: {
      filename: 'js/app.9fc6bd2c.js'
    },
    optimization: {
      splitChunks: false
    },
    performance: {
      hints: process.env.NODE_ENV === 'production' ? "warning" : false
    },
    devServer: {
      port: 3000,
      headers: {
        // Also need to add to Apache headers for local-dev, to allow CORS.
        "Access-Control-Allow-Origin": "*"
      }
    }
  }
}
