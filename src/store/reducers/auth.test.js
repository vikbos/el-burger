import reducer from './auth';
import * as actionTypes from '../actions/constants';

describe('auth reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    })
  })

  it('stores token upon login', () => {
    expect(reducer({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    }, {
      type: actionTypes.AUTH_SUCCESS,
      idToken: 'some token',
      userId: 'some id'
    })).toEqual({
      token: 'some token',
      userId: 'some id',
      error: null,
      loading: false,
      authRedirectPath: '/'
    })
  })
})
