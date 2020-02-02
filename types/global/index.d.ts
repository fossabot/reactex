import 'react'
import { DetailedTexProps } from '../../src/renderer';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "tex-document": DetailedTexProps<any, any>,
      "tex-text": DetailedTexProps<any, any>,
    }
  }
}