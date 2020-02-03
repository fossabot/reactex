//import React from 'react'
import parse, { ProgramNode } from './parser'

export const toStringArray = (s: string): string[] => {
  const re = /\${(\w+)}/
  const stringList = []
  const argList = []
  let m;
  let currentIndex = 0
  do {
      m = re.exec(s);
      if (m) {
          stringList.push(s.slice(currentIndex, m.index))
          argList.push(m[1])
          currentIndex = m.index + m.length
      }
  } while (m);
  stringList.push(s.slice(currentIndex))
  
  return stringList
}

const parseStringArray = (splits: string) => {
  const root = parse(splits)
  return createReactElement(root)
}

export const reactex = (s: string) => {
  return parseStringArray(s)
}

// TODO
export const jsxtex = (splits: TemplateStringsArray) => {
  const l = splits.raw.map(s => s).join('')
  return parseStringArray(l)
}

// TODO: any
const createReactElement = (node: ProgramNode) : any => {
  console.log('NODE')
  console.log(JSON.stringify(node, null, 2))
  
  /*if(node.type === 'value'){
    return (node as ValueNode).value
  }

  const element = node as ElementNode
  console.log('ELEMENT')
  console.log(JSON.stringify(element, null, 2))
  let children 
  if(element.children.length > 1)
    children = element.children.map(createReactElement)
  else if(element.children.length === 1){
    const child = element.children[0]
    if(child.type === 'value')
      children = createReactElement(child)
    else
      children = [createReactElement(child)]
  }
  return React.createElement(element.tag!, element.props.props, children)*/
}