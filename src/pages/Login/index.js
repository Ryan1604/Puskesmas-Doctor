import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {LogoPus} from '../../assets';
import {Button, Gap, TextInput} from '../../components';
import {logInAction} from '../../redux/action/auth';
import {useForm} from '../../utils';

const Login = ({navigation}) => {
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(logInAction(form, navigation));
  };
  return (
    <View style={styles.page}>
      <View style={styles.headerContainer}>
        <Image source={LogoPus} style={styles.logo} />
      </View>
      <Gap height={20} />
      <Text style={styles.text}>Selamat Datang di MEDIRA</Text>
      <View style={styles.input}>
        <TextInput
          placeholder="Username or email"
          value={form.email}
          onChangeText={(value) => setForm('email', value)}
        />
        <Gap height={10} />
        <TextInput
          placeholder="Password"
          value={form.password}
          onChangeText={(value) => setForm('password', value)}
          secureTextEntry
        />
      </View>
      <Gap height={30} />
      <View style={styles.button}>
        <Button text="Login" onPress={onSubmit} />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    paddingHorizontal: 250,
  },
  button: {
    paddingHorizontal: 250,
  },
});
