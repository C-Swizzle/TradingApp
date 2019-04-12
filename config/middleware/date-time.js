module.exports=function (){
    var today = new Date();
    var month=today.getMonth()+1;
    if(month.toString().length===1){
      month="0"+month.toString()
    }
    var day=today.getDate();
    if(day.toString().length===1){
      day="0"+day.toString();
    }
    var date = today.getFullYear()+'-'+month+'-'+day;
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime;
    }
    