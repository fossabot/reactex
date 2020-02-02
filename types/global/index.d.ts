import 'react'
import { DetailedTexProps } from '../../src/renderer';
import { DocumentProps } from '../../src/render/renderDocument';
import { TextProps } from '../../src/render/renderText';
import { MathProps } from '../../src/render/renderMath';
import { CommandProps } from '../../src/render/renderCommand';
import { NewCommandProps } from '../../src/render/renderNewCommand';
import { RenewCommandProps } from '../../src/render/renderRenewCommand';
import { NewEnvironmentProps } from '../../src/render/renderNewEnvironment';
import { RenewEnvironmentProps } from '../../src/render/renderRenewEnvironment';
import { EnvironmentProps } from '../../src/render/renderEnvironment';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      reactex_document: DetailedTexProps<DocumentProps>,
      reactex_math: DetailedTexProps<MathProps>,
      reactex_command: DetailedTexProps<CommandProps>,
      reactex_new_command: DetailedTexProps<NewCommandProps>,
      reactex_renew_command: DetailedTexProps<RenewCommandProps>,
      reactex_environment: DetailedTexProps<EnvironmentProps>,
      reactex_new_environment: DetailedTexProps<NewEnvironmentProps>,
      reactex_renew_environment: DetailedTexProps<RenewEnvironmentProps>,
    }
  }
}