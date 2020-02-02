export default class LatexDocument {
  preambleLines: string[]
  contentLines: string[]
  shouldStartNewContentLine: boolean

  constructor() {
    this.preambleLines = []
    this.contentLines = []
    this.shouldStartNewContentLine = false
  }

  addPreambleLine(line: string){
    this.preambleLines.push(line)
  }

  addContentLine(line: string, startNewLine: boolean = false){
    this.contentLines.push(line)
    this.shouldStartNewContentLine = startNewLine
  }

  addContent(content: string){
    if(this.contentLines.length === 0){
      this.contentLines.push(content)
    } else {
      if(this.shouldStartNewContentLine)
        this.contentLines.push('')
      this.contentLines[this.contentLines.length - 1] += content
    }
    this.shouldStartNewContentLine = false
  }

  toString(){
    return this.preambleLines.join('\n') + this.contentLines.join('\n')
  }

}