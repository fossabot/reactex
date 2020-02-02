import renderLaTeX from './render'
import createRenderer from './renderer';
import LatexDocument from './latex/LatexDocument'
import React from 'react';
import { Container } from './renderer';

const latex = ({ initialValue, onChange }: { initialValue: React.ReactNode, onChange?: (() => void) }) => {
  const container: Container = { type: 'ROOT', document: null, children: [] };
  const LaTeXRenderer = createRenderer({ onChange });
  const mountNode = LaTeXRenderer.createContainer(container, false, false);

  if (initialValue) updateContainer(initialValue);

  //console.log(container)

  const render = () => {
    const ld = new LatexDocument()

    return renderLaTeX(ld, container.document!);
  };

  function updateContainer(doc: React.ReactNode) {
    LaTeXRenderer.updateContainer(doc, mountNode, null, () => null);
  }

  /*function callOnRender(params = {}) {
    if (container.document && container.document.props.onRender) {
      container.document.props.onRender(params);
    }
  }*/

  function toString() {
    const instance = render();
    return instance.toString()
  }

  return {
    container,
    updateContainer,
    toString,
  };
};

const renderToString = function(element: React.ReactNode) {
  const instance = latex({ initialValue: element });
  console.log(instance.container)
  return instance.toString();
};

export {
  renderToString,
};
