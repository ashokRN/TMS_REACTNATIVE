/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import Store from './src/global/GlobalStore'
import Navigator from './src/routes/Navigator';
import {s} from 'react-native'

const App = () => {
  return (
    <Store>
      <Navigator />
    </Store>
  );
};



export default App;
