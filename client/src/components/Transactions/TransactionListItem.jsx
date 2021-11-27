import React from 'react';

function TransactionListItem(props) {
  return (
    <div className="UserProfileView_transaction">
      <div className="UserProfileView_transaction_left">
        <div className="UserProfileView_transaction_concept">
          {`Tip to: ${props.transaction.artistTipped.firstName} ${props.transaction.artistTipped.lastName}`}
        </div>
        <div className="UserProfileView_transaction_date">
          {props.transaction.date.split('T')[0]}
        </div>
      </div>
      <div className="UserProfileView_transaction_right">
        <div className="UserProfileView_transaction_amount">
          {`$ ${props.transaction.amount}`}
        </div>
      </div>
    </div>
  );
}

export default TransactionListItem;
