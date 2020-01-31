export default class LatexDocument {
  preambleLines: string[]
  contentLines: string[]

  constructor() {
    this.preambleLines = []
    this.contentLines = []
  }

  addPreambleLine(line: string){
    this.preambleLines.push(line)
  }

  addContentLine(line: string){
    this.contentLines.push(line)
  }

  toString(){
    return this.preambleLines.join('\n') + this.contentLines.join('\n')
  }

}