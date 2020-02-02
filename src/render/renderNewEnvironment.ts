import * as R from 'ramda';
import { Instance, TexAttributes } from '../renderer';
import LatexDocument from '../latex/LatexDocument';

export interface NewEnvironmentProps extends TexAttributes {
  name: string
  optionalArgs: string[] // string value is the default value
  nbMandatoryArgs: number
  start: string
  end: string
}

// TODO: render as rendering of 'command's
const renderNewEnvironment = (ld: LatexDocument, node: Instance<NewEnvironmentProps>) => {
  const props = node.props
  const nbArgs = props.nbMandatoryArgs + props.optionalArgs.length

  ld.addContentLine(String.raw`\newenvironment{${props.name}}[${nbArgs}]${props.optionalArgs.map((a: string) => `[${a}]`).join('')}`, true)
  ld.addContentLine(String.raw`{${props.start}}`, true)
  ld.addContentLine(String.raw`{${props.end}}`, true)

  return node;
};

export default R.curryN(2, renderNewEnvironment);