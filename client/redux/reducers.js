import { createStore } from 'redux';
import { combineReducers } from 'redux';

const initialPosition = (initialState = {pos:  {lat: 30.2672, lng: -97.7431}}) => initialState;

export const mapUpdater = (map = 'hello i died') =>
  {return {map: map, type: "GMAP"}};

const updateMap = (state = [], action) => {
  switch (action.type) {
  case 'GMAP':
    return [
      ...state,
      {
        map: action.map
      }
    ]
  default:
    return state
  }
}

export const googleUpdater = (google = 'default') =>
  {return {google: google, type: 'GOOGLE'}};

const updateGoogle = (state = [], action) => {
  switch (action.type) {
  case 'GOOGLE':
    return [
      ...state,
      {
        google: action.google
      }
    ]
  default:
    return state
  }
}

export const markerUpdater = (marker = 'default') =>
  {return {marker: marker, type: "GMARKER"}};

const updateMarker = (state = [], action) => {
  switch (action.type) {
  case 'GMARKER':
    return [
      ...state,
      {
        marker: action.marker
      }
    ]
  default:
    return state
  }
}

const allReducers = combineReducers({
  initialPosition, updateMap, updateGoogle, updateMarker
})

const configureStore = () => {
  const store = createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  return store;
};

export const store = configureStore();
