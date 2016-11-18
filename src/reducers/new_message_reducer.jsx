import { NEW_MESSAGE } from '../actions/index.jsx';

export default function(state = [], action) {
  switch(action.type) {
    case NEW_MESSAGE:
      let message = {
        id: action.payload.id,
        username: action.payload.username,
        content: action.payload.content,
        color: action.payload.color,
        notification: action.payload.notification
      }
      return [...state, message];
  }
  return state;
}