import * as R from 'ramda';
import { Instance, TexAttributes } from '../renderer';
import LatexDocument from '../latex/LatexDocument';
import renderChildren from './renderChildren';

interface TexArg {
  optional: boolean,
  value: string
}

export interface EnvironmentProps extends TexAttributes {
  name: string
  args: TexArg[]
}

const getBrackets = (ta: TexArg) => ta.optional ? '[]' : '{}'

// TODO: render as rendering of 'command's

const renderEnvironment = (ld: LatexDocument, node: Instance<EnvironmentProps>) => {
  const props = node.props
  ld.addContentLine(String.raw`\begin{${props.name}}${node.props.args.map((ta: TexArg) => `${getBrackets(ta)[0]}${ta.value}${getBrackets(ta)[1]}`).join('')}`, true)

  renderChildren(ld)(node)

  ld.addContentLine(String.raw`\end{${props.name}}`, true)
  return node;
};

export default R.curryN(2, renderEnvironment);