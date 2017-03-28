/**
 * Created by chrisng on 3/28/17.
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
