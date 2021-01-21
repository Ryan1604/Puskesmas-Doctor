import React from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import {Background} from '../../../assets';
import {Button} from '../../atoms';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Content = () => {
  const navigation = useNavigation();
  const signOut = () => {
    AsyncStorage.multiRemove(['userProfile']).then(() => {
      navigation.reset({index: 0, routes: [{name: 'Login'}]});
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.headerContent}>
          <Text style={styles.text}>Nama / Umur : </Text>
          <Button text="Keluar" onPress={signOut} />
        </View>
        <ScrollView style={styles.scrollView}>
          <Image source={Background} style={styles.background} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 240,
    paddingHorizontal: 16,
  },
  contentContainer: {
    flex: 1,
    marginVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#020202',
  },
  scrollView: {
    marginVertical: 16,
  },
  background: {
    width: 700,
  },
});
