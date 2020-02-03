import React from "react"
import { renderToString } from '..'
import parser from '../jsx/parser'
import jsx from '../jsx'

test('SimpleRender', () => {
  console.log(renderToString(<reactex_document></reactex_document>))
})

test('SimpleRender2', () => {
  console.log(renderToString(<reactex_document>Test</reactex_document>))
})

test('SimpleRender3', () => {
  console.log(renderToString(<reactex_document>The square of five is written as <reactex_math>5^2</reactex_math></reactex_document>))
})

test('SimpleRender4', () => {
  console.log(renderToString(<reactex_document>Display <reactex_math display>5^2</reactex_math></reactex_document>))
})

test('Command', () => {
  console.log(renderToString(<reactex_document><reactex_command name="section" args={[{optional: false, value: 'test'}]} ></reactex_command></reactex_document>))
})

test('NewCommand', () => {
  console.log(renderToString(<reactex_document><reactex_new_command name="example" nbMandatoryArgs={1} optionalArgs={['optional']} content={`Example with arg #2 and optional value #1`} /></reactex_document>))
})

test('NewCommand and command call', () => {
  console.log(renderToString(<reactex_document><reactex_new_command name="example" nbMandatoryArgs={1} optionalArgs={['optional']} content={`Example with arg #2 and optional value #1`} />
  <reactex_command name="example" args={[{optional: false, value: 'test'}]} /></reactex_document>))
})

test('NewCommand and command call', () => {
  console.log(renderToString(<reactex_document><reactex_new_command name="example" nbMandatoryArgs={1} optionalArgs={['optional']} content={`Example with arg #2 and optional value #1`} />
  <reactex_command name="example" args={[{optional: true, value: 'this value'}, {optional: false, value: 'test'}]} /></reactex_document>))
})


test('NewCommand, command call, renew command, command call', () => {
  console.log(
    renderToString(
    <reactex_document>
      <reactex_new_command name="example" nbMandatoryArgs={1} optionalArgs={['optional']} content={`Example with arg #2 and optional value #1`} />
      <reactex_command name="example" args={[{optional: true, value: 'this value'}, {optional: false, value: 'test'}]} />
      <reactex_renew_command name="example" nbMandatoryArgs={1} optionalArgs={['OTHER optional']} content={`Example with argument #2 and an optional value #1`} />
      <reactex_command name="example" args={[{optional: false, value: 'test'}]} />
    </reactex_document>))
})

test('Environment call', () => {
  console.log(
    renderToString(
    <reactex_document>
      <reactex_environment name="center" args={[]}>
        This should be centered
      </reactex_environment>
     
    </reactex_document>))
})

test('Nested environment call', () => {
  console.log(
    renderToString(
    <reactex_document>
      <reactex_environment name="center" args={[]}>
        This should be centered
        <reactex_environment name="tabular" args={[{optional: false, value: "c c c"}]}>
          cell1 & cell2 & cell3 \\ 
          cell4 & cell5 & cell6 \\
          cell7 & cell8 & cell9 \\
        </reactex_environment>
      </reactex_environment>
     
    </reactex_document>))
})

test('New Environment', () => {
  console.log(
    renderToString(
    <reactex_document>
      <reactex_new_environment name="centerOther" optionalArgs={[]} nbMandatoryArgs={0} start="\begin{center}" end="\end{center}"/>
      <reactex_environment name="centerOther" args={[]}>
        This should be centered
      </reactex_environment>
     
    </reactex_document>))
})

test('New Environment', () => {
  console.log(
    renderToString(
    <reactex_document>
      <reactex_new_command name="tmpArg" content="" />
      <reactex_new_environment name="centerOther" optionalArgs={['endText']} nbMandatoryArgs={1} start="\renewcommand{\tmpArg}{#1}\begin{center}#2\\" end="\\\tmpArg\end{center}"/>
      <reactex_environment name="centerOther" args={[{optional: false, value: 'before'}]}>
        This should be centered with a text before and default one after
      </reactex_environment>
      <reactex_environment name="centerOther" args={[{optional: true, value: 'other endText'}, {optional: false, value: 'before'}]}>
        This should be centered with a text before and after
      </reactex_environment>
    </reactex_document>))
})

test('New Environment + renew Environment', () => {
  console.log(
    renderToString(
    <reactex_document>
      <reactex_new_command name="tmpArg" content="" />
      <reactex_new_environment name="centerOther" optionalArgs={['endText']} nbMandatoryArgs={1} start="\renewcommand{\tmpArg}{#1}\begin{center}#2\\" end="\\\tmpArg\end{center}"/>
      <reactex_environment name="centerOther" args={[{optional: false, value: 'before'}]}>
        This should be centered with a text before and default one after
      </reactex_environment>
      <reactex_renew_environment name="centerOther" optionalArgs={['other endText']} nbMandatoryArgs={1} start="\renewcommand{\tmpArg}{#1}\begin{center}#2\\" end="\\\tmpArg\end{center}"/>
      <reactex_environment name="centerOther" args={[{optional: false, value: 'before'}]}>
        This should be centered with a text before and after
      </reactex_environment>
    </reactex_document>))
})

test('Parser', () => {
  console.log(
    JSON.stringify(
    parser(`<reactex_document>The square of five is written as <reactex_math>5^2</reactex_math></reactex_document>`, []),
    null, 2
    ))
})

const toJSON = (o: any) => JSON.stringify(o, null, 2)

test('Simple JSX test', () => {
  expect(toJSON(jsx `<reactex_document></reactex_document>`)).toEqual(toJSON(<reactex_document></reactex_document>))
})

test('More complex JSX test', () => {
  expect(toJSON(jsx `<reactex_document>The square of five is written as <reactex_math display key="tmp">5^2</reactex_math></reactex_document>`))
  .toEqual(toJSON(<reactex_document>The square of five is written as <reactex_math display key="tmp">5^2</reactex_math></reactex_document>))
})