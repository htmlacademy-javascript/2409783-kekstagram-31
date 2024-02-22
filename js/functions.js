const isShort = (string, stringLength) => string.length <= stringLength;

isShort('aba', 5);

function isPalindrome (string) {
  const normalizedString = string.toLowerCase().replaceAll(' ', '');
  let reversedString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }
  return normalizedString === reversedString;
}

isPalindrome('aba');

function findNumbers (string) {
  string = string.toString();
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      result += string[i];
    }
  }
  return parseInt(result, 10);
}

findNumbers('a1.ba0');

const toMinutes = (time) => {
  let hours = Number(time.split(':')[0]);
  let minutes = Number(time.split(':')[1]);
  let result = hours * 60 + minutes;
  return result;
}

const checkMeetingTime = (beginWork, endWork, beginMeeting, durationMeeting) => {
  let beginWorkMinutes = toMinutes(beginWork);
  let endWorkMinutes = toMinutes(endWork);
  let beginMeetingMinutes = toMinutes(beginMeeting);
  if (beginMeetingMinutes < beginWorkMinutes || beginMeetingMinutes + durationMeeting > endWorkMinutes) {
    return false;
  }
  return true;
}

checkMeetingTime('08:00', '17:30', '10:00', 90);
