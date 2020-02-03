import React from "react"
import parser from '../parser'
import {jsxtex, reactex } from '../'

test('Parser', () => {
  expect(parser(`<reactex_document>The square of five is written as <reactex_math>5^2</reactex_math></reactex_document>`)).toMatchSnapshot()
})

const toJSON = (o: any) => JSON.stringify(o, null, 2)

test('Simple JSX test', () => {
  expect(toJSON(jsxtex `<reactex_document></reactex_document>`)).toEqual(toJSON(<reactex_document></reactex_document>))
})

test('Simple JSX test', () => {
  expect(toJSON(reactex('<reactex_document></reactex_document>'))).toEqual(toJSON(<reactex_document></reactex_document>))
})

test('More complex JSX test', () => {
  expect(toJSON(jsxtex `<reactex_document>The square of five is written as <reactex_math display key="tmp">5^2</reactex_math></reactex_document>`))
  .toEqual(toJSON(<reactex_document>The square of five is written as <reactex_math display key="tmp">5^2</reactex_math></reactex_document>))
})