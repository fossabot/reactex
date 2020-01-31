import * as R from 'ramda';
import { TextInstance, Instance } from '../renderer';
import isTextInstance from '../node/isTextInstance';
import LatexDocument from '../latex/LatexDocument';

const renderText = (ld: LatexDocument, node: Instance) => {
  console.log(`Rendering text for node`)
  console.log(node)
  node.children.forEach(child => {
    if (isTextInstance(child)) {
      console.log(child)
      const textInstance = child as TextInstance
      ld.addContentLine(textInstance.text)
    } else {
      if (child) {
        renderText(ld, child as Instance)
      }
    }
  });

  return node;
};

export default R.curryN(2, renderText);