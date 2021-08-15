import * as FileSystem from 'expo-file-system'

import PropTypes from 'prop-types'

import * as CONST from './consts.js'

// const Storage = props => {
//
// }
//

export const Storage = {

  setItem: async ({ key, value }) => {
    const writtenContents = await FileSystem.writeAsStringAsync(`${CONST.DOCUMENT_FOLDER}${key}`, value)
    return writtenContents
  },

  getItem: async ({ key }) => {
    const value = await FileSystem.readAsStringAsync(`${CONST.DOCUMENT_FOLDER}${key}`)
    return value
  },

  removeItem: async ({ key }) => {
    await FileSystem.deleteAsync(
      `${CONST.DOCUMENT_FOLDER}${key}`,
      { idempotent: true } // don't throw an error if there is no file or directory at this URI
    )
  },

  getAllKeys: async () => {
    const keys = await FileSystem.readDirectoryAsync(`${CONST.DOCUMENT_FOLDER}`)
    return keys
  },

}

export default Storage
