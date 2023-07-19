(g => { var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window; b = b[c] || (b[c] = {}); var d = b.maps || (b.maps = {}), r = new Set, e = new URLSearchParams, u = () => h || (h = new Promise(async (f, n) => { await (a = m.createElement("script")); e.set("libraries", [...r] + ""); for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]); e.set("callback", c + ".maps." + q); a.src = `https://maps.${c}apis.com/maps/api/js?` + e; d[q] = f; a.onerror = () => h = n(Error(p + " could not load.")); a.nonce = m.querySelector("script[nonce]")?.nonce || ""; m.head.append(a) })); d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)) })
    ({ key: 'AIzaSyAV9sbD6b0gEkPElkxTEmqTp7tQaT7eACA', v: "beta" });

const newFormHandler = async event => {
  event.preventDefault()
  const form = document.querySelector('.new-run-form')
  if (!form.checkValidity()) {
    event.stopPropagation()
  }
  else {
    form.classList.add('was-validated')

    const name = document.querySelector('#run-name').value.trim()
    const distance = document.querySelector('#run-distance').value.trim()
    const time = document.querySelector('#run-time').value.trim()

    if (name && distance && time) {
      // if distance entered is an integer, need to add a decimal to convert it like so
      // ex: user enters 2 for 2 miles ran. Need to convert this to 2.0
      // this type needs to match the type set in the DB model or else it will break
      const distanceDecimal = parseInt(distance).toFixed(1)
      const response = await fetch(`/api/runs`, {
        method: 'POST',
        body: JSON.stringify({
          name: name,
          distance_ran: distanceDecimal,
          time_ran: time
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.ok) {
        document.location.replace('/run')
      } else {
        alert('Failed to create run')
      }
    }
  }
}

const delButtonHandler = async event => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id')

    const response = await fetch(`/api/runs/${id}`, {
      method: 'DELETE'
    })

    if (response.ok) {
      document.location.replace('/run')
    } else {
      alert('Failed to delete run')
    }
  }
}

// Google Maps API
// Initialize and add the map
let map;
let markers = [];

async function initMap() {
  // The location of San Diego
  const position = { lat: 32.7157, lng: -117.1611 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 10,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  // const marker = new AdvancedMarkerElement({
  //   map: map,
  //   position: position,
  //   title: "San Diego",
  // });

  map.addListener("click", (event) => {
    addMarker(event.latLng);
  });
  // add event listeners for the buttons
  document
    .getElementById("show-markers")
    .addEventListener("click", showMarkers);
  document
    .getElementById("hide-markers")
    .addEventListener("click", hideMarkers);
  document
    .getElementById("delete-markers")
    .addEventListener("click", deleteMarkers);
  // Adds a marker at the center of the map.
  addMarker(position);
}

function addMarker(position) {
  const marker = new google.maps.Marker({
    position,
    map,
  });

  markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function hideMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  hideMarkers();
  markers = [];
}

document
  .querySelector('.new-run-form')
  .addEventListener('submit', newFormHandler)

  if (document.querySelector('.run-list')) {
    document.querySelector('.run-list').addEventListener('click', delButtonHandler)
  }


initMap()