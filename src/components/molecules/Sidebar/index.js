import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Gap, TextInput} from '../../atoms';

const Sidebar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View>
          <TextInput placeholder="No. Antrian" />
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
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  container: {
    width: 300,
    paddingHorizontal: 16,
  },
  contentContainer: {
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
});
