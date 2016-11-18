export const NEW_MESSAGE = 'NEW_MESSAGE';
export const SET_USERNAME = 'SET_USERNAME';


export function newMessage(message) {
  console.log(message);
  return {
    type:  `server/${NEW_MESSAGE}`,
    payload: message
  };
}

export function setUsername(broadcast) {
  console.log(broadcast);
  return {
    type: `server/${SET_USERNAME}`,
    payload: {
      username: broadcast.username,
      notification: broadcast.notification
    }
  };
}