import moment from 'moment';

export function convertDate(date){
  if(date && date.match(/\d{4}(\-\d{2}){2}T/)){
    return moment(new Date(date)).format('YYYY-MM-DD');
  }
  return date;
}
