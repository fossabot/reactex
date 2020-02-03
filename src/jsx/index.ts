import React from 'react'
import parse, { Program, Node, ExpressionStatement, JSXElement, JSXAttribute, JSXIdentifier, Literal, JSXExpressionContainer, ArrayExpression, ObjectExpression, JSXText } from './parser'

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

const parsePropValue = (value: JSXAttribute['value'] | JSXExpressionContainer['expression']) : any => {
  if(!value)
      return true
  else
    switch (value.type){
      case 'Literal':
        const literal = value as Literal
        return literal.value
      case 'JSXExpressionContainer':
        const container = value as JSXExpressionContainer
        return parsePropValue(container.expression)
      case 'ArrayExpression':
        const arrayExpression = value as ArrayExpression
        return arrayExpression.elements.map(e => parsePropValue(e))
      case 'ObjectExpression':
        const objectExpression = value as ObjectExpression
        return objectExpression.properties.reduce((acc, property) => {
          acc[property.key.name] = parsePropValue(property.value)
          return acc
        }, {})
      default:
        throw new Error(`Unknown prop value type ${(value as Node).type}`)
    }
}

const parseProps = (attributes: JSXAttribute[]) => {
  const props: object = {}
  attributes.forEach(a => {
    const name = parseName(a.name)
    props[name] = parsePropValue(a.value)
  })

  return props
}

const parseName = (name: JSXIdentifier) => {
  switch(name.type){
    case 'JSXIdentifier':
      return name.name
    default:
      throw new Error(`Unknown name type: ${name.type}`)
  }
}

// TODO: any
const createReactElement = (node: Node) : any => {
  //console.log('NODE')
  //console.log(JSON.stringify(node, null, 2))
  
  switch(node.type){
    case 'Program':
      const program = node as Program
      return createReactElement(program.body[0])
    case 'ExpressionStatement':
      const {expression} = node as ExpressionStatement
      return createReactElement(expression)
    case 'JSXElement':
      const { openingElement, children } = node as JSXElement
      const props = parseProps(openingElement.attributes)
      const name = parseName(openingElement.name)

      const filteredChildren = children.filter(child => {
          return !(child.type === 'JSXText' &&
                 child.value.match(/^[ \t]*[\r\n][ \t\r\n]*$/));
      });

      let elementChildren 
      if(filteredChildren.length > 1)
        elementChildren = filteredChildren.map(createReactElement)
      else if(filteredChildren.length === 1){
        const child = filteredChildren[0]
        if(child.type === 'JSXText')
          elementChildren = createReactElement(child)
        else
          elementChildren = [createReactElement(child)]
      }
      
      return React.createElement(name, props, elementChildren)
    case 'JSXText':
      const text = node as JSXText
      // See https://github.com/facebook/react/pull/480/files for whitespace rules
      // Also see https://github.com/facebook/jsx/issues/40
      // And https://github.com/facebook/jsx/issues/6
      // Ideas taken from https://github.com/facebook/react/blob/c16b5659a0323572b2cd404f6356c7b38e38b038/vendor/fbtransform/transforms/xjs.js#L152
      const lines = text.value.split(/\r\n|\n|\r/);
      let lastNonEmptyLine = 0;
      lines.forEach((line, index) => {
        if (line.match(/[^ \t]/)) {
          lastNonEmptyLine = index;
        }
      })
      
      let state = ''
    
      lines.forEach((line, index) => {
        const isFirstLine = index === 0
        const isLastLine = index === lines.length - 1
        const isLastNonEmptyLine = index === lastNonEmptyLine

        // replace rendered whitespace tabs with spaces
        let trimmedLine = line.replace(/\t/g, ' ');

        // trim whitespace touching a newline
        if (!isFirstLine) {
          trimmedLine = trimmedLine.replace(/^[ ]+/, '');
        }
        if (!isLastLine) {
          trimmedLine = trimmedLine.replace(/[ ]+$/, '');
        }

        if (trimmedLine || isLastNonEmptyLine) {          
          state += trimmedLine + (!isLastNonEmptyLine ? ' ' : '')     
        }
    });

      return state
    default:
      throw new Error(`Unknown node type ${node.type}`)
  }
}