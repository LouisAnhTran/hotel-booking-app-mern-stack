import React from "react";

import "./featureProperties.css";
import useFetch from "../../hooks/useFetch";

export const FeaturedProperties = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8800/api/hotels?featured=false&limit=4"
  );

  return (
    <div className="fp">
      {loading ? (
        "Loading, please wait..."
      ) : (
        <>
          {data &&
            data.map((item, index) => (
              <>
                <div className="fpItem" key={index}>
                  <img
                    src={item.photos[0]}
                    alt=""
                    className="fpImg"
                  />
                  <span className="fpName">{item.name}</span>
                  <span className="fpCity">{item.city}</span>
                  <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
                  {item.rating && (
                     <div className="fpRating">
                     <button>{item.rating}</button>
                     <span>Excellent</span>
                   </div>
                  )}
                 
                </div>
              </>
            ))}
        </>
      )}
    </div>
  );
};
