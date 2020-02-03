const acorn = require('acorn');

interface Node {
  type: string
  start: number
  end: number
}

export interface JSXName extends Node {
}

export interface JSXIdentifier extends JSXName {
  type: 'JSXIdentifier' //| 'JSXNamespacedName' | 'JSXMemberExpression'
  name: string
}

export interface Literal extends Node {
  type: 'Literal'
  value: string | number
  raw: string
}

export interface Identifier extends Node {
  type: 'Identifier'
  name: string
}

export interface Property extends Node {
  type: 'Property'
  method: boolean
  shorthand: boolean
  computed: boolean
  key: Identifier
  value: Literal
  kind: 'init'
}

export interface ObjectExpression extends Node {
  type: 'ArrayExpression'
  properties: Property[]
}

export interface ArrayExpression extends Node {
  type: 'ArrayExpression'
  elements: (Literal)[]
}

export interface JSXExpressionContainer extends Node {
  type: 'JSXExpressionContainer'
  expression: ArrayExpression | Literal
}

export interface JSXAttribute extends Node {
  type: 'JSXAttribute'
  name: JSXIdentifier
  value: Literal | null | JSXExpressionContainer
}

export interface JSXOpeningElement extends Node  {
  type: 'JSXOpeningElement'
  attributes: never[]
  name: JSXIdentifier
  selfClosing: boolean
}

export interface JSXClosingElement extends Node  {
  type: 'JSXClosingElement'
  name: JSXIdentifier
}

export interface JSXText extends Node {
  type: 'JSXText'
  value: string
  raw: string
}

export interface JSXElement extends Node  {
  type: 'JSXElement'
  openingElement: JSXOpeningElement
  closingElement: null | JSXClosingElement
  children: (JSXElement | JSXText)[]
}

export interface ExpressionStatement extends Node {
  type: 'ExpressionStatement'
  expression: JSXElement
}

export interface ProgramNode extends Node {
  type: 'Program'
  body: ExpressionStatement[]
  sourceType: 'script'
}

const parse = (s: string) : ProgramNode => acorn.Parser.extend(require("acorn-jsx")()).parse(s)


// See https://medium.com/the-guild/implementing-a-runtime-version-of-jsx-78e004bf432e
interface NodeSharedField {
  type: string
  length: number // which represents the length of the sub-string in the code that the node occupies. This will help us trim the code string as we go with the parsing process so we can always focus on relevant parts of the string for the current node:
}

export interface ElementNode extends NodeSharedField{
  type: 'element'
  name: string
  props: PropsNode
  children: (ElementNode | ValueNode)[]
  tag?: string
}

export interface PropsNode extends NodeSharedField {
  type: 'props'
  props: { [key: string]: string | boolean | number }
}

export interface ValueNode extends NodeSharedField {
  type: 'value'
  value: string | boolean | number
}

export type JSXNode = ElementNode | PropsNode | ValueNode

export const placeholder = `__jsxPlaceholder${Date.now()}` // Note how I used the Date.now() function to define a postfix for the placeholder. This we can be sure that the same value won't be given by the user as a string (possible, very unlikely).

const parseElement = (str: string, ...values: any[]) : ElementNode | ValueNode[] => {
  let match
  let length

  const node : ElementNode = {
    type: 'element',
    props: parseProps('', []),
    children: [],
    length: 0,
    name: ''
  }

  match = str.match(/^[\n ]*<(\w+)/) // Added ^ * here, different from example
  if(!match){
    str = str.split('<')[0]
    return parseValues(str, values)
  }

  node.name = match[1]
  node.tag = node.name === placeholder ? values.shift() : node.name
  length = match.index! + match[0].length
  str = str.slice(length)
  node.length += length
  match = str.match(/>/)
  if(!match)
    return node

  node.props = parseProps(str.slice(0, match.index), values)
  length = node.props.length
  str = str.slice(length)
  node.length += length

  match = str.match(/^[\n ]*\/[\n ]*>/) // Check if opening tag is also closing tag
  if(match){
    node.length += match.index! + match[0].length
    return node
  }

  match = str.match(/>/)
  if(!match)
    return node
  
  length = match.index! + 1
  str = str.slice(length)
  node.length += length

  let children = []
  const parseNextChildren = () => {
    const parsed = parseElement(str, values)
    let elems: (ElementNode | ValueNode)[] = []
    console.log('concat')
    console.log(JSON.stringify(elems.concat(parsed), null, 2))
    return elems.concat(parsed)
    /*if((parsed as ElementNode).type === 'element'){
      return elems.concat(parsed)
    } else {
      return elems.concat(...(parsed as ValueNode[]))
    }*/   
  } 

  children = parseNextChildren()
  while(children.length){
    children.forEach((child) => {
      length = child.length
      str = str.slice(length)
      node.length += length
      if(child.type === 'element' || (child.type === 'value' && child.value))
        node.children.push(child)
    })
    children = parseNextChildren()
  }

  match = str.match(new RegExp(`</${node.name}>`))
  if(!match)
    return node
  
  node.length += match.index! + match[0].length

  if(node.name === placeholder) {
    const value = values.shift()
    if(value !== node.tag)
      return node
  }

  return node
}

const parseProps = (str: string, ...values: any[]) => {
  const node: PropsNode = {
    type: 'props',
    length: 0,
    props: {}
  }

  const matchNextProp = () => 
    str.match(/ *\w+="(?:[^"]|[^\\]")*"/) || // Changed this regex
    str.match(new RegExp(` *\\w+=${placeholder}`)) ||
    str.match(/ *\w+/)

  let match = matchNextProp()
  while(match){
    console.log(match)
    const propStr = match[0]!
    let [key, ...value] = propStr.split('=')
    node.length += propStr.length
    key = key.trim()
    let valueString = value.join('=')
    node.props[key] = (valueString === placeholder) ? values.shift() : (valueString ? valueString.slice(1, valueString.length - 1) : true) // Fix the slicing
    str = str.slice(0, match.index) + str.slice(match.index! + propStr.length)
    console.log(node.props)
    match = matchNextProp()
  }

  return node
}

const parseValues = (str: string, ...values: any[]) : ValueNode[] => {
  const nodes : ValueNode[] = []

  str.split(placeholder).forEach((split, index, splits) => {
    let value = split
    let length = split.length
    str = str.slice(length)

    if(length){
      nodes.push({
        type: 'value',
        length,
        value,
      })
    }

    if(index === splits.length - 1) return

    value = values.pop()
    length = placeholder.length

    if(typeof value === 'string'){
      value = value.trim()
    }

    nodes.push({
      type: 'value',
      length,
      value,
    })

  })

  return nodes
}

export default parse