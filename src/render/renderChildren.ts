import * as R from 'ramda';
import LatexDocument from '../latex/LatexDocument';
import { Instance, TextInstance } from '../renderer';
import renderNode from './renderNode';
import { TEXT_INSTANCE } from '../constants';

const renderChildren = (ld: LatexDocument) => (node: Instance | TextInstance) => {
  //console.log(`Rendering children of node: `)
  //console.log(node)
  R.compose(
    R.forEach(renderNode(ld)),
    R.pathOr([], ['children']),
  )(node);

  if(node.type !== TEXT_INSTANCE){
    const instance = node as Instance
    if(instance.textContent)
      ld.addContent(instance.textContent.toString())
  }

  

  return node;
};

export default renderChildren