import React, { useContext, useState } from "react";
import "./BookingForm.css";
import { HotelContext } from "../../App";

export default function BookingForm(props) {
  const { bookingForm, setBookingForm, selectedHotel } = props;
  const hotels = useContext(HotelContext);
  const BookingForHotel = hotels[selectedHotel];
  const [isValid, setIsValid] = useState();
  const [isSuccess, setIsSuccess] = useState();

  //Used to validate the input before sumitting the data 
  const handleChange = (e) => {
    if (e.target.name === "fullname" && e.target.value.length > 0) {
      setIsValid(true);
    }
    if (e.target.name === "phone" && e.target.value.length >= 10) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const confirmHotel = (e) => {
    //To check if form is valid and then show sucess message
    if (isValid){
      setIsSuccess(true);
      // To close the message after 3 seconds
      setTimeout(() => {
        //To reset the form
        setIsSuccess(false);
        setIsValid(false);
        //To close the sucess message
        setBookingForm(false);
      }, 3000);
    }
    else {
      e.preventDefault();
      setIsSuccess(false);
    }
  };

  //To close the form
  const closeHotelBooking = () => {
    setBookingForm(false);
  };

  //To check if booking button clicked or not on slider 
  //We can use library like formik to handle form in better way
  if (!bookingForm) {
    return null;
  }
  return (
    <div className="modal">
      {isSuccess ?  
(<div className="sucess-message">{`Your booking for ${BookingForHotel.title} is confirmed.`}</div>) :
      (<form className="booking-form" autoComplete="off">
        {/* form header */}
        <div className="form-header">
          <div>
            <h1>{`Booking for ${BookingForHotel.title}`}</h1>
            <button onClick={() => closeHotelBooking()}>X</button>
          </div>
        </div>
        {/* form-body */}
        <div className="form-body">
          <div className="horizontal-group">
            <div className="form-group left">
              <label className="label-title"> First Name</label>
              <span className="error-message">*</span>
              <input
                type="text"
                name="FirstName"
                className="input-fields"
                placeholder="Please enter your name"
                required
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
            <div className="form-group right">
              <label className="label-title"> Last Name</label>
              <span className="error-message">*</span>
              <input
                type="text"
                name="LastName"
                className="input-fields"
                placeholder="Please enter your name"
                required
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="horizontal-group">
            <div className="form-group left">
              <label className="label-title"> Email</label>
              <input
                type="email"
                name="email"
                className="input-fields"
                autoComplete="off"
              />
            </div>
            <div className="form-group right">
              <label className="label-title"> Phone Number</label>
              <span className="error-message">*</span>
              <input
                type="text"
                name="phone"
                className="input-fields"
                placeholder="9999999999"
                required
                minLength={10}
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="horizontal-group">
            <div className="form-group left">
              <label className="label-title"> Number of Adults</label> <br />
              <input
                type="number"
                name="adults"
                className="input-fields"
              ></input>
            </div>
            <div className="form-group right">
              <label className="label-title"> Number of Children</label> <br />
              <input
                type="number"
                name="children"
                className="input-fields"
              ></input>
            </div>
          </div>
          <div className="horizontal-group">
            <div className="form-group left">
              <label className="label-title"> Check-in Date</label>
              <br />
              <input
                type="date"
                name="fromDate"
                className="input-fields"
              ></input>
            </div>
            <div className="form-group right">
              <label className="label-title"> Check-out Date</label> <br />
              <input type="date" name="toDate" className="input-fields"></input>
            </div>
          </div>
          <div className="form-group">
            <label className="label-title"> Payment Mode</label> <br />
            <select className="input-fields">
              <option defaultValue=""> Select payment method</option>
              <option>By Cash</option>
              <option>By Card</option>
              <option>Online</option>
            </select>
          </div>
        </div>
        {/* form-footer */}
        <div className="form-footer">
          <input
          type="submit"
            className="btnBookHotel btn"
            disabled={!isValid}
            onClick={confirmHotel}
            value="Confirm Booking"
          />
        </div>
      </form>)}
    </div>
  );
}
