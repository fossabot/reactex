import React from 'react'
import parseElement, {placeholder, ElementNode, ValueNode} from './parser'

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

const parseStringArray = (splits: string[], ...values: any[]) => {
  const root = parseElement(splits.join(placeholder), values) as ElementNode
  return createReactElement(root)
}

export const reactex = (s: string, ...values: any[]) => {
  return parseStringArray(toStringArray(s), values)
}

export const jsxtex = (splits: TemplateStringsArray, ...values: any[]) => {
  const l = splits.raw.map(s => s)
  return parseStringArray(l, ...values)
}

// TODO: any
const createReactElement = (node: ElementNode | ValueNode) : any => {
  console.log(node)
  if(node.type === 'value'){
    return (node as ValueNode).value
  }

  const element = node as ElementNode

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
  return React.createElement(element.tag!, element.props.props, children)
}