import React, { useContext, useState, useEffect } from "react";
import "./Slider.css";
import { HotelContext } from "../../App";

export default function Slider({
  selectedHotel,
  setSelectedHotel,
  setBookingForm,
}) {
  const hotels = useContext(HotelContext);
  const [selectedPrevCard, setSelectedPrevCard] = useState(null);
  
  useEffect(() => {

    //To set selected hotel on slider bar as per selcted marker on map
    if (selectedHotel != null) {
      var selectedCard = document.getElementById(selectedHotel);
      selectedCard.style.boxShadow = "5px 2px 20px 10px";
      selectedCard.style.background = "rgb(231, 206, 249)";
    }
    //To reset previously selected card when selected by markers on maps
    if (selectedPrevCard !== +selectedHotel) {
      var prevSelectedCard = document.getElementById(selectedPrevCard);
      if (selectedPrevCard !== null && prevSelectedCard !== null) {
        prevSelectedCard.style.boxShadow = "";
        prevSelectedCard.style.background = "";
      }
      setSelectedPrevCard(selectedHotel);
      if (selectedPrevCard > +selectedHotel) {
        slideLeft((selectedPrevCard - +selectedHotel) * 295);
      } else if (selectedPrevCard < +selectedHotel) {
        slideRight((+selectedHotel - selectedPrevCard) * 295);
      }
    }
  }, [selectedHotel]);

  const selectHotel = (id) => {
    //To highlight selected card
    var selectedCard = document.getElementById(id);
    selectedCard.style.boxShadow = "5px 2px 20px 10px";
    selectedCard.style.background = "rgb(231, 206, 249)";

    //To pass selected hotel to map's marker to highlight
    setSelectedHotel(id);

    //To reset previously selected card when selected on cards on sliders
    if (selectedPrevCard !== +selectedCard.id) {
      var prevSelectedCard = document.getElementById(selectedPrevCard);
      if (selectedPrevCard !== null && prevSelectedCard !== null) {
        prevSelectedCard.style.boxShadow = "";
        prevSelectedCard.style.background = "";
      }
      setSelectedPrevCard(id);
    }
  };

  //To open hotel booking form
  const bookHotel = (selectedhotel) => {
    setBookingForm(true);
    setSelectedHotel(selectedhotel);
  };

  const slideLeft = (stepValue) => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - stepValue;
  };

  const slideRight = (stepValue) => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + stepValue;
  };

  return (
    <div id="slider-container">
      <input
        type="button"
        className="slider-icon left"
        onClick={() => slideLeft(295)}
      />
      <div id="slider">
        {hotels.map((hotel, i) => {
          return (
            <div
              key={i}
              id={i}
              className={`slider-card`}
              onClick={() => selectHotel(i)}
            >
              <table cellSpacing="0">
                <tbody>
                  <tr>
                    <td rowSpan="4">
                      <img
                        className="slider-card-image"
                        src={
                          process.env.REACT_APP_ROOT_URL_ + "assets/hotel.jpg"
                        }
                        alt="Hotel"
                      />
                    </td>
                    <td>
                      <span className="slider-card-title">{hotel.title}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="slider-card-distance">
                        {hotel.distance} km from the city center
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="slider-card-amount">
                        &#163;{Math.floor(Math.random() * 100) + 1}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="slider-card-note">Designs may vary</span>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <input
                        type="button"
                        className="btnBookHotel"
                        onClick={() => bookHotel(hotel)}
                        value="Book"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
      <input
        type="button"
        className="slider-icon right"
        onClick={() => slideRight(295)}
      />
    </div>
  );
}
