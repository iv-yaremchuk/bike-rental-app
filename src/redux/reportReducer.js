import { CREATE_REPORT_SUCCESS, CREATE_REPORT_FAIL } from './types';

const initialState = { isReported: false };

function reportReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case CREATE_REPORT_SUCCESS:
      return {
        ...state,
        isReported: true,
      };
    case CREATE_REPORT_FAIL:
      return {
        ...state,
        isReported: false,
      };
    default:
      return state;
  }
}

export default reportReducer;
