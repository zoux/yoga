const path = require('path')

module.exports = {
  css: { extract: false }, // 打包的样式强制内联
  pages: newPages([
    'scroll',
    'test'
  ]),
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.resolve('examples'))
      .set('~', path.resolve('packages'))

    // dist / docs 不需要 eslint 检查
    config.module.rule('eslint')
      .exclude.add(path.resolve('dist')).end()
      .exclude.add(path.resolve('docs')).end()

    // packages 和 examples 目录需要加入编译
    config.module.rule('js')
      .include.add(/packages/).end()
      .include.add(/examples/).end()
  }
}

function newPages (nameList = []) {
  const pages = {}
  nameList.forEach(name => {
    pages[name] = {
      entry: `examples/${name}/main.js`,
      template: 'public/index.html',
      filename: `${name}.html`
    }
  })
  return pages
}
