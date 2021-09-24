import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import orderDMReducer from './Pages/DeliveryManager/orderDM-slice';
import orderSupReducer from './Pages/Supplier/orderSup-slice';
import inventoriesReducer from './Pages/InventoryM/inventory-slice';
import policiesReducer from './Pages/Policy/policy-slice';
import usersReducer from './Pages/LoginSignup/user-slice';
import newUsersReducer from './Pages/NewUser/newUser-slice';
import siteReducer from './Pages/Site/site-slice';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    orderDM: orderDMReducer,
    orderSup: orderSupReducer,
    inventories: inventoriesReducer,
    policies: policiesReducer,
    users: usersReducer,
    newUsers: newUsersReducer,
    sites: siteReducer
  });
}
