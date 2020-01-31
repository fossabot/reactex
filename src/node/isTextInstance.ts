
import * as R from 'ramda'

import { TEXT_INSTANCE } from '../constants'

const isTextInstance = R.propEq('type', TEXT_INSTANCE)

export default isTextInstance