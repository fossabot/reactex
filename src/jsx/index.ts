import React from 'react'
import parseElement, {placeholder, ElementNode, ValueNode} from './parser'

export const jsx = (splits: TemplateStringsArray, ...values: any[]) => {
  const root = parseElement(splits.join(placeholder), values) as ElementNode
  return createReactElement(root)
}

// TODO: any
const createReactElement = (node: ElementNode | ValueNode) : any => {
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

export default jsx