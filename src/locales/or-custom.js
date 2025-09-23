import dayjs from 'dayjs';

// Custom Odia (Oriya) locale configuration
const locale = {
  name: 'or',
  weekdays: 'ରବିବାର_ସୋମବାର_ମଙ୍ଗଳବାର_ବୁଧବାର_ଗୁରୁବାର_ଶୁକ୍ରବାର_ଶନିବାର'.split('_'),
  weekdaysShort: 'ରବି_ସୋମ_ମଙ୍ଗଳ_ବୁଧ_ଗୁରୁ_ଶୁକ୍ର_ଶନି'.split('_'),
  weekdaysMin: 'ର_ସୋ_ମ_ବୁ_ଗୁ_ଶୁ_ଶ'.split('_'),
  months: 'ଜାନୁଆରୀ_ଫେବୃଆରୀ_ମାର୍ଚ୍ଚ_ଏପ୍ରିଲ୍_ମେ_ଜୁନ୍_ଜୁଲାଇ_ଅଗଷ୍ଟ_ସେପ୍ଟେମ୍ବର_ଅକ୍ଟୋବର_ନଭେମ୍ବର_ଡିସେମ୍ବର'.split('_'),
  monthsShort: 'ଜାନ_ଫେବ_ମାର୍ଚ_ଏପ୍ରି_ମେ_ଜୁନ_ଜୁଲ_ଅଗ_ସେପ୍_ଅକ୍ଟ_ନଭେ_ଡିସେ'.split('_'),
  // Corrected meridiem function with proper signature and return
  meridiem: (hour, minute, isLowercase) => {
    return hour < 12 ? (isLowercase ? 'am' : 'AM') : (isLowercase ? 'pm' : 'PM');
  },
  relativeTime: {
    future: '%sରେ',
    past: '%s ପୂର୍ବରୁ',
    s: 'କିଛି ସେକେଣ୍ଡ୍',
    m: 'ଏକ ମିନିଟ୍',
    mm: '%d ମିନିଟ୍',
    h: 'ଏକ ଘଣ୍ଟା',
    hh: '%d ଘଣ୍ଟା',
    d: 'ଏକ ଦିନ',
    dd: '%d ଦିନ',
    M: 'ଏକ ମାସ',
    MM: '%d ମାସ',
    y: 'ଏକ ବର୍ଷ',
    yy: '%d ବର୍ଷ',
  },
  ordinal: n => `${n}th`,
  formats: {
    LT: 'h:mm A',
    LTS: 'h:mm:ss A',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY h:mm A',
    LLLL: 'dddd, D MMMM YYYY h:mm A',
  },
};

dayjs.locale(locale, null, true);

export default locale;