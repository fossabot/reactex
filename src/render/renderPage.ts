import * as R from 'ramda';
import { TextInstance, Instance } from '../renderer';
import LatexDocument from '../latex/LatexDocument';

const renderPage = (_ld: LatexDocument, node: TextInstance | Instance) => {
  
  return node;
};

export default R.curryN(2, renderPage);