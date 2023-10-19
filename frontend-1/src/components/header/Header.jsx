import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faBed,
  faCalendar,
  faCalendarDay,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import _ from "lodash";

import "./header.css";
import { DateRange } from "react-date-range";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";


export const Header = ({ type }) => {
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openDate, setOpenDate] = useState(false);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [openOptions, setOpenOptions] = useState(false);

  const [destination,setDestination]=useState();


  const handleClick = (prop, direction) => {
    const newOptions = _.cloneDeep(options);
    direction == "i"
      ? (newOptions[prop] = options[prop] + 1)
      : (newOptions[prop] = options[prop] - 1);
    setOptions(newOptions);
  };

  const navigate=useNavigate();

  const {dispatch}=useContext(SearchContext);


  const handleSearch=()=>{
    dispatch({type: "NEW_SEARCH",payload: {destination,dates,options}})
    navigate('/hotels',{state: {destination,dates,options}});
  }

  const {user}=useContext(AuthContext);



  return (
    <div className="header">
      <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stay</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>

        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              A lifetime of discounts? It's genious
            </h1>

            <p className="headerDesc">
              Get rewarded for your travels - unclock instant saving of 10% or
              more with a free Louis Booking app account
            </p>

            {!user && (<button className="headerBtn">Sign in / Register</button>)}
            

            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  onChange={e=>setDestination(e.target.value)}
                ></input>
              </div>

              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  className="headerSearchText"
                  onClick={() => {setOpenDate(!openDate);
                  setOpenOptions(false);
                  }}
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>

                {openDate && !openOptions && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  ></DateRange>
                )}
              </div>

              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => {
                    setOpenOptions(!openOptions);
                    setOpenDate(false);
                  }}
                  className="headerSearchText"
                >{`${options.adult} adults,  ${options.children} children, ${options.room} rooms`}</span>

                {openOptions && !openDate && (
                  <div className="options">
                    <div className="options_item">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => {
                            handleClick("adult", "d");
                          }}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => {
                            handleClick("adult", "i");
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="options_item">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children == 0}
                          className="optionCounterButton"
                          onClick={() => {
                            handleClick("children", "d");
                          }}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => {
                            handleClick("children", "i");
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="options_item">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room == 1}
                          className="optionCounterButton"
                          onClick={() => {
                            handleClick("room", "d");
                          }}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => {
                            handleClick("room", "i");
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>Search</button>
              </div>
            </div>
          </>
        )}
        
      </div>
    </div>
  );
};
