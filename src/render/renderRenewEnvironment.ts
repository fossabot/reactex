import * as R from 'ramda';
import { Instance, TexAttributes } from '../renderer';
import LatexDocument from '../latex/LatexDocument';

export interface RenewEnvironmentProps extends TexAttributes {
  name: string
  optionalArgs: string[] // string value is the default value
  nbMandatoryArgs: number
  start: string
  end: string
}

// TODO: render as rendering of 'command's
const renderRenewEnvironment = (ld: LatexDocument, node: Instance<RenewEnvironmentProps>) => {
  const props = node.props
  const nbArgs = props.nbMandatoryArgs + props.optionalArgs.length

  ld.addContentLine(String.raw`\renewenvironment{${props.name}}[${nbArgs}]${props.optionalArgs.map((a: string) => `[${a}]`).join('')}`, true)
  ld.addContentLine(String.raw`{${props.start}}`, true)
  ld.addContentLine(String.raw`{${props.end}}`, true)

  return node;
};

export default R.curryN(2, renderRenewEnvironment);