import * as R from 'ramda'

import { DOCUMENT } from '../constants'
import { Instance, TextInstance } from '../renderer'

const isDocument = R.propEq('type', DOCUMENT)

export default isDocument as ((i: Instance | TextInstance) => boolean)