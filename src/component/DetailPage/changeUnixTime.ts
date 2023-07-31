export function Unix_timestamp(t: number) {
  var date = new Date(t * 1000);
  var year = date.getFullYear();
  var month = "0" + (date.getMonth() + 1);
  var day = "0" + date.getDate();
  return year + "-" + month.substr(-2) + "-" + day.substr(-2);
}
