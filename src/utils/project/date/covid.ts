import i18next from 'i18next';

export const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

export const renderDate = date => {
  const [y, m, d] = date.split('-');
  return (
    parseInt(d) +
    '. ' +
    i18next.t(months[parseInt(m, 10) - 1]).toUpperCase() +
    ' ' +
    y
  );
};

const renderTimestampDateOptions = {
  showDay: true,
  showFullMonth: false,
};
export const renderTimestampDate = (
  date,
  options = renderTimestampDateOptions,
) => {
  const { showDay, showFullMonth } = options;
  const monthObj = months;
  const dateObj = new Date(date);
  const y = dateObj.getFullYear();
  const m = dateObj.getMonth() + 1;
  const d = showDay ? dateObj.getDate() + '.' : '';
  return d + ' ' + i18next.t(monthObj[m - 1]).toUpperCase() + ' ' + y;
};
