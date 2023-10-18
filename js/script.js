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
      retrieveAndDisplayDeviceData();
    }
  });
}

// Function to retrieve and display device data
function retrieveAndDisplayDeviceData() {
  var devicesRef = database.ref(user.uid + '/devices');
  var deviceTableBody = document.getElementById('device-table-body');

  devicesRef.on('value', function(snapshot) {
    deviceTableBody.innerHTML = ''; // Clear existing table rows

    snapshot.forEach(function(childSnapshot) {
      var deviceData = childSnapshot.val();
      var device_id = childSnapshot.key;

      // Add a row to the device table
      var row = deviceTableBody.insertRow();
      var idCell = row.insertCell(0);
      var typeCell = row.insertCell(1);
      var latCell = row.insertCell(2);
      var lonCell = row.insertCell(3);
      var speedCell = row.insertCell(4);

      idCell.textContent = device_id;
      typeCell.textContent = deviceData.vehicle_type;
      latCell.textContent = deviceData.latitude;
      lonCell.textContent = deviceData.longitude;
      speedCell.textContent = deviceData.speed;

      // Add a click event listener to show details and place a marker on the map
      row.addEventListener('click', function() {
        var lat = deviceData.latitude;
        var lon = deviceData.longitude;

        // Remove any existing markers on the map
        map.eachLayer(function(layer) {
          if (layer instanceof L.Marker) {
            map.removeLayer(layer);
          }
        });

        // Place a marker on the map at the selected device's location
        L.marker([lat, lon], 12).addTo(map);
        map.setView([lat, lon], 12);
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




