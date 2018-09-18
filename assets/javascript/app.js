// Initialize Firebase 
var config = {
    apiKey: CONTACT ME,
    authDomain: "database-employee.firebaseapp.com",
    databaseURL: "https://database-employee.firebaseio.com",
    projectId: "database-employee",
    storageBucket: "",
    messagingSenderId: "851299913633"
  };

  firebase.initializeApp(config);

  // Create a variable to reference the database
  var database = firebase.database();

  // Creating the initial variables
  var name = "";
  var role = "";
  var startDate = "";
  var randomFormat = "MM/DD/YYYY";
  var format = dateFns.format;
//   var convertedDate = format(startDate, randomFormat);
  var totalMonths = "";
  var monthlyRate = "";
  var totalBilled = "";

  // On click event to capture the button click
  $("#add-employee").on("click", function(event) {
        event.preventDefault();

        name = $("#name").val().trim();
        role = $("#role").val().trim();
        startDate = $("#start-date").val().trim();
        // totalMonths = parseFloat($("#total-months").val().trim());
        var convertedDate = format(startDate, randomFormat);
        console.log(convertedDate);
        totalMonths = dateFns.differenceInMonths(new Date(), new Date(convertedDate));
        monthlyRate = parseFloat($("#rate").val().trim());
        totalBilled = totalMonths * monthlyRate;

        database.ref().push({
            name: name,
            role: role,
            startDate, startDate,
            totalMonths: totalMonths,
            monthlyRate: monthlyRate,
            totalBilled: totalBilled,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
  });

  // Firebase watcher
  database.ref().on("child_added", function(childSnapshot) {

    var snapvalue = childSnapshot.val(); 

    console.log(snapvalue.name);
    console.log(snapvalue.role);
    console.log(snapvalue.startDate);
    console.log(snapvalue.totalMonths);
    console.log(snapvalue.monthlyRate);
    console.log(snapvalue.totalBilled);
    console.log(snapvalue.dateAdded);

    $("#data-table").append(
        "<tr>" +
        "<td>" + snapvalue.name + "</td>" +
        "<td>" + snapvalue.role + "</td>" +
        "<td>" + snapvalue.startDate + "</td>" +
        "<td>" + snapvalue.totalMonths + "</td>" +
        "<td>" + snapvalue.monthlyRate + "</td>" +
        "<td>" + snapvalue.totalBilled + "</td>" +
       "</tr>"
    )

  }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code)
  });
