import * as FileSystem from 'expo-file-system'

import PropTypes from 'prop-types'

import * as CONST from './consts.js'

// const Storage = props => {
//
// }
//

export const Storage = {

  setItem: async ({ key, value }) => {
    const uri = await FileSystem.getContentUriAsync(`${CONST.DOCUMENT_FOLDER}${key}`)
    return uri
  },

  getItem: async ({ key }) => {
    await FileSystem.copyAsync({
      from: key,
      to: `${CONST.DOCUMENT_FOLDER}${key}`,
    })

    const uri = null
    return uri
  },

  removeItem: async ({ key }) => {

  },
  getAllKeys: async () => {

  },
  clear: async () => {

  },
}

export default Storage
