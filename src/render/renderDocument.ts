import * as R from 'ramda';
import { Instance, TexAttributes } from '../renderer';
import LatexDocument from '../latex/LatexDocument';
import renderChildren from './renderChildren';

export interface DocumentProps extends TexAttributes {

}

//TODO render as env ?
const renderDocument = (ld: LatexDocument, node: Instance<DocumentProps>) => {
  ld.addContentLine(String.raw`\begin{document}`, true)

  renderChildren(ld)(node)

  ld.addContentLine(String.raw`\end{document}`, true)
  return node;
};

export default R.curryN(2, renderDocument);