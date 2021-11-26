import React from 'react';

import './CustomAmount.scss';

function CustomAmountModal(props) {
  const handleAmountChange = (e) => {
    props.handleAmountChange(e.target.value);
  };

  const handleBackDropClick = (e) => {
    if (e.target.className === 'backdrop') {
      props.handleAmountChange('');
      props.closeModal();
    }
  };

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    props.closeModal();
  };

  return (
    <div className="backdrop" onClick={handleBackDropClick}>
      <div className="custom-amount-modal">
        <form className="custom-amount-modal-content" onSubmit={handleSubmit}>
          <div className="custom-amount-modal-header">
            <h2>Custom Amount</h2>
            <button
              className="custom-amount-modal-close"
              onClick={props.closeModal}
            >
              x
            </button>
          </div>

          <div className="custom-amount-modal-body">
            <div className="custom-amount-modal-input">
              <input
                type="number"
                id="custom-amount"
                name="custom-amount"
                value={props.currentAmount}
                onChange={handleAmountChange}
                min="0.5"
                step="0.05"
              />
              <div className="modal-btns-wrapper">
                <button className="custom-amount-modal-submit" type="submit">
                  Submit
                </button>

                <button
                  className="custom-amount-modal-cancel"
                  onClick={props.closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomAmountModal;
