import React from "react"
import { renderToString, Document, Text } from '..'

test('SimpleRender', () => {
  console.log(renderToString(<Document></Document>))
})

test('SimpleRender2', () => {
  console.log(renderToString(<Document>Test</Document>))
})

test('SimpleRender3', () => {
  console.log(renderToString(<Document><Text>Test</Text></Document>))
})

test('SimpleRender4', () => {
  console.log(renderToString(<Document>Extra<Text>Test</Text></Document>))
})

test('SimpleRender5', () => {
  console.log(renderToString(<Document>Extra<Text>Test Dit wordt geprint<Text>2</Text></Text></Document>))
})