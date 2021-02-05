import Axios from 'axios';
import {showMessage, storeData} from '../../utils';
import {setLoading} from './global';

const API_HOST = {
  url: 'https://puskesmas-ceria.alatujilingkungan.id/api',
};

export const logInAction = (form, navigation) => (dispatch) => {
  dispatch(setLoading(true));
  const data = new FormData();
  data.append('email', form.email);
  data.append('password', form.password);
  Axios.post(`${API_HOST.url}/login`, data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
    .then((res) => {
      const profile = res.data.data;

      storeData('userProfile', profile);

      dispatch(setLoading(false));
      navigation.reset({index: 0, routes: [{name: 'Home'}]});
    })
    .catch((err) => {
      dispatch(setLoading(false));
      console.log(err);
      showMessage('Login gagal');
    });
};
