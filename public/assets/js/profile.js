$(document).ready(function () {
    $("#sign-out").on("click", function() {
        Cookies.remove('loggedInCookie');
      })
});