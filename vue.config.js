
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const CLOUD_BASE_FOLDER = 'cloud-functions'

module.exports = {
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.join(__dirname, CLOUD_BASE_FOLDER),
          to: path.join(__dirname, 'unpackage/dist',
            process.env.NODE_ENV === 'production' ? 'build' : 'dev', process.env.UNI_PLATFORM, CLOUD_BASE_FOLDER)
        }
      ])
    ]
  }
}
