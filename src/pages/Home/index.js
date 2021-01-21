import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Content, Header, Sidebar} from '../../components';

const Home = () => {
  return (
    <View style={styles.page}>
      <Header />
      <View style={styles.content}>
        <Sidebar />
        <Content />
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
});
