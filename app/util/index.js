import moment from 'moment';

export function convertDate(date){
  if(date && date.match(/\d{4}(\-\d{2}){2}T/)){
    return moment(new Date(date)).format('YYYY-MM-DD');
  }
  return date;
}

export function isListSame(array1, array2){
  return JSON.stringify(array1.sort()) === JSON.stringify(array2.sort());
}
