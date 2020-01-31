import * as R from 'ramda'

import { TEXT } from '../constants'
import { Instance, TextInstance } from '../renderer'

const isText = R.propEq('type', TEXT)

export default isText as ((i: Instance | TextInstance) => boolean)