import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {LogoPus} from '../../assets';
import {Gap} from '../../components';
import {getData} from '../../utils';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      getData('userProfile').then((res) => {
        if (res) {
          navigation.reset({index: 0, routes: [{name: 'Home'}]});
        } else {
          navigation.replace('Login');
        }
      });
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.page}>
      <Image source={LogoPus} style={styles.logo} />
      <Gap height={20} />
      <Text style={styles.text}>Puskesmas Ceria</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#228B22',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 32,
    color: '#FFFFFF',
  },
  logo: {
    width: 120,
    height: 120,
  },
});
