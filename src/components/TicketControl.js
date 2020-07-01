import React from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import Help from "./Help";
import Steps from "./Steps";
import Fifteen from "./Fifteen";


class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      masterTicketlist: [],
      counter: 0

    };

  }

  handleAddingNewTicketToList = (newTicket) => {
    const newsMasterTicketList = this.state.masterTicketlist.concat(newTicket);
    this.setState({
      masterTicketlist: newsMasterTicketList,
      counter: 0
    });
  }

  handleClick = () => {
    if (this.state.counter <= 3) {
      this.setState(prevState => ({
        counter: prevState.counter + 1

      }));
    } else {

      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage,
        counter: 0
      }));
    }
  }

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.counter === 0) {
      currentlyVisibleState = <TicketList ticketList={this.state.masterTicketlist} />
      buttonText = "Add ticket!";
    } else if (this.state.counter === 1) {
      currentlyVisibleState = <Help />
      buttonText = "Yes I've done the steps";
    } else if (this.state.counter === 2) {
      currentlyVisibleState = <Steps />
      buttonText = "Help me";
    } else if (this.state.counter === 3) {
      currentlyVisibleState = <Fifteen />
      buttonText = "Please, I've done it all";
    } else if (this.state.counter === 4) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />
      buttonText = "Return to List";
    }

    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

export default TicketControl;