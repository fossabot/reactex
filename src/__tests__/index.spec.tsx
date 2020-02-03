import React from "react"
import { renderToLaTeXString } from '..'

test('SimpleRender', () => {
  expect(renderToLaTeXString(<reactex_document></reactex_document>)).toMatchSnapshot()
})

test('SimpleRender2', () => {
  expect(renderToLaTeXString(<reactex_document>Test</reactex_document>)).toMatchSnapshot()
})

test('SimpleRender3', () => {
  expect(renderToLaTeXString(<reactex_document>The square of five is written as <reactex_math>5^2</reactex_math></reactex_document>)).toMatchSnapshot()
})

test('SimpleRender4', () => {
  expect(renderToLaTeXString(<reactex_document>Display <reactex_math display>5^2</reactex_math></reactex_document>)).toMatchSnapshot()
})

test('Command', () => {
  expect(renderToLaTeXString(<reactex_document><reactex_command name="section" args={[{optional: false, value: 'test'}]} ></reactex_command></reactex_document>)).toMatchSnapshot()
})

test('NewCommand', () => {
  expect(renderToLaTeXString(<reactex_document><reactex_new_command name="example" nbMandatoryArgs={1} optionalArgs={['optional']} content={`Example with arg #2 and optional value #1`} /></reactex_document>)).toMatchSnapshot()
})

test('NewCommand and command call', () => {
  expect(renderToLaTeXString(<reactex_document><reactex_new_command name="example" nbMandatoryArgs={1} optionalArgs={['optional']} content={`Example with arg #2 and optional value #1`} />
  <reactex_command name="example" args={[{optional: false, value: 'test'}]} /></reactex_document>)).toMatchSnapshot()
})

test('NewCommand and command call', () => {
  expect(renderToLaTeXString(<reactex_document><reactex_new_command name="example" nbMandatoryArgs={1} optionalArgs={['optional']} content={`Example with arg #2 and optional value #1`} />
  <reactex_command name="example" args={[{optional: true, value: 'this value'}, {optional: false, value: 'test'}]} /></reactex_document>)).toMatchSnapshot()
})


test('NewCommand, command call, renew command, command call', () => {
  expect(
    renderToLaTeXString(
    <reactex_document>
      <reactex_new_command name="example" nbMandatoryArgs={1} optionalArgs={['optional']} content={`Example with arg #2 and optional value #1`} />
      <reactex_command name="example" args={[{optional: true, value: 'this value'}, {optional: false, value: 'test'}]} />
      <reactex_renew_command name="example" nbMandatoryArgs={1} optionalArgs={['OTHER optional']} content={`Example with argument #2 and an optional value #1`} />
      <reactex_command name="example" args={[{optional: false, value: 'test'}]} />
    </reactex_document>)).toMatchSnapshot()
})

test('Environment call', () => {
  expect(
    renderToLaTeXString(
    <reactex_document>
      <reactex_environment name="center" args={[]}>
        This should be centered
      </reactex_environment>
     
    </reactex_document>)).toMatchSnapshot()
})

test('Nested environment call', () => {
  expect(
    renderToLaTeXString(
    <reactex_document>
      <reactex_environment name="center" args={[]}>
        This should be centered
        <reactex_environment name="tabular" args={[{optional: false, value: "c c c"}]}>
          cell1 & cell2 & cell3 \\ 
          cell4 & cell5 & cell6 \\
          cell7 & cell8 & cell9 \\
        </reactex_environment>
      </reactex_environment>
     
    </reactex_document>)).toMatchSnapshot()
})

test('New Environment', () => {
  expect(
    renderToLaTeXString(
    <reactex_document>
      <reactex_new_environment name="centerOther" optionalArgs={[]} nbMandatoryArgs={0} start="\begin{center}" end="\end{center}"/>
      <reactex_environment name="centerOther" args={[]}>
        This should be centered
      </reactex_environment>
     
    </reactex_document>)).toMatchSnapshot()
})

test('New Environment', () => {
  expect(
    renderToLaTeXString(
    <reactex_document>
      <reactex_new_command name="tmpArg" content="" />
      <reactex_new_environment name="centerOther" optionalArgs={['endText']} nbMandatoryArgs={1} start="\renewcommand{\tmpArg}{#1}\begin{center}#2\\" end="\\\tmpArg\end{center}"/>
      <reactex_environment name="centerOther" args={[{optional: false, value: 'before'}]}>
        This should be centered with a text before and default one after
      </reactex_environment>
      <reactex_environment name="centerOther" args={[{optional: true, value: 'other endText'}, {optional: false, value: 'before'}]}>
        This should be centered with a text before and after
      </reactex_environment>
    </reactex_document>)).toMatchSnapshot()
})

test('New Environment + renew Environment', () => {
  expect(
    renderToLaTeXString(
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
    </reactex_document>)).toMatchSnapshot()
})

