/**
 * This script copies src/index.html into build/index.html
 * This is a good example of using Node and cheerio to do a simple file transformation.
 * It might be useful when we only want to do smth. specific in the built production code.
 */
import FileSystem from 'fs'
import Path from 'path'

export default class WebpackHtmlGenerator {
  apply(compiler) {
    compiler.plugin('done', (stats) => {
      if (!stats.errors) {
        const html = FileSystem.readFileSync(Path.join(__dirname, 'public', 'template.html'), 'utf8')
        const htmlOutput = html.replace('[hash]', stats.hash)
        FileSystem.writeFileSync(Path.join(__dirname, 'public', 'index.html'), htmlOutput)
      }
    })
  }
}
