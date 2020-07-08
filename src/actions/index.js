import * as milka from './../actions/ActionTypes';

export const deleteTicket = id => ({
  type: milka.DELETE_TICKET,
  id
});

export const toggleForm = () => ({
  type: milka.TOGGLE_FORM
});

export const addTicket = (ticket) => {
  const { names, location, issue, id } = ticket;
  return {
    type: milka.ADD_TICKET,
    names: names,
    location: location,
    issue: issue,
    id: id

  }
}