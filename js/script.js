// // Ensure Firebase is initialized before using it
// var firebaseConfig = {
//   apiKey: "AIzaSyCKSpg6rEK-DJ0_XNmvxj_DAwfmeDE5XkE",
//   authDomain: "trial-6c107.firebaseapp.com",
//   databaseURL: "https://trial-6c107-default-rtdb.firebaseio.com",
//   projectId: "trial-6c107",
//   storageBucket: "trial-6c107.appspot.com",
//   messagingSenderId: "883705435651",
//   appId: "1:883705435651:web:f653819835e7c2f46fe036"
// };

// firebase.initializeApp(firebaseConfig);
// var database = firebase.database();
// var user = null;


// // Function to initialize the map and user authentication
// function initializeMap() {
//   firebase.auth().onAuthStateChanged(function (user) {
//     if (!user) {
//       // Redirect to the login page if the user is not authenticated
//       window.location.href = 'login.html';
//     } else {
//       var map = L.map('map').setView([23.7795, 90.4165], 8);
//       retrieveAndDisplayDeviceData(map);
//       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
//     }
//   });
// }

// // Function to retrieve and display device data
// function retrieveAndDisplayDeviceData(map) {
//   var devicesRef = database.ref();
//   var deviceTableBody = document.getElementById('device-table-body');

//   devicesRef.on('value', function (snapshot) {

//     deviceTableBody.innerHTML = ''; // Clear existing table rows
//     snapshot.forEach(function (childSnapshot) {

//       for (var user in childSnapshot.val()) {
//         for (var device in childSnapshot.val()[user]['devices']) {
//           console.log(childSnapshot.val()[user]['devices'][device])

//           var device_id = device;
//           var vehicle_type = childSnapshot.val()[user]['devices'][device].vehichle_type;
//           var lat = childSnapshot.val()[user]['devices'][device].latitude;
//           var lon = childSnapshot.val()[user]['devices'][device].longitude;
//           var speed = childSnapshot.val()[user]['devices'][device].speed;

//           L.marker([lat, lon]).addTo(map).bindPopup("Device ID: " + device_id); // Show a popup with device_id on marker click

//           // Add a row to the device table
//           var row = deviceTableBody.insertRow();
//           var idCell = row.insertCell(0);
//           var typeCell = row.insertCell(1);
//           var latCell = row.insertCell(2);
//           var lonCell = row.insertCell(3);
//           var speedCell = row.insertCell(4);

//           idCell.textContent = device_id;
//           typeCell.textContent = vehicle_type;
//           latCell.textContent = lat;
//           lonCell.textContent = lon;
//           speedCell.textContent = speed;

//           // Add a click event listener to show details and place a marker on the map
//           row.addEventListener('click', function () {
//             // Show details in an alert
//             alert("Device ID: " + device_id + "\nVehicle Type: " + vehicle_type + "\nLatitude: " + lat + "\nLongitude: " + lon + "\nSpeed: " + speed);
//             // Place a marker on the map
//             L.marker([lat, lon]).addTo(map);
//           });
//         }
//       }
//     });
//   });
// }

// // Function to log out the user
// function logout() {
//   firebase.auth().signOut().then(function () {
//     window.location.replace("login.html"); // Redirect to login page after logout
//   }).catch(function (error) {
//     console.error("Error logging out: ", error);
//   });
// }

// // Auto-refresh the device list every minute
// setInterval(retrieveAndDisplayDeviceData, 10000);

// // Ensure the DOM is ready before initializing the map
// window.addEventListener('DOMContentLoaded', function () {
//   initializeMap();
// });


// updated code


var firebaseConfig = {
  apiKey: "AIzaSyCKSpg6rEK-DJ0_XNmvxj_DAwfmeDE5XkE",
  authDomain: "trial-6c107.firebaseapp.com",
  databaseURL: "https://trial-6c107-default-rtdb.firebaseio.com",
  projectId: "trial-6c107",
  storageBucket: "trial-6c107.appspot.com",
  messagingSenderId: "883705435651",
  appId: "1:883705435651:web:f653819835e7c2f46fe036"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var user = null;
var map = null;

// Function to initialize the map and user authentication
function initializeMap() {
  firebase.auth().onAuthStateChanged(function(currentUser) {
    if (!currentUser) {
      // Redirect to the login page if the user is not authenticated
      window.location.href = 'login.html';
    } else {
      user = currentUser;
      map = L.map('map').setView([23.7795, 90.4165], 8);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

      // Retrieve and display device data
      retrieveAndDisplayDeviceData(map);
    }
  });
}

// Function to retrieve and display device data
function retrieveAndDisplayDeviceData(map) {
  var devicesRef = database.ref(user.uid + '/devices');
  var deviceTableBody = document.getElementById('device-table-body');

  devicesRef.on('value', function(snapshot) {
    deviceTableBody.innerHTML = ''; // Clear existing table rows

    snapshot.forEach(function(childSnapshot) {
      var deviceData = childSnapshot.val();
      var device_id = childSnapshot.key;
      var vehicle_type = deviceData.vehicle_type;
      var lat = deviceData.latitude;
      var lon = deviceData.longitude;
      var speed = deviceData.speed;

      L.marker([lat, lon]).addTo(map).bindPopup("Device ID: " + device_id); // Show a popup with device_id on marker click

      // Add a row to the device table
      var row = deviceTableBody.insertRow();
      var idCell = row.insertCell(0);
      var typeCell = row.insertCell(1);
      var latCell = row.insertCell(2);
      var lonCell = row.insertCell(3);
      var speedCell = row.insertCell(4);

      idCell.textContent = device_id;
      typeCell.textContent = vehicle_type;
      latCell.textContent = lat;
      lonCell.textContent = lon;
      speedCell.textContent = speed;

      // Add a click event listener to show details and place a marker on the map
      row.addEventListener('click', function() {
        // Show details in an alert
        alert("Device ID: " + device_id + "\nVehicle Type: " + vehicle_type + "\nLatitude: " + lat + "\nLongitude: " + lon + "\nSpeed: " + speed);
        // Place a marker on the map at the selected device's location
        L.marker([lat, lon]).addTo(map);
      });
    });
  });
}

function logout() {
  firebase.auth().signOut().then(function() {
    window.location.replace("login.html");
  }).catch(function(error) {
    console.error("Error logging out: ", error);
  });
}

// Ensure the DOM is ready before initializing the map
window.addEventListener('DOMContentLoaded', function() {
  initializeMap();
});



// firebase.initializeApp(firebaseConfig);
// var database = firebase.database();
// var user = null;

// // Function to initialize the map and user authentication
// function initializeMap() {
//   firebase.auth().onAuthStateChanged(function(currentUser) {
//     if (!currentUser) {
//       // Redirect to the login page if the user is not authenticated
//       window.location.href = 'login.html';
//     } else {
//       user = currentUser;
//       var map = L.map('map').setView([23.7795, 90.4165], 8);
//       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//       // Listen for child changes on the 'devices' node
//       var devicesRef = database.ref(user.uid + '/devices');
//       devicesRef.on('child_changed', function(snapshot) {
//         var deviceData = snapshot.val();
//         var device_id = snapshot.key;
//         var lat = deviceData.latitude;
//         var lon = deviceData.longitude;
//         var speed = deviceData.speed;
//         var vehicle_type = deviceData.vehicle_type;

//         // Update the device list and map marker
//         updateDeviceList(device_id, lat, lon, speed, vehicle_type);
//         updateMapMarker(map, lat, lon, device_id);
//       });

//       retrieveAndDisplayDeviceData(map);
//     }
//   });
// }

// function updateDeviceList(device_id, lat, lon, speed, vehicle_type) {
//   var deviceTableBody = document.getElementById('device-table-body');
//   var deviceRows = deviceTableBody.getElementsByTagName('tr');

//   // Loop through the existing rows to find the device with the matching device_id
//   for (var i = 0; i < deviceRows.length; i++) {
//     var row = deviceRows[i];
//     var idCell = row.cells[0];

//     if (idCell.textContent === device_id) {
//       // Update the corresponding row with the new data
//       var latCell = row.cells[1];
//       var lonCell = row.cells[2];
//       var speedCell = row.cells[3];
//       var typeCell = row.cells[4];

//       latCell.textContent = lat;
//       lonCell.textContent = lon;
//       speedCell.textContent = speed;
//       typeCell.textContent = vehicle_type;
//     }
//   }
// }

// function updateMapMarker(map, lat, lon, device_id) {
//   // Remove the old marker (if any) for the given device_id
//   var oldMarkers = map.getPane('markerPane').children;
//   for (var i = 0; i < oldMarkers.length; i++) {
//     var marker = oldMarkers[i];
//     if (marker.dataset.device_id === device_id) {
//       map.removeLayer(marker);
//       break;
//     }
//   }

//   // Add a new marker for the updated location
//   L.marker([lat, lon], { icon: createCustomIcon(device_id) })
//     .addTo(map)
//     .bindPopup("Device ID: " + device_id);
// }

// function retrieveAndDisplayDeviceData(map) {
//   var deviceTableBody = document.getElementById('device-table-body');
//   var devicesRef = database.ref(user.uid + '/devices');

//   // Clear the table rows before populating
//   deviceTableBody.innerHTML = '';

//   devicesRef.on('value', function(snapshot) {
//     snapshot.forEach(function(childSnapshot) {
//       var deviceData = childSnapshot.val();
//       var device_id = childSnapshot.key;
//       var lat = deviceData.latitude;
//       var lon = deviceData.longitude;
//       var speed = deviceData.speed;
//       var vehicle_type = deviceData.vehicle_type;

//       // Add a row to the device table
//       var row = deviceTableBody.insertRow();
//       var idCell = row.insertCell(0);
//       var typeCell = row.insertCell(1);
//       var latCell = row.insertCell(2);
//       var lonCell = row.insertCell(3);
//       var speedCell = row.insertCell(4);

//       idCell.textContent = device_id;
//       typeCell.textContent = vehicle_type;
//       latCell.textContent = lat;
//       lonCell.textContent = lon;
//       speedCell.textContent = speed;

//       // Add a click event listener to show details and place a marker on the map
//       row.addEventListener('click', function() {
//         alert("Device ID: " + device_id + "\nVehicle Type: " + vehicle_type + "\nLatitude: " + lat + "\nLongitude: " + lon + "\nSpeed: " + speed);
//         map.setView([lat, lon], 12);
//       });

//       // Add a marker to the map
//       L.marker([lat, lon], { icon: createCustomIcon(device_id) })
//         .addTo(map)
//         .bindPopup("Device ID: " + device_id);
//     });
//   });
// }

// function logout() {
//   firebase.auth().signOut().then(function() {
//     window.location.replace("login.html");
//   }).catch(function(error) {
//     console.error("Error logging out: ", error);
//   });
// }

// // Ensure the DOM is ready before initializing the map
// window.addEventListener('DOMContentLoaded', function() {
//   initializeMap();
// });




