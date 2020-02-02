import 'react'
import { DetailedTexProps } from '../../src/renderer';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      tex_document: DetailedTexProps<any, any>,
      tex_text: DetailedTexProps<any, any>,
    }
  }
}