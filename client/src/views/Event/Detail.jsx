import React, { useState } from 'react';
import { listDetail } from './../../services/event';

function EventDetail(props) {
  const [event, setEvent] = useState();

  const getEvent = async () => {
    try {
      const response = await listDetail(props.match.params.id);
      await setEvent([response]);
      console.log(typeof event);
      console.log(event);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      Here is the DETAIL event
      {/* <h1>{this.state.event.title}</h1> */}
      {/* {this.state.event && (
        <>
          <h1>{this.state.event.title}</h1>
        </>
      )} */}
    </div>
  );
}

// componentDidMount() {
//   listDetail(this.props.match.params.id)
//     .then((event) => {
//       this.setState({ event });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

export default EventDetail;
