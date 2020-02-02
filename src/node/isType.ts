import * as R from 'ramda'

import { Instance, TextInstance } from '../renderer'
import { COMMAND, DOCUMENT, TEXT_INSTANCE, MATH, NEW_COMMAND, RENEW_COMMAND, ENVIRONMENT, NEW_ENVIRONMENT, RENEW_ENVIRONMENT } from '../constants'

const isType: (s: string) => ((i: Instance | TextInstance) => boolean) = (s: string) => R.propEq('type', s)

export const isDocument = isType(DOCUMENT)
export const isTextInstance = isType(TEXT_INSTANCE)
export const isMath = isType(MATH)
export const isCommand = isType(COMMAND)
export const isNewCommand = isType(NEW_COMMAND)
export const isRenewCommand = isType(RENEW_COMMAND)
export const isEnvironment = isType(ENVIRONMENT)
export const isNewEnvironment = isType(NEW_ENVIRONMENT)
export const isRenewEnvironment = isType(RENEW_ENVIRONMENT)
