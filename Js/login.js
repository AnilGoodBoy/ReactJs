function checkForm()
  {

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if(username == "") {
      alert("Error: Username cannot be blank!");
      document.getElementById("username").focus();
      return false;
    }
    re = /^\w+$/;
    if(!re.test(username)) {
      alert("Error: Username must contain only letters, numbers and underscores!");
      document.getElementById("username").focus();
      return false;
    }

   
      if(password.length < 6) {
        alert("Error: Password must contain at least six characters!");
        document.getElementById("password").focus();
        return false;
      }
      if(password == username) {
        alert("Error: Password must be different from Username!");
        document.getElementById("password").focus();
        return false;
      }
      re = /[0-9]/;
      if(!re.test(password)) {
        alert("Error: password must contain at least one number (0-9)!");
        document.getElementById("password").focus();
        return false;
      }
      re = /[a-z]/;
      if(!re.test(password)) {
        alert("Error: password must contain at least one lowercase letter (a-z)!");
        document.getElementById("password").focus();
        return false;
      }
      re = /[A-Z]/;
      if(!re.test(password)) {
        alert("Error: password must contain at least one uppercase letter (A-Z)!");
        document.getElementById("password").focus();
        return false;
      }   


      if ( username == "anil1791" && password == "anil@1791"){
       // alert ("Login successfully");
        window.location = "index.html"; // Redirecting to other page.
        return false;
        }
        else{
            attempt --;// Decrementing by one.
           // alert("You have left "+attempt+" attempt;");
           alert("You have entered incorrect username & password");
            // // Disabling fields after 3 attempts.
            // if( attempt == 0){
            // document.getElementById("username").disabled = true;
            // document.getElementById("password").disabled = true;
            // document.getElementById("submit").disabled = true;
            // return false;
            // }
        }
   
    return true;
  }