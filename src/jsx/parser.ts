const acorn = require('acorn');

// See https://github.com/facebook/jsx
// And https://github.com/facebook/jsx/blob/master/AST.md
export interface Node {
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
  type: 'ObjectExpression'
  properties: Property[]
}

export interface ArrayExpression extends Node {
  type: 'ArrayExpression'
  elements: (Literal | ArrayExpression | ObjectExpression)[]
}

export interface JSXExpressionContainer extends Node {
  type: 'JSXExpressionContainer'
  expression: ArrayExpression | Literal | ObjectExpression
}

export interface JSXAttribute extends Node {
  type: 'JSXAttribute'
  name: JSXIdentifier
  value: Literal | null | JSXExpressionContainer
}

export interface JSXOpeningElement extends Node  {
  type: 'JSXOpeningElement'
  attributes: JSXAttribute[]
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

export interface Program extends Node {
  type: 'Program'
  body: ExpressionStatement[]
  sourceType: 'script'
}

const parse = (s: string) : Program => acorn.Parser.extend(require("acorn-jsx")()).parse(s)

export default parse