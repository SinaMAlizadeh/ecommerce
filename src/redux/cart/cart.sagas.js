import { call , all , takeLatest , put} from 'redux-saga/effects';

import UerActionTypes from '../user/user.types';
import {clearCart} from './cart.actions';
import UserActionTypes from '../user/user.types';

export function* clearCartOnSignOut() {
    yield put(clearCart());
}

export function* onSingnOutSuccess(){
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS ,clearCartOnSignOut )
}

export function* cartSagas(){
    yield(all([
        call(onSingnOutSuccess)
    ]))
}