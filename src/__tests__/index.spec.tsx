import React from "react"
import { renderToString, Cocument, Cext } from '..'

test('SimpleRender', () => {
  console.log(renderToString(<Cocument></Cocument>))
})

test('SimpleRender2', () => {
  console.log(renderToString(<Cocument>Test</Cocument>))
})

test('SimpleRender3', () => {
  console.log(renderToString(<Cocument><Cext>Test</Cext></Cocument>))
})

test('SimpleRender4', () => {
  console.log(renderToString(<Cocument>Extra<Cext>Test</Cext></Cocument>))
})

test('SimpleRender5', () => {
  console.log(renderToString(<Cocument>Extra<Cext>Test Dit wordt geprint<Cext>2</Cext></Cext></Cocument>))
})