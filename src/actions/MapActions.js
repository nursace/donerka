import { Dimensions } from 'react-native';
import {
  POSITION_CHANGED,
} from './types';

const { width, height } = Dimensions.get('window');

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const latitudeDelta = 0.0922;
const longitudeDelta = latitudeDelta * ASPECT_RATIO;


export const positionChanged = (position) => {
  const latitude = parseFloat(position.coords.latitude);
  const longitude = parseFloat(position.coords.longitude);

  const coordinates = { latitude, longitude, latitudeDelta, longitudeDelta };

  return { type: POSITION_CHANGED, payload: coordinates };
};
