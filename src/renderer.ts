import ReactFiberReconciler, { OpaqueHandle } from 'react-reconciler'
import {
  unstable_scheduleCallback,
  unstable_cancelCallback,
  unstable_NormalPriority,
} from 'scheduler';

import propsEqual from './utils/propsEqual';
import { TEXT_INSTANCE } from './constants';


//type Style = object // TODO

type Type = string

export interface Container {
  type: Type
  document: Instance | TextInstance | null
  children: (Instance | TextInstance)[]
}

interface HydratableInstance {

}

interface PublicInstance {

}

interface HostContext {

}

interface UpdatePayload {

}

interface ChildSet {

}

type TimeoutHandle = typeof setTimeout | undefined

interface NoTimeout {

}

export interface Instance<T = any> {
  type: Type
  props: DetailedTexProps<T> // TODO
  children: (Instance | TextInstance)[] // TODO
  textContent?: string | number
}

export interface TextInstance {
  type: typeof TEXT_INSTANCE
  text: string | number
}

export interface TexAttributes {
  children?: React.ReactNode
}

/*interface AllTexAttributes extends TexAttributes {

}*/

//interface TexProps<T> extends AllTexAttributes, React.ClassAttributes<T> {}

export type DetailedTexProps<E extends TexAttributes> = E
export type Props = DetailedTexProps<any>

const emptyObject = {};


const createRenderer = ({ onChange = () => {} }) => {
  return ReactFiberReconciler<Type, Props, Container, Instance, TextInstance, HydratableInstance, PublicInstance, HostContext, UpdatePayload, ChildSet, TimeoutHandle, NoTimeout>({
    supportsMutation: true,
    supportsPersistence: false, // TODO
    supportsHydration: false, // TODO

    isPrimaryRenderer: false,

    appendInitialChild(parentInstance: Instance, _child: Instance | TextInstance) : void {
      parentInstance.children.push(_child);
    },

    createInstance(type: Type, newProps: Props, _rootContainerInstance: Container, _hostContext: HostContext, _internalInstanceHandle: OpaqueHandle): Instance {
      const props : Props = {}
      let textContent : string | number | undefined = undefined      
      Object.keys(newProps).forEach(propName => {
        const propValue = newProps[propName];
        if (propName === 'children') {
          if (typeof propValue === 'string' || typeof propValue === 'number') {
            textContent = propValue
          }
        } else {
          props[propName] = propValue
        }
      })
      
      return {
        type,
        textContent,
        props: props,
        children: [],
      };
    },

    createTextInstance(text: string,
      _rootContainerInstance: Container,
      _hostContext: HostContext,
      _internalInstanceHandle: OpaqueHandle): TextInstance {
        //console.log(text)
      return { type: TEXT_INSTANCE, text };
    },

    finalizeInitialChildren(_parentInstance: Instance, _type: Type, _props: Props, _rootContainerInstance: Container, _hostContext: HostContext) : boolean {
      return false;
    },

    getPublicInstance(instance: Instance | TextInstance): PublicInstance {
      return instance;
    },

    prepareForCommit(_containerInfo: Container): void {
      // Noop
    },

    prepareUpdate(
      _instance: Instance,
      _type: Type,
      oldProps: Props,
      newProps: Props,
      _rootContainerInstance: Container,
      _hostContext: HostContext,
  ): null | UpdatePayload {
      return !propsEqual(oldProps, newProps);
    },

    resetAfterCommit: onChange,

    resetTextContent(instance: Instance): void {
      instance.textContent = undefined
    },

    getRootHostContext(_rootContainerInstance: Container): HostContext {
      return emptyObject;
    },

    getChildHostContext(_parentHostContext: HostContext, _type: Type, _rootContainerInstance: Container): HostContext {
      return emptyObject;
    },

    shouldSetTextContent(_type: Type, props: Props): boolean {
      //console.log(`Should set text content`);
      //console.log(type)
      //console.log(props)
      return typeof props.children === 'string' || typeof props.children === 'number';
    },

    now: Date.now,

    appendChild(parentInstance: Instance, child: Instance | TextInstance): void {
      //console.log(`Appending child`)
      //console.log(child)
      parentInstance.children.push(child);
    },

    appendChildToContainer(container: Container, child: Instance | TextInstance): void {
      //console.log(`Appending child`)
      //console.log(child)
      //console.log(`To root container`)
      //console.log(container)
      if (container.type === 'ROOT') {
        container.document = child;
      } else {
        container.children.push(child);
      }
    },

    insertBefore(parentInstance: Instance, child: Instance | TextInstance, beforeChild: Instance | TextInstance): void {
      const index = parentInstance.children.indexOf(beforeChild);
      if (index !== -1 && child)
        parentInstance.children.splice(index, 0, child);
    },

    removeChild(parentInstance: Instance, child: Instance | TextInstance): void {
      const index = parentInstance.children.indexOf(child);
      if (index !== -1) parentInstance.children.splice(index, 1);
    },

    removeChildFromContainer(container: Container, child: Instance | TextInstance): void {
      const index = container.children.indexOf(child);
      if (index !== -1) container.children.splice(index, 1);
    },

    commitTextUpdate(textInstance: TextInstance, _oldText: string, newText: string): void {
      textInstance.text = newText;
    },

    commitUpdate(instance: Instance, _updatePayload: UpdatePayload, _type: Type, _oldProps: Props, newProps: Props, _internalInstanceHandle: OpaqueHandle): void {
      Object.keys(newProps).forEach(propName => {
        const propValue = newProps[propName]
        if (propName === 'children') {
          if (typeof propValue === 'string' || typeof propValue === 'number') {
            instance.textContent = propValue
          }
        } else {
          const propValue = newProps[propName]
          instance.props[propName] = propValue
        }
      });
    },

    shouldDeprioritizeSubtree(_type: Type, _props: Props): boolean {
      return false // TODO
    },

    scheduleDeferredCallback(
        callback: () => any,
        options?: { timeout: number },
    ): any {
      return unstable_scheduleCallback(unstable_NormalPriority, callback, options) // TODO ?
    },

    cancelDeferredCallback(callbackID: any): void {
      return unstable_cancelCallback(callbackID) // TODO
    },

    setTimeout(_handler: (...args: any[]) => void, _timeout: number): TimeoutHandle | NoTimeout {
      return typeof setTimeout === 'function' ? setTimeout : undefined
    },

    clearTimeout(_handle: TimeoutHandle | NoTimeout): void {
      typeof clearTimeout === 'function' ? clearTimeout : undefined
    },

    noTimeout: -1, // TODO

  });
};

export default createRenderer;