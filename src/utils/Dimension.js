import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

export const Device = {
    width: windowWidth,
    height: windowHeight
}