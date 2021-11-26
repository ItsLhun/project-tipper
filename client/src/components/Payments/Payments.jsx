import { Component } from 'react';
import {
  Elements,
  ElementsConsumer,
  CardElement
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import './Payments.scss';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  },
  classes: {
    base: 'form-control',
    complete: 'form-control-success',
    empty: 'form-control-danger',
    focus: 'form-control-focus',
    invalid: 'form-control-danger'
  }
};

class NonInjectedPaymentForm extends Component {
  handleFormSubmission = (event) => {
    event.preventDefault();

    const { stripe, elements } = this.props;
    const cardElement = elements.getElement(CardElement);

    stripe
      .createPaymentMethod({
        type: 'card',
        card: cardElement
      })
      .then((result) => {
        const { paymentMethod, error } = result;
        if (error) {
          alert('There was an error processing your payment method details.');
          console.log(error);
        } else if (paymentMethod) {
          console.log(paymentMethod);
          this.props.onConfirmPaymentMethod({
            token: paymentMethod.id,
            card: paymentMethod.card
          });
        }
      })
      .catch((error) => {
        alert('Error');
        console.log(error);
      });
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmission}>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
        <button className={'save-changes-btn'}>Save Details</button>
      </form>
    );
  }
}

const STRIPE_PUBLIC_API_KEY = 'pk_test_f3duw0VsAEM2TJFMtWQ90QAT';

class Payments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stripePromise: loadStripe(STRIPE_PUBLIC_API_KEY)
    };
  }

  render() {
    return (
      <Elements stripe={this.state.stripePromise}>
        <ElementsConsumer>
          {({ stripe, elements }) => (
            <NonInjectedPaymentForm
              stripe={stripe}
              elements={elements}
              {...this.props}
            />
          )}
        </ElementsConsumer>
      </Elements>
    );
  }
}

export default Payments;
