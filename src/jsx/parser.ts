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

const parseElement = (str: string, values: any[]) : ElementNode | ValueNode[] => {
  let match
  let length

  const node : ElementNode = {
    type: 'element',
    props: parseProps('', []),
    children: [],
    length: 0,
    name: ''
  }

  match = str.match(/^ *<(\w+)/) // Added ^ * here, different from example
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

  match = str.match(/^ *\/ *>/) // Check if opening tag is also closing tag
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
    return elems.concat(parsed)
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

const parseProps = (str: string, values: any[]) => {
  const node: PropsNode = {
    type: 'props',
    length: 0,
    props: {}
  }

  const matchNextProp = () => 
    str.match(/ *\w+="(?:.*[^\\]")?/) ||
    str.match(new RegExp(` *\\w+=${placeholder}`)) ||
    str.match(/ *\w+/)

  let match = matchNextProp()
  while(match){
    const propStr = match[0]!
    let [key, ...value] = propStr.split('=')
    node.length += propStr.length
    key = key.trim()
    let valueString = value.join('=')
    node.props[key] = (valueString === placeholder) ? values.shift() : (valueString ? valueString.slice(1, valueString.length - 1) : true) // Fix the slicing
    str = str.slice(0, match.index) + str.slice(match.index! + propStr.length)

    match = matchNextProp()
  }

  return node
}

const parseValues = (str: string, values: any[]) : ValueNode[] => {
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

export default parseElement