import * as R from 'ramda';

import isText from '../node/isText';
import isPage from '../node/isPage';
import renderText from './renderText';
import renderPage from './renderPage';
import LatexDocument from '../latex/LatexDocument';
import { Instance, TextInstance } from '../renderer'

const shouldRenderChildren = (v: Instance | TextInstance) => !isText(v)

const renderChildren = (ld: LatexDocument) => (node: Instance | TextInstance) => {
  console.log(`Rendering children of node: `)
  console.log(node)
  R.compose(
    R.forEach(renderNode(ld)),
    R.pathOr([], ['children']),
  )(node);

  return node;
};

const renderNode = (ld: LatexDocument) => (node: Instance | TextInstance) => {
  console.log(`Rendering node: `)
  console.log(node)
  R.compose(
    R.when(shouldRenderChildren, renderChildren(ld)),
    R.cond([
      [isText, renderText(ld)],
      [R.T, R.identity],
    ]),
    R.when(isPage, renderPage(ld)),
  )(node);
}

const renderDocument = (ld: LatexDocument) =>
  R.compose(
    R.forEach(
      renderNode(ld),
    ),
    R.pathOr([], ['children']),
  );

const render = (ld: LatexDocument, doc: React.ReactNode) => {
  //addMetadata(ld);
  renderDocument(ld)(doc)
  return ld;
};

export default render;
