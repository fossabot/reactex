import React from "react"
import {reactex, jsxtex } from '.'
import { renderToLaTeXString } from "../"

const toJSON = (o: any) => JSON.stringify(o, null, 2)


test('Simple JSX test', () => {
  expect(toJSON(jsxtex `<reactex_document></reactex_document>`)).toEqual(toJSON(<reactex_document></reactex_document>))
})


test('Simple JSX test', () => {
  expect(toJSON(reactex('<reactex_document></reactex_document>'))).toEqual(toJSON(<reactex_document></reactex_document>))
})


test('More complex JSX test', () => {
  expect(toJSON(reactex(`<reactex_document>The square of five is written as <reactex_math display key="tmp">5^2</reactex_math></reactex_document>`)))
  .toEqual(toJSON(<reactex_document>The square of five is written as <reactex_math display key="tmp">5^2</reactex_math></reactex_document>))
})

test('More complex JSX test: newline', () => {
  expect(toJSON(reactex(`<reactex_document>The square of five 
  is written as <reactex_math display key="tmp">5^2</reactex_math></reactex_document>`)))
  .toEqual(toJSON(<reactex_document>The square of five
     is written as <reactex_math display key="tmp">5^2</reactex_math></reactex_document>))
})


test('Even more complex JSX test', () => {
  const o1 = toJSON(jsxtex `
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
  </reactex_document>`)

  const o2 = toJSON(<reactex_document>
    <reactex_new_command name="tmpArg" content="" />
    <reactex_new_environment name="centerOther" optionalArgs={['endText']} nbMandatoryArgs={1} start="\renewcommand{\tmpArg}{#1}\begin{center}#2\\" end="\\\tmpArg\end{center}"/>
    <reactex_environment name="centerOther" args={[{optional: false, value: 'before'}]}>
      This should be centered with a text before and default one after
    </reactex_environment>
    <reactex_renew_environment name="centerOther" optionalArgs={['other endText']} nbMandatoryArgs={1} start="\renewcommand{\tmpArg}{#1}\begin{center}#2\\" end="\\\tmpArg\end{center}"/>
    <reactex_environment name="centerOther" args={[{optional: false, value: 'before'}]}>
      This should be centered with a text before and after
    </reactex_environment>
  </reactex_document>)

  expect(o1).toEqual(o2)
})

test('Even more complex JSX test', () => {
  const o1 = toJSON(reactex(String.raw`
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
  </reactex_document>`))

  const o2 = toJSON(<reactex_document>
    <reactex_new_command name="tmpArg" content="" />
    <reactex_new_environment name="centerOther" optionalArgs={['endText']} nbMandatoryArgs={1} start="\renewcommand{\tmpArg}{#1}\begin{center}#2\\" end="\\\tmpArg\end{center}"/>
    <reactex_environment name="centerOther" args={[{optional: false, value: 'before'}]}>
      This should be centered with a text before and default one after
    </reactex_environment>
    <reactex_renew_environment name="centerOther" optionalArgs={['other endText']} nbMandatoryArgs={1} start="\renewcommand{\tmpArg}{#1}\begin{center}#2\\" end="\\\tmpArg\end{center}"/>
    <reactex_environment name="centerOther" args={[{optional: false, value: 'before'}]}>
      This should be centered with a text before and after
    </reactex_environment>
  </reactex_document>)

  expect(o1).toEqual(o2)
})


test('New Environment + renew Environment', () => {
  expect(renderToLaTeXString(jsxtex `
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
    </reactex_document>`)).toMatchSnapshot()
})