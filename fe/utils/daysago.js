export default (epochTime) => {
  let value, unit;
  if (epochTime < 86400) {
    return 'Today';
  } else if (epochTime < 2592000) {
    value = Math.floor(epochTime / 60 / 60 / 24);
    unit = 'day';
  } else if (epochTime < 31536000) {
    value = Math.floor(epochTime / 60 / 60 / 24 / 30);
    unit = 'month';
  } else {
    value = Math.floor(epochTime / 60 / 60 / 24 / 365);
    unit = 'year';
  }
  if (value > 1) {
    unit = unit + 's';
  }
  return `${value}  ${unit} ago`;
};
