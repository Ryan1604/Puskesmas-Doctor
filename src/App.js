import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import {Provider, useSelector} from 'react-redux';
import store from './redux/store';
import {Loading} from './components';
import FlashMessage from 'react-native-flash-message';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

const MainApp = () => {
  const [dimensions, setDimensions] = useState({window, screen});

  const onChange = ({width, height}) => {
    if (width < height) {
      setDimensions('Portrait');
    } else {
      setDimensions('Landscape');
    }
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  });

  const {isLoading} = useSelector((state) => state.globalReducer);
  return (
    <NavigationContainer>
      <Router />
      <FlashMessage position="top" />
      {isLoading && <Loading />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
