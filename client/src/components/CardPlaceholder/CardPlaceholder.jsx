import React from 'react';

import './CardPlaceholder.scss';

function CardPlaceholder(props) {
  return (
    <div className="CreditCard">
      <div>
        {/* <img
      className="type"
      src={this.returnRightImg(type)}
      alt="type of card"
    /> */}
      </div>
      <div className="card-number">
        •••• •••• •••• {props.paymentDetails.last4}
      </div>
      <div>
        Expires {props.paymentDetails.exp_month}/{props.paymentDetails.exp_year}
        {/* <span className="bank-name">{bank}</span> */}
        <div>{`${props.user.firstName} ${props.user.lastName}`}</div>
      </div>
    </div>
  );
}

export default CardPlaceholder;
