// expects time as a String "hh:mm"
export const formatTimeWithOffset = (time) => {
  const timeOffset = new Date().getTimezoneOffset();
  let [hours, minutes] = time.split(':');
  minutes -= timeOffset;
  hours = Number(hours);
  if (minutes >= 60) {
    hours += 1;
    minutes -= 60;
  } else if (minutes < 0) {
    hours -= 1;
    minutes += 60;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${hours}:${minutes}`;
};
