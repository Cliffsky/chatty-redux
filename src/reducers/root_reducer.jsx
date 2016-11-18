import { combineReducers } from 'redux';
import setUsernameReducer from './set_username_reducer.jsx';
import userCountReducer from './user_count_reducer.jsx';
import newMessageReducer from './new_message_reducer.jsx';

const rootReducer = combineReducers({
  userCount: userCountReducer,
  messages: newMessageReducer,
  username: setUsernameReducer
});

export default rootReducer;
