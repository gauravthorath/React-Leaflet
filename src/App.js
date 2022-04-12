import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import ReactMap from "./components/Map/Map";
import Slider from "./components/Slider/Slider";
import BookingForm from "./components/BookingForm/BookingForm";

export const HotelContext = React.createContext();

function App() {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState();
  const [bookingForm, setBookingForm] = useState(false);

  let props = {
    selectedHotel: selectedHotel,
    setSelectedHotel: setSelectedHotel,
    bookingForm: bookingForm,
    setBookingForm: setBookingForm,
  };

  const url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // Fetch data from service
    getHotelList();
  }, []);

  // service call to fetch hotels data from service
  async function getHotelList() {
    fetch(url)
    .then(response => {
      if(!response.ok) {
        throw Error(`Error! ${response.status}`)
      }
      return response.json();
    })
    .then(data =>{
      setHotels(data.items);
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <div className="App">
      <Header></Header>
      <HotelContext.Provider value={hotels}>
        <ReactMap {...props} data-testid="map"></ReactMap>
        <Slider {...props} data-testid="slider"></Slider>
        <BookingForm {...props} data-testid="bookingform"></BookingForm>
      </HotelContext.Provider>
    </div>
  );
}

export default App;
