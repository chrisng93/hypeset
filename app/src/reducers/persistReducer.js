/**
 * Create persist reducer
 */

const initialState = {
  rehydrated: false,
};

export default function persist(state = initialState, action) {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return { rehydrated: true };

    default:
      return state;
  }
}
