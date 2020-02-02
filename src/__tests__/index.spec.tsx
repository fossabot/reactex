import React from "react"
import { renderToString } from '..'

test('SimpleRender', () => {
  console.log(renderToString(<tex_document></tex_document>))
})

test('SimpleRender2', () => {
  console.log(renderToString(<tex_document>Test</tex_document>))
})

test('SimpleRender3', () => {
  console.log(renderToString(<tex_document><tex_text>Test</tex_text></tex_document>))
})

test('SimpleRender4', () => {
  console.log(renderToString(<tex_document>Extra<tex_text>Test</tex_text></tex_document>))
})

test('SimpleRender5', () => {
  console.log(renderToString(<tex_document>Extra<tex_text>Test Dit wordt geprint<tex_text>2</tex_text></tex_text></tex_document>))
})