import React, { useState } from 'react';
import './StarRating.scss';

function StarRating(props) {
  const [rating, setRating] = useState(0);

  return (
    <>
      {!props.isLoggedIn && (
        <div className="star-rating">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={index <= rating ? 'on' : 'off'}
                onClick={() => setRating(index)}
              >
                <span className="star">&#9733;</span>
              </button>
            );
          })}
          <span>4.3 (200)</span>
        </div>
      )}
      {props.isLoggedIn && (
        <div className="star-rating">
          {[...Array(5)].map((star) => {
            return <span className="on">&#9733;</span>;
          })}
          <span>4.3 (200)</span>
        </div>
      )}
    </>
  );
}

export default StarRating;
