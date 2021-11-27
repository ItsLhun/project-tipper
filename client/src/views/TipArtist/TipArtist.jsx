import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import CustomAmountModal from '../../components/Modals/CustomAmount/CustomAmount';

import { loadArtist } from '../../services/artist';
import { tipArtist } from '../../services/transaction';

import './TipArtist.scss';

function TipArtistView(props) {
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeBtn, setActiveBtn] = useState('two');
  const [currentAmount, setCurrentAmount] = useState(2);
  const [showCustomAmountModal, setShowCustomAmountModal] = useState(false);
  const [customAmounBtn, setCustomAmountBtn] = useState('');
  const [hasTipped, setHasTipped] = useState(false);

  useEffect(() => {
    loadArtist(props.match.params.id).then((artist) => {
      setArtist(artist);
      setLoading(false);
    });
  }, [props.match.params.id]);

  useEffect(() => {
    if (!props.user) {
      props.onUserRefresh();
    }
    if (props.match.params.id === props.user?._id) {
      props.history.push('/profile');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.id, props.user?._id, props.history]);

  const handleActiveBtnChange = (e) => {
    setActiveBtn(e.target.name);
    setCurrentAmount(e.target.value);
  };

  const handleAmountChange = (value) => {
    setCurrentAmount(value);
    if (!value) {
      setCustomAmountBtn('');
    } else {
      setCustomAmountBtn(`$ ${value}`);
    }
  };

  const handleCustomBtnClick = (e) => {
    setShowCustomAmountModal(true);
    handleActiveBtnChange(e);
  };

  const handleTip = async () => {
    console.log('Tipping artist with ID: ' + artist._id);
    console.log('The quantity is: ', currentAmount);
    try {
      const response = await tipArtist({
        token: props.user.paymentDetails.paymentToken,
        customerId: props.user.paymentDetails.stripeCustomerId,
        artistId: artist._id,
        amount: currentAmount
      });
      if (response.code === 200) {
        setHasTipped(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleTipAgain = () => {
    setHasTipped(false);
  };

  return (
    <div className="TipArtistView">
      <h2>Select amount</h2>
      {loading ? (
        <div>Loading details...</div>
      ) : (
        <>
          <div className="artist-info">
            <img src={artist.avatarUrl} alt={artist.firstName} />
            <h2>
              {artist.firstName} {artist.lastName}
            </h2>
            <em>{artist.bio}</em>
          </div>
          <div className="tip-amount">
            <button
              value={1}
              name="one"
              className={activeBtn === 'one' ? 'tip-active' : ''}
              onClick={handleActiveBtnChange}
            >
              $ 1
            </button>
            <button
              value={2}
              name="two"
              className={activeBtn === 'two' ? 'tip-active' : ''}
              onClick={handleActiveBtnChange}
            >
              $ 2
            </button>
            <button
              value={5}
              name="five"
              className={activeBtn === 'five' ? 'tip-active' : ''}
              onClick={handleActiveBtnChange}
            >
              $ 5
            </button>
            <button
              value={8}
              name="eigth"
              className={activeBtn === 'eigth' ? 'tip-active' : ''}
              onClick={handleActiveBtnChange}
            >
              $ 8
            </button>
            <button
              value={10}
              name="ten"
              className={activeBtn === 'ten' ? 'tip-active' : ''}
              onClick={handleActiveBtnChange}
            >
              $ 10
            </button>
            <button
              value={0}
              name="custom"
              className={activeBtn === 'custom' ? 'tip-active' : ''}
              onClick={handleCustomBtnClick}
            >
              {customAmounBtn || '...'}
            </button>
          </div>
        </>
      )}
      {(props.user?.paymentDetails?.paymentToken && !hasTipped && (
        <button className="tip-btn" onClick={handleTip}>
          Send a Tip
        </button>
      )) ||
        (hasTipped && props.user?.paymentDetails?.paymentToken && (
          <>
            <button className="tip-successful">Tip sent!</button>
            <button className="tip-again" onClick={handleTipAgain}>
              Tip again?
            </button>
          </>
        )) || (
          <>
            <div className="tip-warning no-method">
              Tipping is not possible: You need to set a payment method before
              tipping.
              <Link to="/profile">Add payment method</Link>
            </div>
            <button className="tip-btn disabled-tip-btn">Send a Tip</button>
          </>
        )}

      <div className="tip-warning">
        This action is not reversible, please check the amount before tipping.
      </div>
      {showCustomAmountModal && (
        <CustomAmountModal
          showModal={showCustomAmountModal}
          closeModal={() => setShowCustomAmountModal(false)}
          currentAmount={currentAmount}
          handleAmountChange={handleAmountChange}
        />
      )}
    </div>
  );
}

export default TipArtistView;
