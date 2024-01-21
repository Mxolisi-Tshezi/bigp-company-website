function submitToAPI(e) {
  e.preventDefault();

  var name = /[A-Za-z]{1}[A-Za-z]/;
  var email = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
  var subject = /[0-9]{10}/;
  var message = /[A-Za-z]{1}[A-Za-z]/;

  var nameVal = $("#name").val();
  var emailVal = $("#email").val();
  var subjectVal = $("#subject").val();
  var messageVal = $("#message").val();

  var data = {
    name: nameVal,
    email: emailVal,
    subject: subjectVal,
    message: messageVal,
  };

  var isValid = true;

  if (nameVal === "") {
    // Display notification for missing name
    $("#alert").show();
    $("#sentM").hide();
    $("#lblAlert").text("Name is required");
    isValid = false;
  } else if (nameVal.length < 2) {
    // Display notification for name validation error
    $("#alert").show();
    $("#sentM").hide();
    $("#lblAlert").text("Name should have 2 or more characters");
    isValid = false;
  }

  if (subjectVal === "") {
    // Display notification for missing subject
    $("#alert").show();
    $("#sentM").hide();
    $("#lblAlert").text("Subject is required");
    isValid = false;
  } else if (subjectVal.length < 2) {
    // Display notification for subject validation error
    $("#alert").show();
    $("#sentM").hide();
    $("#lblAlert").text("Subject should have 2 or more characters");
    isValid = false;
  }

  if (emailVal === "") {
    // Display notification for missing email
    $("#alert").show();
    $("#sentM").hide();
    $("#lblAlert").text("Email is required");
    isValid = false;
  } else if (!emailVal.match(email)) {
    // Display notification for email validation error
    $("#alert").show();
    $("#sentM").hide();
    $("#lblAlert").text("Email address is invalid.");
    isValid = false;
  }

  if (messageVal === "") {
    // Display notification for missing message
    $("#alert").show();
    $("#sentM").hide();
    $("#lblAlert").text("Message is required");
    isValid = false;
  } else if (messageVal.length < 2) {
    // Display notification for message validation error
    $("#alert").show();
    $("#sentM").hide();
    $("#lblAlert").text("Message should have 2 or more characters");
    isValid = false;
  }

  if (isValid) {
    // Show the loading indicator
    $("#loading-indicator").css("display", "block");

    var url =
      "https://kv3vfrc4hh.execute-api.us-east-1.amazonaws.com/test/email";

    $.ajax({
      url: url,
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(data),
      crossDomain: true,

      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Access-Control-Allow-Origin",
          "https://big-p-communications.netlify.app/#[object%20Object]"
        );
        xhr.setRequestHeader("Access-Control-Allow-Methods", "POST");
        xhr.setRequestHeader("Access-Control-Allow-Headers", "Content-Type");
      },

      success: function (result) {
        // Hide the loading indicator
        $("#loading-indicator").css("display", "none");

        // Success handling
        $("#sentM").hide();
        $("#alert").hide();
        $("#success-message")
          .text("Your message has been sent. Thank you!")
          .css("display", "block");
        $("#name").val("");
        $("#subject").val("");
        $("#email").val("");
        $("#message").val("");

        setTimeout(function () {
          $("#success-message").css("display", "none");
        }, 5000);
      },
      error: function (result) {
        // Hide the loading indicator
        $("#loading-indicator").css("display", "none");

        // Error handling (your existing code)
      },
    });
  }
}
