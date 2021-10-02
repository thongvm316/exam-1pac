import * as actionTypes from '../action/types'

const initialState = {
  countryBookMark: [],
}

const countryBookMarkReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case actionTypes.ADD_COUNTRY:
      return {
        ...state,
        countryBookMark: [...state.countryBookMark, payload],
      }
    case actionTypes.REMOVE_COUNTRY:
      return {
        ...state,
        countryBookMark: state.countryBookMark.filter(
          (item) => item.id !== payload,
        ),
      }
    default:
      return state
  }
}

export default countryBookMarkReducer
