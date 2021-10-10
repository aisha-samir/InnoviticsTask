/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import EntryPoint from './src/EntryPoint';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => EntryPoint);
