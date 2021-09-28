import * as actionTypes from '../action/types'

const initialState = {
  loading: true,
  countryBookMark: [],
  error: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case actionTypes.ADD_COUNTRY:
      return {
        ...state,
        loading: false,
        countryBookMark: [...state.countryBookMark, payload],
      }
    default:
      return state
  }
}
