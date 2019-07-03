import * as actionTypes from './constants';
// import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  }
}

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  }
}

export const purchaseBurger = (orderData, token) => {
  return {
    type: actionTypes.PURCHASE_BURGER,
    orderData,
    token
  }
}

// THUNK MIDDLEWARE
// export const purchaseBurger = (orderData, token) => {
//   return dispatch => {
//     dispatch(purchaseBurgerStart())
//     axios.post('/orders.json?auth=' + token, orderData)
//     .then(response => {
//       //console.log('response',response)
//       dispatch(purchaseBurgerSuccess(response.data.name, orderData))
//     })
//     .catch(error => {
//       dispatch(purchaseBurgerFail(error))
//     })
//   }
// }

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
}

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  }
}

export const fetchOrdersStart = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrders = (token, userId) => {
  return {
    type: actionTypes.FETCH_ORDERS,
    token,
    userId
  }
}

// export const fetchOrders = (token, userId) => {
//   return dispatch /*getState //to fetch token from state*/=> {
//     dispatch(fetchOrdersStart())
//     const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
//     axios.get(`/orders.json${queryParams}`)
//     .then(res => {
//       const fetchedOrders = [];
//       for(let key in res.data) {
//         fetchedOrders.push({
//           ...res.data[key],
//           id: key
//         })
//       }
//       //console.log('res', res);
//       dispatch(fetchOrdersSuccess(fetchedOrders))
//     })
//     .catch(error => {
//       dispatch(fetchOrdersFail(error))
//     })
//   }
// }
