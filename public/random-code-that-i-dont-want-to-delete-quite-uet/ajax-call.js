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
    })

//handlebars 

    <div class="container"id="current"><div class="container"><div class="h1">Your Current Offers:</div></div>
  
  
  
  {{#each salesData}}
  {{#unless soldBoolean}}
  {{#unless inTransaction}}
  <div class="row">
    <div class="col s12 m6">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">{{name}}</span>
          <p>Price: {{price}}</p>
          <p>Console: {{consoleType}}</p>
          <p>
            {{#if condition}}
            Condition: {{condition}}
            {{else}}
            You haven't specified the condition of this item!
            {{/if}}
          </p>
          <p>
            {{#if description}}
            Description: {{description}}
            {{else}}
             You haven't given a description of this item!
            {{/if}}
          </p>

        </div>
        <div class="card-action">
         <a class="waves-effect waves-light btn-small del-button" data-id={{id}}>Delete this Post</a>
          {{!-- <a href="#" class="update-post">Update this Post</a> --}}
        </div>
      </div>
    </div>
  </div>
  {{/unless}}
  {{/unless}}
  {{/each}}


  <div class = "container">
  <div class="row">
    <div class="col 12">

      <div class="container"id="current"class="h1 centered">Your Current Offers:</div>
      <table class="responsive-table highlight centered">
        <thead>
          <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Console</th>
              <th>Condition</th>
              <th>Description</th>
              <th>Delete?</th>

          </tr>
        </thead>
         
        <tbody>
          
            {{#each salesData}}
            {{#unless soldBoolean}}
            {{#unless inTransaction}}
            <tr>
            <td>{{name}} </td>
            <td>{{price}}</td>
            <td>{{consoleType}}</td>
            <td>{{#if condition}}
                  {{condition}}
                  {{else}}
                  You haven't specified the condition of this item!
                  {{/if}}</td>
            <td>{{#if description}}
                  {{description}}
                  {{else}}
                  You haven't given a description of this item!
                  {{/if}}</td>
            <td><a class="waves-effect waves-light btn-small del-button" data-id={{id}}>Delete this Post</a></td>
          
          </tr>
          {{/unless}}
          {{/unless}}
          {{/each}}
        </tbody>
      </table>  
      
    </div>
  </div>


  <div class="container" id="in-progress"><div class="h1">Your Transactions in Progress:</div>
 {{#each salesData}}
  {{#if inTransaction}}
  <div class="row">
    
    <div class="col s12 m6">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">{{name}}</span>
          <p>Price: {{price}} credits</p>
         
        </div>
        <div class="card-action">
          {{!-- <a class="waves-effect waves-light btn-small del-button" data-id={{id}}>Delete this Post</a> --}}
          {{!-- <a href="#">Update this Post</a> --}}
        </div>
      </div>
    </div>
  </div>
  {{/if}}
  {{/each}}
</div>


<div class="container" id="buy"><div class="h1">Your buy requests:</div>
 {{#each buyData}}
  
  <div class="row">
    <div class="col s12 m6">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">{{name}}</span>
          <p>Price: {{price}} credits</p>
          <p>Transaction started at: {{transactionStartedAtTime}} </p>

        </div>
        <div class="card-action">
          <a class="waves-effect waves-light btn-small feedback" data-id={{id}}>Give Feedback</a>
          {{!-- <a href="#">Update this Post</a> --}}
        </div>
      </div>
    </div>
  </div>
 
  {{/each}}
</div>



<div class="container" id="previous"><div class="h1">Your previous sales:</div>
 {{#each salesData}}
  {{#if soldBoolean}}
  <div class="row">
    <div class="col s12 m6">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">{{name}}</span>
          <p>Price: {{price}} credits</p>
          <p>Sold At: {{soldAtTime}} </p>

        </div>
        <div class="card-action">
          <a class="waves-effect waves-light btn-small del-button" data-id={{id}}>Delete this Post</a>
          {{!-- <a href="#">Update this Post</a> --}}
        </div>
      </div>
    </div>
  </div>
  {{/if}}
  {{/each}}
</div>

  

span class="card-title">Name: ${response[i].name}</span>
              <p>Price: ${response[i].price}</p>
              <p>Condition: ${response[i].condition}</p>
              <p>Console: ${response[i].consoleType}</p>
        
            </div>
            <div class="card-action">
              <a href="#" class="buy-button" data-id=${response[i].id}>Buy this Game</a>
            </div>
            <div id=${response[i].id}></div>
          </div>
        </div>
