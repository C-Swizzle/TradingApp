// $.ajax({url:"/api/sellOffers/:id",method:"GET"}).then(function(response){
//     console.log(response);
//     for (var i=0;i<response.length;i++){
//       var $card=$("<div>");
//       $card.addClass("row");
//       $card.append("<div class='col s12 m6'>");
//       $card.append("<div class='card-content white-text'>");
//       $card.append("<span class='card-title'>"+response[i].name +"</span>");
//       $("#main-body").append($card);
//       var card =`<div class="row">
//         <div class="col s12 m6">
//           <div class="card blue-grey darken-1">
//             <div class="card-content white-text">
//               <span class="card-title">${response[i].name}</span>
//               <p>Price: ${response[i].price}</p>
//             </div>
//             <div class="card-action">
//               <a href="#">Delete this Post</a>
//               <a href="#">Update this Post</a>
//             </div>
//           </div>
//         </div>
//       </div>`;
//       $("#main-body").html(card);
//     }
    
//     })
function getDay(){
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
