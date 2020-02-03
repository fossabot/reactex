import React from'react'
import { DetailedTexProps } from './renderer';
import { DocumentProps } from './render/renderDocument';
import { MathProps } from './render/renderMath';
import { CommandProps } from './render/renderCommand';
import { NewCommandProps } from './render/renderNewCommand';
import { RenewCommandProps } from './render/renderRenewCommand';
import { NewEnvironmentProps } from './render/renderNewEnvironment';
import { RenewEnvironmentProps } from './render/renderRenewEnvironment';
import { EnvironmentProps } from './render/renderEnvironment';
import { jsxtex, reactex, FailedReactElementCreation } from './jsx';
import { FailedParseResponse } from './jsx/parser';

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

declare const renderToLaTeXString: (element: React.ReactNode) => string;
export { renderToLaTeXString, jsxtex, reactex, FailedParseResponse, FailedReactElementCreation };