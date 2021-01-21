import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Background} from '../../assets';
import {Button, Gap, Header, TextInput} from '../../components';
import Axios from 'axios';

const Home = () => {
  const [keyword, setKeyword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const navigation = useNavigation();

  const API_HOST = {
    url: 'https://jsonplaceholder.typicode.com',
  };

  const search = () => {
    Axios.get(`${API_HOST.url}/posts/${keyword}`)
      .then((res) => {
        setName(res.data.title);
        setAge(res.data.id);
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  };

  const signOut = () => {
    AsyncStorage.multiRemove(['userProfile']).then(() => {
      navigation.reset({index: 0, routes: [{name: 'Login'}]});
    });
  };
  return (
    <View style={styles.page}>
      <Header />
      <View style={styles.content}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <View style={styles.sidebarContainer}>
            <View>
              <TextInput
                placeholder="No. Antrian"
                onChangeText={(value) => setKeyword(value)}
                returnKeyType="search"
                onSubmitEditing={search}
              />
              <Gap height={10} />
              <Button text="Pesan Baru" />
              <Gap height={10} />
              <Button text="Perbaikan Rekdem" />
            </View>
            <View>
              <Button text="Panggil Pasien" />
              <Gap height={10} />
              <Button text="Panggil Ulang Pasien" />
            </View>
          </View>
        </View>
        {/* End Sidebar */}
        {/* Contente */}
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={styles.headerContent}>
              <Text style={styles.text}>
                Nama / Umur : {name} / {age}
              </Text>
              <Button text="Keluar" onPress={signOut} />
            </View>
            <ScrollView style={styles.scrollView}>
              <Image source={Background} style={styles.background} />
            </ScrollView>
          </View>
        </View>
        {/* End Content */}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    flex: 1,
  },
  sidebar: {
    width: 300,
    paddingHorizontal: 16,
  },
  sidebarContainer: {
    flex: 1,
    marginVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    elevation: 5,
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingTop: 0,
  },
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
