import moment from 'moment';

export const parseDate = date => moment(date.toDate()).fromNow();