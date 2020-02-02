import * as R from 'ramda';
import { Instance, TexAttributes } from '../renderer';
import LatexDocument from '../latex/LatexDocument';

export interface MathProps extends TexAttributes {
  display?: boolean
}

const renderMath = (ld: LatexDocument, node: Instance<MathProps>) => {
  const content = node.textContent || ''
  if(node.props.display)
    ld.addContentLine(`$$${content}$$`, true)
  else
    ld.addContent(`$${content}$`)
  return node;
};

export default R.curryN(2, renderMath);