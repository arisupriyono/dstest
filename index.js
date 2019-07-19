import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import app from './app'
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => app);
