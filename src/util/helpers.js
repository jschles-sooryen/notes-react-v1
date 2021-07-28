/* eslint-disable import/prefer-default-export */
import { format } from 'date-fns';

export const formatDate = (date) => {
  const dateObj = date ? new Date(date) : new Date();
  let dateFormat = 'MM/dd/yyyy';
  let formattedDate;

  if (dateObj.getDate() === new Date().getDate()) {
    dateFormat = 'h:mm a';
  }

  if (dateObj.getDate() === new Date().getDate() - 1) {
    formattedDate = 'Yesterday';
  } else {
    formattedDate = format(dateObj, dateFormat);
  }

  return formattedDate;
};
