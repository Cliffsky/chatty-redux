export default function (state = null, action) {
  switch (action.type) {
    case 'USERCOUNT':
      return action.payload
  }
  return state
}