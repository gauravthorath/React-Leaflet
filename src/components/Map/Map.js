import React, { useState, useContext, useRef, useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMapEvent } from "react-leaflet";
import * as L from "leaflet";
import { HotelContext } from "../../App";            

//To move selected area on map to center
function SetViewOnClick({ animateRef }) {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      pan: {
        animate: true,
        duration: 1.5,
      },
      zoom: {
        animate: true,
      },
    });
  });

  return null;
}

export default function ReactMap({ selectedHotel, setSelectedHotel }) {
  const hotels = useContext(HotelContext);
  const [activeHotel, setActiceHotel] = useState(null);
  const [map, setMap] = useState(null);
  const initPosition = [48.13621, 11.58774]; // default center on map load
  const locationOffset = 0.00175;   //offset value added to show selected marker on screen properly
  const animateRef = useRef(false); // To animate the panning

  //To highlight current seleted marker as per selected hotel card on slider
  useEffect(() => {
    setActiceHotel(selectedHotel);
    let targetHotel = hotels[selectedHotel];

    //To zoom over marker selected by hotel card in slider
    map &&
      map.flyTo(
        [targetHotel.position.lat - locationOffset, targetHotel.position.lng],
        16
      );
  }, [selectedHotel]);

  //To set active hotel to the state variable which is then used to highlight respective marker
  function setActiveMarker(e) {
    let hotelId = +e.target.options.id.slice(6);
    setActiceHotel(hotelId);
    //To pass selected hotel to highlight card on slider
    setSelectedHotel(hotelId);
  }

  //Bind the active or inactive icon to markers as per the active state variable
  function getMarkerIcon(index) {
    if (index === activeHotel)
      return createIcon("/assets/home-icon-active.svg", 40);
    return createIcon("/assets/home-icon.svg", 30);
  }

  //Create icon dynamically using image URL
  function createIcon(url, size) {
    return new L.Icon({
      iconUrl: url,
      iconSize: [size, size],
    });
  }

  return (
    // Making a map and tiles
    <MapContainer id="map" center={initPosition} zoom={15} whenCreated={setMap}>
      <TileLayer
        url="https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      ></TileLayer>

 {/* Plotting markers as per latitude and longitude fetched from service */}
      {hotels.map((hotel, i) => (
        <Marker
          key={hotel.title}
          id={`marker${i}`}
          position={[hotel.position.lat, hotel.position.lng]}
          icon={getMarkerIcon(i)}
          riseOnHover={true}
          eventHandlers={{
            click: (e) => {
              //To change the of market to selected
              setActiveMarker(e);
              //to set selected marker at the center of the map and zoom over it
              map &&
                map.flyTo(
                  [hotel.position.lat - locationOffset, hotel.position.lng],
                  16
                );
            },
          }}
        >
        </Marker>
      ))}

      <SetViewOnClick animateRef={animateRef} />
    </MapContainer>
  );
}
