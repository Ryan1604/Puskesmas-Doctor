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
  // console.log('Form: ', form);
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(logInAction(form, navigation));
  };
  return (
    <View style={styles.page}>
      <View style={styles.headerContainer}>
        <Image source={LogoPus} style={styles.logo} />
        <Text style={styles.title}>Puskesmas Ceria</Text>
      </View>
      <Gap height={20} />
      <Text style={styles.text}>Selamat Datang di Puskesmas Ceria</Text>
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
  logo: {
    width: 80,
    height: 80,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 32,
    marginLeft: 16,
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
