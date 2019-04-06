
$(document).ready(function(){
$("#sign-up-submit").on("click",function(e){
    e.preventDefault();
    var firstName=$("#first-name").val().trim();
    var lastName=$("#last-name").val().trim();
    var username=$("#username").val().trim();
    var address=$("#address").val().trim();
    var password=$("#password").val();
    var confirmPassword=$("#confirm-password").val();
    var email=$("#email").val().trim();

    if(password.length<6){
        $(".pass-div").empty();
        var str=$("<p>");
        str.css("color","red");
        str.text("Passwords less than 6 characters are not allowed!")
        $(".pass-div").append(str);
    }else if(firstName.length<2||firstName.length>50){
            $(".first-name-div").empty();
            var str=$("<p>");
        str.css("color","red");
        str.text("First name must be between 2 and 50 characters")
        $(".first-name-div").append(str);
    }else if(lastName.length<2||lastName.length>50){
            $(".last-name-div").empty();
        var str=$("<p>");
        str.css("color","red");
        str.text("Last name must be between 2 and 50 characters")
        $(".last-name-div").append(str);
    }else if(username.length<2||username.length>20){
            $(".username-div").empty();
            var str=$("<p>");
        str.css("color","red");
        str.text("Username must be between 2 and 20 characters!")
        $(".username-div").append(str);
    }else if(email.length<2||email.length>100){
            $(".email-div").empty();
            var str=$("<p>");
        str.css("color","red");
        str.text("email must be between 2 and 100 characters!")
        $(".email-div").append(str);
    }else if(password!==confirmPassword){
        $(".pass-div").empty();
        var str=$("<p>");
        str.css("color","red");
        str.text("Passwords do not match!")
        $(".pass-div").append(str);
    } else{
        $(".pass-div").empty();
        $(".username-div").empty();
        $(".last-name-div").empty();
        $(".first-name-div").empty();

        if(address===""){
            address=null;
        }
        var userObject={
            firstName:firstName,
            lastName:lastName,
            username:username,
            address:address,
            email:email,
            password:password,
            
        }
        console.log(userObject);
        $.ajax({method:"POST",url:"/api/signup",data:userObject}).then(function(response){

        });
    }

    console.log(firstName);
})
});
