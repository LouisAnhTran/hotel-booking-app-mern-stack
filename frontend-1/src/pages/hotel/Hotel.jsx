import React, { useContext, useState } from "react";

import { Navbar } from "../../components/navbar/Navbar";
import { Header } from "../../components/header/Header";
import "./hotel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocation,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { MailList } from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

import Reserve from "../../components/reserve/Reserve";

export const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  console.log(location.pathname.split("/")[2]);

  const [slideNumber, setSlideNumber] = useState();
  const [open, setOpen] = useState(false);
  const [openModal,setOpenModal]=useState(false);

  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8800/api/hotels/find/${id}`
  );

  // console.log(data);

  const navigate=useNavigate();

  const {dates,options}=useContext(SearchContext);

  console.log(dates);


  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);
  
  console.log(days);

  const handleArrow = (direction) => {
    let newIndex;

    if (direction === "d") {
      newIndex = slideNumber == 0 ? 5 : slideNumber - 1;
    } else {
      newIndex = slideNumber == 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newIndex);
  };

  const {user}=useContext(AuthContext);

  const handleClick=()=>{
    if(user){
      setOpenModal(true);
    }else{
      navigate("/login");
    }
  }



  return (
    <div>
      <Navbar></Navbar>
      <Header type="list"></Header>

      {loading ? (
        "Loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleArrow("d")}
              />
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleArrow("r")}
              />
            </div>
          )}

          <div className="hotelWrapper">
            <button className="bookNow" onClick={handleClick}>Reserve or Book Now </button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddresss">
              <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location – {data.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
            </span>

            <div className="hotelImages">
              {data.photos?.map((photo, index) => (
                <div className="hotelImgWrapper">
                  <img
                    src={photo}
                    onClick={() => {
                      setSlideNumber(index);
                      setOpen(!open);
                    }}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>

            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">
                 {data.desc}
                </p>
              </div>

              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${days*data.cheapestPrice*options.room}</b> ({days} nights)
                </h2>
                <button>Reserve or Book Now!</button>
              </div>
            </div>
          </div>

          <MailList></MailList>
          <Footer></Footer>
        </div>
      )}

      {openModal && (
        <>
        <Reserve setOpen={setOpenModal} hotelID={id}></Reserve>
        </>
      )}

    </div>
  );
};
