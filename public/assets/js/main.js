$(document).ready(function () {
  //added for authen getting the refernces to the form and input
  var loginForm = $("form.login");
  var emailInput = $("input.modal-email");
  var passwordInput = $("input.modal-password");

  //added for authen 
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };
    if (!userData.email || !userData.password) {
    return;
    }
    //loginUser needs to post to apilogin and redirect to the profile page 
    loginUser(user.Data.email, user.Data.password);
      emailinput.val("");
      passwordInput.val("");
    });

  //if we have an email and password we run userlogin function
  function loginUser(email, password) {
  $.post("/api/main", {
      email: email,
      password: password
    }).then(function(user) {
      //console.log(user);
      window.location.replace(data);
    }).catch(function(err) {
      res.json(err);
    
    });
  }

  if (Cookies.get('loggedInCookie') === "true") {
  } else {
    Cookies.set('loggedInCookie', true);
    $('#loginModal').modal({backdrop: 'static', keyboard: false});
  }

  $("#modal-sign-up").on("click", function () {
    window.location.href = "/signup";
  });

  $("#sign-out").on("click", function() {
    Cookies.remove('loggedInCookie');
  })

  var tr = $('<tr>');
  var $membersContainer = $(".table-body");
  var members = [];


  var tr = $('<tr>');
  var $membersContainer = $(".table-body");
  var members = [];

  function getUsers() {
    $.get("/api/members", function (data) {
      $membersContainer.empty();
      members = data;
      var rowsToAdd = [];
      for (var i = 0; i < members.length; i++) {
        rowsToAdd.push(
          '<tr>',
          `<td>${members[i].name}</td>`,
          `<td>${members[i].skillOne}</td>`,
          `<td>$${members[i].wageOne}</td>`,
          `<td>${members[i].skillTwo}</td>`,
          `<td>$${members[i].wageTwo}</td>`,
          `<td>${members[i].skillThree}</td>`,
          `<td>$${members[i].wageThree}</td>`,
          `<td>${members[i].email}</td>`,
          `<td>${members[i].phoneNumber}</td>`,
          '</tr>'
        );
      }
      $membersContainer.append(rowsToAdd);

    });
  };

  getUsers();

}); // end of document ready func
