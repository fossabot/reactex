// See https://medium.com/the-guild/implementing-a-runtime-version-of-jsx-78e004bf432e
interface NodeSharedField {
  type: string
  length: number // which represents the length of the sub-string in the code that the node occupies. This will help us trim the code string as we go with the parsing process so we can always focus on relevant parts of the string for the current node:
}

interface ElementNode extends NodeSharedField{
  type: 'element'
  name: string
  props: PropsNode
  children: (ElementNode | ValueNode)[]
}

interface PropsNode extends NodeSharedField {
  type: 'props'
  props: { [key: string]: ValueNode }
}

interface ValueNode extends NodeSharedField {
  type: 'value'
  value: string | boolean | number
}

const parseElement = (str: string) : ElementNode | ValueNode => {
  let match
  let length

  const node : ElementNode = {
    type: 'element',
    props: parseProps(''),
    children: [],
    length: 0,
    name: ''
  }

  match = str.match(/<(\w+)/)

  if(!match){
    str = str.split('<')[0]
    return parseValue(str)
  }

  node.name = match[1]
  length = match.index! + match[0].length
  str = str.slice(length)
  node.length += length

  match = str.match(/>/)
  if(!match)
    return node
  
  node.props = parseProps(str.slice(0, match.index))
  length = node.props.length
  str = str.slice(length)
  node.length += length

  match = str.match(/^ *\/ *>/)
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

  let child = parseElement(str)
  while(child.type === 'element' || (child.type === 'value' && child.value)) {
    length = child.length
    str = str.slice(length)
    node.length += length
    node.children.push(child)
    child = parseElement(str)
  }

  match = str.match(new RegExp(`</${node.name}>`))
  if(!match)
    return node
  
  node.length += match.index! + match[0].length

  return node
}

const parseProps = (str: string) => {
  let match

  const node: PropsNode = {
    type: 'props',
    length: 0,
    props: {
      
    }
  }

  const matchNextProp = () => str.match(/ *\w+="(?:.*[^\\]")?/) || str.match(/ *\w+/)

  match = matchNextProp()

  while(match){
    const propStr = match[0]!
    let [key, ...value] = propStr.split('=')
    node.length += propStr.length
    key = key.trim()
    let valueString = value.join('=')
    node.props[key] = {
      type: 'value',
      value: valueString ? valueString.slice(-1, 1) : true,
      length: 0 // TODO ?
    }
    str = str.slice(0, match.index) + str.slice(match.index! + propStr.length)

    match = matchNextProp()
  }

  return node
}

const parseValue = (str: string) => {
  const node : ValueNode = { 
    type: 'value',
    length: str.length,
    value: str.trim()
  }
  return node
}

export default parseElement