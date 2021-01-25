import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Button = ({text, onPress, menu}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.container(menu)}>
        <Text style={styles.text(menu)}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: (menu) => ({
    backgroundColor: menu ? '#CCCCCC' : '#228B22',
    padding: 12,
    borderRadius: 8,
  }),
  text: (menu) => ({
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: menu ? '#020202' : '#FFFFFF',
    textAlign: 'center',
  }),
});
