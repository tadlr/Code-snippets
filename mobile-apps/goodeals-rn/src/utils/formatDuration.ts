export const formatDuration = (expiredInMilliseconds: number) => {
  const oneDayDuration = 1000 * 60 * 60 * 24;
  const oneHourDuration = 1000 * 60 * 60;
  const oneWeekDuration = oneDayDuration * 7;
  const oneMonthDuration = oneDayDuration * 30;

  if (expiredInMilliseconds >= oneMonthDuration) {
    //if greater than or equal 1 month
    const months = Math.floor(expiredInMilliseconds / oneMonthDuration);

    return `${months} month${months !== 1 ? 's' : ''}`;
  } else if (expiredInMilliseconds >= oneWeekDuration) {
    //if less than 1 month && greater than or equal 1 week
    const days = Math.floor(expiredInMilliseconds / oneWeekDuration);

    return `${days} week${days !== 1 ? 's' : ''}`;
  } else if (expiredInMilliseconds >= oneDayDuration) {
    //if less than 1 week && greater than or equal 1 day
    const days = Math.floor(expiredInMilliseconds / oneDayDuration);

    return `${days} day${days !== 1 ? 's' : ''}`;
  } else if (expiredInMilliseconds >= oneHourDuration) {
    //if less than 1 day && greater than or equal 1 hour
    const hours = Math.floor(expiredInMilliseconds / oneHourDuration);

    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  } else if (
    expiredInMilliseconds < oneHourDuration &&
    expiredInMilliseconds > 0
  ) {
    //if less than 1 hour && greater than or equal 0
    return 'Less than an hour';
  } else {
    return '';
  }
};
