import * as R from 'ramda';
import { TextInstance } from '../renderer'
import LatexDocument from '../latex/LatexDocument';

const renderTextInstance = (ld: LatexDocument, node: TextInstance) => {
  //console.log(`Rendering text instance`)
  //console.log(node)
  ld.addContent(node.text.toString())
  return node;
};

export default R.curryN(2, renderTextInstance);