import * as actionTypes from './types'

export const addCountryBookMarkAction = (payload) => ({
  type: actionTypes.ADD_COUNTRY,
  payload,
})

export const removeCountryBookMarkAction = (payload) => ({
  type: actionTypes.REMOVE_COUNTRY,
  payload,
})
