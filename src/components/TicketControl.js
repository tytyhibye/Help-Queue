import React from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import Help from "./Help";
import Steps from "./Steps";
import Fifteen from "./Fifteen";
import TicketDetail from "./TicketDetail";
import EditTicketForm from './EditTicketForm';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as milko from './../actions';


class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      // formVisibleOnPage: false,
      // masterTicketList: [], // moved for redux (still handles local state)
      selectedTicket: null,
      editing: false
    };
  }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.masterTicketList[id];
    this.setState({ selectedTicket: selectedTicket });
  }

  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props; // deconstruct dispatch from this.props
    const { id, names, location, issue } = newTicket; // deconstruct values from newTicket to pass into action
    const action = milko.addTicket(newTicket);
    dispatch(action); // dispatched action and updates store
    const action2 = milko.toggleForm();
    dispatch(action2); // dispatch is asyncronous
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        selectedTicket: null,
        editing: false
      });
    } else{
      const { dispatch } = this.props;
      const action = milko.toggleForm();
      dispatch(action);
    }
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const { dispatch } = this.props;
    const action = milko.addTicket(ticketToEdit);
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({ editing: true });
  }

  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;
    const action = milko.deleteTicket(id);
    dispatch(action);
    this.setState({
      selectedTicket: null
    });
  }

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;

    if (this.state.editing) {
      currentlyVisibleState = <EditTicketForm ticket={this.state.selectedTicket} onEditTicket={this.handleEditingTicketInList} />
      buttonText = "Return to Ticket List";
    }
    else if (this.state.selectedTicket != null) {
      currentlyVisibleState =
        <TicketDetail
          ticket={this.state.selectedTicket}
          onClickingDelete={this.handleDeletingTicket}
          onClickingEdit={this.handleEditClick}
        />
      buttonText = "Return to Ticket List";
    } else if (this.props.formVisibleOnPage) {
      currentlyVisibleState =
        <TicketList
          ticketList={this.props.masterTicketList}
          onTicketSelection={this.handleChangingSelectedTicket}
        />
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
      currentlyVisibleState =
        <NewTicketForm
          onNewTicketCreation={this.handleAddingNewTicketToList}
        />
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

TicketControl.propTypes = {
  masterTicketList: PropTypes.object // The masterTicketList in our Redux store is an object so we define it as that prop type.
};

const mapStateToProps = state => {
  return {
    masterTicketList: state.masterTickerList,
    formVisibleOnPage: state.formVisibleOnPage // Key-value pairs of state to be mapped from Redux to React component go here.
  }
}
// we want masterTicketList from the store to be mapped to TicketControl's props.
TicketControl = connect(mapStateToProps)(TicketControl); // This ensures the TicketControl component has the mapStateToProps functionality when connect() redefines the component.

export default TicketControl;