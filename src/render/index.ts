import LatexDocument from '../latex/LatexDocument';
import { Instance, TextInstance } from '../renderer';
import renderNode from './renderNode'

const renderDocument = (ld: LatexDocument) => renderNode(ld)

const render = (ld: LatexDocument, doc: Instance | TextInstance) => {
  //addMetadata(ld);
  renderDocument(ld)(doc)
  return ld;
};

export default render;
