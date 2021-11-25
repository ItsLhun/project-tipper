import React, { useState } from 'react';
import { enterRating } from '../../services/artist';
import './StarRating.scss';

function StarRating(props) {
  const [rating, setRating] = useState(props.rating || 0);

  const RateNow = async (index) => {
    setRating(index);
    try {
      // await enterRating(props.artist?._id, rating);
      console.log(rating);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!props.isLoggedIn && !props.rating && (
        <div className="star-rating">
          {[...Array(5)].map((star, index) => {
            return (
              <button
                type="button"
                key={index}
                className={index <= rating ? 'on' : 'off'}
                onClick={() => RateNow(index)}
              >
                <span className="star">&#9733;</span>
              </button>
            );
          })}
        </div>
      )}
      {!props.isLoggedIn && props.rating && (
        <div className="star-rating">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <span
                key={index}
                className={('star', index <= props.rating ? 'on' : 'off')}
              >
                &#9733;
              </span>
            );
          })}

          {/* <span>{props.artist.rating} ({props.ratings}) */}

          <span>4.3 (200)</span>
        </div>
      )}
      {props.isLoggedIn && (
        <div className="star-rating">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <span key={index} className="on">
                &#9733;
              </span>
            );
          })}
          <span>4.3 (200)</span>
        </div>
      )}
    </>
  );
}

export default StarRating;
