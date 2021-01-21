import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {LogoPus, LogoTasik} from '../../../assets';

const Header = () => {
  return (
    <View style={styles.container}>
      <Image source={LogoPus} style={styles.logo} />
      <View>
        <Text style={styles.text}>Puskesmas Ceria</Text>
        <Text style={styles.text}>Kabupaten Tasikmalaya</Text>
      </View>
      <Image source={LogoTasik} style={styles.logo} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#228B22',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  logo: {
    width: 80,
    height: 80,
  },
  text: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
