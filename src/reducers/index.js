import formVisibleReducer from './form-visible-reducer';
import ticketListReducer from './ticket-list-reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ // Takes Object as argument
  formVisibleOnPage: formVisibleReducer, // object is key value pairs
  masterTicketList: ticketListReducer // state slice : reducer that handles actions related to state slice
});

export default rootReducer;