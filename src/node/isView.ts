import * as R from 'ramda'

import { VIEW } from '../constants'
import { Instance, TextInstance } from '../renderer'

const isView = R.propEq('type', VIEW)

export default isView as ((i: Instance | TextInstance) => boolean)