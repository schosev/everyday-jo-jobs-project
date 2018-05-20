// pulls data from signup page

$(document).ready(function () {
    var email;
    var password;
    var name;
    var phoneNumber;
    var city;
    var state;
    var completelyFilledOut = false;
    var skillOne;
    var skillTwo;
    var skillThree;
    var wageOne;
    var wageTwo;
    var wageThree;
    var imgUrl;

    function checkFormFields() {
        email = $('#signup-email').val().trim();
        password = $('#signup-password').val().trim();
        name = $('#signup-name').val().trim();
        phoneNumber = $('#signup-phone').val().trim();
        city = $('#inputCity').val().trim();
        state = $('#inputState').val().trim();
        imgUrl = $('#inputUrl').val().trim();


        // evaluating each field in the form for data
        if (password.length === 0) {
            $('#error-msg').append("<p>Please enter a password.</p>");
        } else if (name.length === 0) {
            $('#error-msg').append("<p>Please enter a name.</p>");
        } else if (phoneNumber.length === 0) {
            $('#error-msg').append("<p>Please enter a phone number.</p>");
        } else if (city.length === 0) {
            $('#error-msg').append("<p>Please enter a city.</p>");
        } else if (state.length === 0) {
            $('#error-msg').append("<p>Please enter a state.</p>");
        } else if (imgUrl.length === 0) {
            $('#error-msg').append("<p>Please enter a image URL.</p>");
        } else {
            completelyFilledOut = true;
        }
    } // end of checkFormFields function

    // checking hourly wage box
    function checkHourlyWage() {
        wageOne = $('#wageOne').val();
        wageTwo = $('#wageTwo').val();
        wageThree = $('#wageThree').val();

        if(wageOne === NaN || wageOne <= 0) {
            $('#error-msg').append("<p>Please enter a valid hourly rate for the first skill.</p>");
            completelyFilledOut = false;
        } else if(wageTwo === NaN || wageTwo <= 0) {
            $('#error-msg').append("<p>Please enter a valid hourly rate for the second skill.</p>");
            completelyFilledOut = false;
        } else if(wageThree === NaN || wageThree <= 0) {
            $('#error-msg').append("<p>Please enter a valid hourly rate for the third skill.</p>");
            completelyFilledOut = false;
        }
    }

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }
      
      function checkEmail() {
        var email = $("#signup-email").val();
      
        if (validateEmail(email)) {
        } else {
          $('#error-msg').append("<p>Please enter a valid email.</p>");
          completelyFilledOut = false;
        }
      }

    // check skills boxes
    function checkSkillsBoxes() {
        skillOne = $('.skillOne :selected').val();
        skillTwo = $('.skillTwo :selected').val();
        skillThree = $('.skillThree :selected').val();
        
        if (skillOne === '-' || skillTwo === '-' || skillThree === '-') {
            $('#error-msg').append("<p>Please select all three skills.</p>");
            completelyFilledOut = false;
        }
    }

    function createMember(User) {
        $.post("/api/members/", User, function() {
            window.location.href = "/";
        })
      };

    $('#signup-submit').on('click', function () {
        event.preventDefault();
        $('#error-msg').text("");
        checkFormFields();
        checkSkillsBoxes();
        checkHourlyWage();
        checkEmail();
        if(completelyFilledOut === true) {
            var newUser = {
                name: name,
                email: email,
                password : password,
                phoneNumber: phoneNumber,
                city: city,
                state: state,
                skillOne: skillOne,
                skillTwo: skillTwo,
                skillThree: skillThree,
                wageOne: wageOne,
                wageTwo: wageTwo,
                wageThree: wageThree,
                imgUrl: imgUrl
            };
            createMember(newUser);
        } else {
            $('#errorModal').modal('show');
        }
    }); // end of submit button clicked
}); // end of document ready function