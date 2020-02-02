import * as R from 'ramda';
import { Instance, TexAttributes } from '../renderer';
import LatexDocument from '../latex/LatexDocument';

interface TexArg {
  optional: boolean,
  value: string
}

export interface CommandProps extends TexAttributes {
  name: string
  args: TexArg[]
}

const getBrackets = (ta: TexArg) => ta.optional ? '[]' : '{}'

const renderCommand = (ld: LatexDocument, node: Instance<CommandProps>) => {
  ld.addContent(`\\${node.props.name}${node.props.args.map((ta: TexArg) => `${getBrackets(ta)[0]}${ta.value}${getBrackets(ta)[1]}`).join('')}`)
  return node;
};

export default R.curryN(2, renderCommand);