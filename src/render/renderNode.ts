import * as R from 'ramda';
import { Instance, TextInstance } from '../renderer';
import LatexDocument from '../latex/LatexDocument';
import * as type from '../node/isType'
import renderDocument from './renderDocument';
import renderTextInstance from './renderTextInstance';
import renderMath from './renderMath';
import renderCommand from './renderCommand';
import renderNewCommand from './renderNewCommand';
import renderRenewCommand from './renderRenewCommand';
import renderEnvironment from './renderEnvironment';
import renderNewEnvironment from './renderNewEnvironment';
import renderRenewEnvironment from './renderRenewEnvironment';

const renderNode = (ld: LatexDocument) => (node: Instance | TextInstance) => {
  //console.log(`Rendering node: `)
  //console.log(node)
  R.cond([
    [type.isDocument, renderDocument(ld)],
    [type.isTextInstance, renderTextInstance(ld)],
    [type.isMath, renderMath(ld)],
    [type.isCommand, renderCommand(ld)],
    [type.isNewCommand, renderNewCommand(ld)],
    [type.isRenewCommand, renderRenewCommand(ld)],
    [type.isEnvironment, renderEnvironment(ld)],
    [type.isNewEnvironment, renderNewEnvironment(ld)],
    [type.isRenewEnvironment, renderRenewEnvironment(ld)],
    [R.T, R.identity],
  ])(node);
}

export default renderNode;