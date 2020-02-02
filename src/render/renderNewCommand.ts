import * as R from 'ramda';
import { Instance, TexAttributes } from '../renderer';
import LatexDocument from '../latex/LatexDocument';

export interface NewCommandProps extends TexAttributes {
  name: string
  optionalArgs?: string[] // string value is the default value
  nbMandatoryArgs?: number
  content: string
}

const renderNewCommand = (ld: LatexDocument, node: Instance<NewCommandProps>) => {
  const props = node.props
  const optionalArgs = props.optionalArgs || []
  const nbArgs = (props.nbMandatoryArgs || 0) + optionalArgs.length
  
  ld.addContentLine(`\\newcommand{\\${props.name}}[${nbArgs}]${optionalArgs.map((a: string) => `[${a}]`).join('')}{${props.content}}`, true)

  return node;
};

export default R.curryN(2, renderNewCommand);