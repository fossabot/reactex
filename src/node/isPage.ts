import * as R from 'ramda'

import { PAGE } from '../constants'
import { Instance, TextInstance } from '../renderer'

const isPage = R.propEq('type', PAGE)

export default isPage as ((i: Instance | TextInstance) => boolean)