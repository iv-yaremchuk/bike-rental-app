import {
  CREATE_REPORT_SUCCESS,
  CREATE_REPORT_FAIL,
  SET_MESSAGE,
} from './types';

import ReportService from '../services/report.service';

export const createReport =
  (licenseNumber, ownerFullName, type, clientId, color, date, description) =>
  (dispatch) => {
    return ReportService.createReport(
      licenseNumber,
      ownerFullName,
      type,
      clientId,
      color,
      date,
      description
    ).then(
      () => {
        dispatch({
          type: CREATE_REPORT_SUCCESS,
        });
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch({
          type: CREATE_REPORT_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        return Promise.reject();
      }
    );
  };
