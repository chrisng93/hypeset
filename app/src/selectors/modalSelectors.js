/**
 * Created by chrisng on 3/25/17.
 */
import { createSelector } from 'reselect';

const modalStateSelector = state => state.modal;

export const signInStateSelector = createSelector(
  modalStateSelector,
  modalState => modalState.signInModal
);

export const signedOutStateSelector = createSelector(
  modalStateSelector,
  modalState => modalState.signedOutModal
);
