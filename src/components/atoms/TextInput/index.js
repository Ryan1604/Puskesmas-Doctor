import React from 'react';
import {StyleSheet, Text, View, TextInput as TextInputRN} from 'react-native';

const TextInput = ({label, placeholder, readonly, ...restProps}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInputRN
        style={styles.input(readonly)}
        placeholder={placeholder}
        {...restProps}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#020202',
  },
  input: (readonly) => ({
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: readonly ? '#AAAAAA' : '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    color: readonly ? '#FFFFFF' : '#AAAAAA',
  }),
});
