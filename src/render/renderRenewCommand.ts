import * as R from 'ramda';
import { Instance, TexAttributes } from '../renderer';
import LatexDocument from '../latex/LatexDocument';

export interface RenewCommandProps extends TexAttributes {
  name: string
  optionalArgs: string[] // string value is the default value
  nbMandatoryArgs: number
  content: string
}

const renderRenewCommand = (ld: LatexDocument, node: Instance<RenewCommandProps>) => {
  const props = node.props
  const nbArgs = props.nbMandatoryArgs + props.optionalArgs.length
  
  ld.addContentLine(`\\renewcommand{\\${props.name}}[${nbArgs}]${props.optionalArgs.map((a: string) => `[${a}]`).join('')}{${props.content}}`, true)
  return node;
};

export default R.curryN(2, renderRenewCommand);