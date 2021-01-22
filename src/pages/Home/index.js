import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Background} from '../../assets';
import {Button, Gap, Header, TextInput} from '../../components';
import Axios from 'axios';
import {showMessage} from '../../utils';
import {useDispatch} from 'react-redux';
import {setLoading} from '../../redux/action/global';
import Autocomplete from 'react-native-autocomplete-input';

const Home = () => {
  const [keyword, setKeyword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [status, setStatus] = useState('');
  const [content, setContent] = useState('');
  const [ku, setKu] = useState('');
  const [kt, setKt] = useState('');
  const [rpt, setRpt] = useState('');
  const [rot, setRot] = useState('');
  const [rpk, setRpk] = useState('');
  const [idRm, setIdRm] = useState();
  const [gcs, setGcs] = useState('');
  const [tekananDarah, setTekananDarah] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [suhu, setSuhu] = useState('');
  const [respirasi, setRespirasi] = useState('');
  const [tinggi, setTinggi] = useState('');
  const [berat, setBerat] = useState('');
  const [pemFisik, setPemFisik] = useState('');
  const [note, setNote] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const API_HOST = {
    url: 'http://192.168.2.11/project/puskesmas/api',
  };

  const search = () => {
    Axios.get(`${API_HOST.url}/getAntrianDokter`, {
      params: {
        nomor: keyword,
      },
    })
      .then((res) => {
        setName(res.data.data.nama);
        setAge(res.data.data.tanggal_lahir);
        setStatus('Ada');
        if (res.data === null) {
          setStatus('');
        }
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  };

  const subjektif = () => {
    setContent('Subjektif');
    Axios.get(`${API_HOST.url}/getSubjektif`, {
      params: {
        nomor: keyword,
      },
    })
      .then((res) => {
        setKu(res.data.data.keluhan_utama);
        setKt(res.data.data.keluhan_tambahan);
        setRpt(res.data.data.rt_penyakit_dahulu);
        setRot(res.data.data.rt_pengobatan_terdahulu);
        setRpk(res.data.data.rt_penyakit_di_keluarga);
        setIdRm(res.data.data.id_rekam_medis_perawat);
        setStatus('Ada');
        if (res.data === null) {
          setStatus('');
        }
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  };

  const objektif = () => {
    setContent('Objektif');
    Axios.get(`${API_HOST.url}/getSubjektif`, {
      params: {
        nomor: keyword,
      },
    })
      .then((res) => {
        console.log(res.data.data);
        setGcs(res.data.data.fk_gcs);
        setTekananDarah(res.data.data.fk_tekanan_darah);
        setHeartRate(res.data.data.fk_heart_rate);
        setSuhu(res.data.data.fk_suhu_tubuh);
        setRespirasi(res.data.data.fk_respirasi_rate);
        setTinggi(res.data.data.fk_tinggi_badan);
        setBerat(res.data.data.fk_berat_badan);
        setPemFisik(res.data.data.fk_pemeriksaan_fisik);
        setNote(res.data.data.fk_catatan_keperawatan);
        setStatus('Ada');
        if (res.data === null) {
          setStatus('');
        }
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  };

  const assesment = () => {
    setContent('Assesment');
  };

  const signOut = () => {
    AsyncStorage.multiRemove(['userProfile']).then(() => {
      navigation.reset({index: 0, routes: [{name: 'Login'}]});
    });
  };

  const dataSubjektif = {
    id_rekam_medis_perawat: idRm,
    keluhan_utama: ku,
    keluhan_tambahan: kt,
    rt_penyakit_dahulu: rpt,
    rt_pengobatan_terdahulu: rot,
    rt_penyakit_di_keluarga: rpk,
  };

  const onSubmit = () => {
    // console.log(dataSubjektif);
    dispatch(setLoading(true));
    const data = new FormData();
    data.append('id_rekam_medis_perawat', dataSubjektif.id_rekam_medis_perawat);
    data.append('keluhan_utama', dataSubjektif.keluhan_utama);
    data.append('keluhan_tambahan', dataSubjektif.keluhan_tambahan);
    data.append('rt_penyakit_dahulu', dataSubjektif.rt_penyakit_dahulu);
    data.append(
      'rt_pengobatan_terdahulu',
      dataSubjektif.rt_pengobatan_terdahulu,
    );
    data.append(
      'rt_penyakit_di_keluarga',
      dataSubjektif.rt_penyakit_di_keluarga,
    );

    console.log(data);
    Axios.post(`${API_HOST.url}/pushSubjektif`, data, {
      headers: {
        Accept: 'application/json',
      },
    })
      .then((res) => {
        console.log(res);
        dispatch(setLoading(false));
        showMessage('Data berhasil disimpan', 'success');
      })
      .catch((err) => {
        console.log(err);
        dispatch(setLoading(false));
        showMessage(err?.response?.data?.meta?.message);
      });
  };

  const [films, setFilms] = useState([]);
  // For Filtered Data
  const [filteredFilms, setFilteredFilms] = useState([]);
  // For Selected Data
  const [selectedValue, setSelectedValue] = useState({});

  useEffect(() => {
    fetch('http://192.168.2.11/project/puskesmas/api/getICD')
      .then((res) => res.json())
      .then((json) => {
        const {results: films} = json;
        setFilms(films);
        //setting the data in the films state
      })
      .catch((e) => {
        alert(e);
      });
  }, []);

  const findFilm = (query) => {
    // Method called every time when we change the value of the input
    if (query) {
      // Making a case insensitive regular expression
      const regex = new RegExp(`${query.trim()}`, 'i');
      // Setting the filtered film array according the query
      setFilteredFilms(films.filter((film) => film.nama.search(regex) >= 0));
    } else {
      // If the query is null then return blank
      setFilteredFilms([]);
    }
  };

  return (
    <ScrollView>
      <View style={styles.page}>
        <Header />
        <View style={styles.content}>
          {/* Sidebar */}
          <View style={styles.sidebar}>
            <View style={styles.sidebarContainer}>
              {status === 'Ada' ? (
                <View>
                  <Gap height={20} />
                  <Button text="Kembali" />
                </View>
              ) : (
                <View>
                  <TextInput
                    placeholder="No. Antrian"
                    onChangeText={(value) => setKeyword(value)}
                    returnKeyType="search"
                    onSubmitEditing={search}
                  />
                  <Gap height={10} />
                  <Button text="Pasien Baru" />
                  <Gap height={10} />
                  <Button text="Perbaikan Rekdem" />
                </View>
              )}

              {status === 'Ada' && (
                <View style={styles.contentData}>
                  <View style={styles.left}>
                    <Button text="Subjektif" onPress={subjektif} />
                    <Gap height={10} />
                    <Button text="Assesment" onPress={assesment} />
                  </View>
                  <View style={styles.right}>
                    <Button text="Objektif" onPress={objektif} />
                    <Gap height={10} />
                    <Button text="Planning" />
                  </View>
                </View>
              )}

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
              {content === 'Subjektif' && (
                <View>
                  <Gap height={16} />
                  <View style={styles.headerForm}>
                    <Text style={styles.textHeaderForm}>
                      Pemeriksaan Subjektif
                    </Text>
                  </View>
                  <View style={styles.contentForm}>
                    <View style={styles.button}>
                      <Text style={styles.textButton}>Autonamnesis</Text>
                    </View>
                    <TextInput
                      label="Keluhan Utama"
                      placeholder="Masukkan keluhan utama"
                      defaultValue={ku}
                      onChangeText={(value) => setKu(value)}
                    />
                    <Gap height={10} />
                    <TextInput
                      label="Keluhan Tambahan"
                      placeholder="Masukkan keluhan tambahan"
                      defaultValue={kt}
                      onChangeText={(value) => setKt(value)}
                    />
                    <Gap height={10} />
                    <TextInput
                      label="Riwayat Penyakit Terdahulu"
                      placeholder="Masukkan riwayat penyakit terdahulu"
                      defaultValue={rpt}
                      onChangeText={(value) => setRpt(value)}
                    />
                    <Gap height={10} />
                    <TextInput
                      label="Riwayat Obat Terdahulu"
                      placeholder="Masukkan riwayat obat terdahulu"
                      value={rot}
                      onChangeText={(value) => setRot(value)}
                    />
                    <Gap height={10} />
                    <TextInput
                      label="Riwayat Penyakit Keluarga"
                      placeholder="Masukkan riwayat penyakit keluarga"
                      value={rpk}
                      onChangeText={(value) => setRpk(value)}
                    />
                    <Gap height={30} />
                    <Button text="Simpan" onPress={onSubmit} />
                  </View>
                  <Gap height={16} />
                </View>
              )}
              {content === 'Objektif' && (
                <View>
                  <Gap height={16} />
                  <View style={styles.headerForm}>
                    <Text style={styles.textHeaderForm}>
                      Pemeriksaan Objektif
                    </Text>
                  </View>
                  <View style={styles.contentForm}>
                    <TextInput
                      label="GCS"
                      defaultValue={gcs}
                      editable={false}
                      readonly
                    />
                    <Gap height={10} />
                    <TextInput
                      label="Tekanan Darah"
                      defaultValue={tekananDarah}
                      editable={false}
                      readonly
                    />
                    <Gap height={10} />
                    <TextInput
                      label="Detak Jantung"
                      defaultValue={heartRate}
                      editable={false}
                      readonly
                    />
                    <Gap height={10} />
                    <TextInput
                      label="Suhu Badan"
                      defaultValue={suhu}
                      editable={false}
                      readonly
                    />
                    <Gap height={10} />
                    <TextInput
                      label="Respirasi Rate"
                      defaultValue={respirasi}
                      editable={false}
                      readonly
                    />
                    <Gap height={10} />
                    <TextInput
                      label="Tinggi Badan"
                      defaultValue={tinggi}
                      editable={false}
                      readonly
                    />
                    <Gap height={10} />
                    <TextInput
                      label="Berat Badan"
                      defaultValue={berat}
                      editable={false}
                      readonly
                    />
                    <Gap height={10} />
                    <TextInput
                      label="Pemeriksaan Fisik"
                      defaultValue={pemFisik}
                      editable={false}
                      readonly
                    />
                    <Gap height={10} />
                    <TextInput
                      label="Catatan Keperawatan"
                      defaultValue={note}
                      editable={false}
                      readonly
                    />
                  </View>
                  <Gap height={16} />
                </View>
              )}
              {content === 'Assesment' && (
                <View>
                  <Gap height={16} />
                  <View style={styles.headerForm}>
                    <Text style={styles.textHeaderForm}>Assesment</Text>
                  </View>
                  <View style={styles.contentForm}>
                    <Autocomplete
                      autoCapitalize="none"
                      autoCorrect={false}
                      inputContainerStyle={styles.autocompleteContainer}
                      // Data to show in suggestion
                      data={filteredFilms}
                      // Default value if you want to set something in input
                      defaultValue={
                        JSON.stringify(selectedValue) === '{}'
                          ? ''
                          : selectedValue.nama
                      }
                      onChangeText={(text) => findFilm(text)}
                      placeholder="Cari berdasarkan nama penyakit"
                      renderItem={({item}) => (
                        // For the suggestion view
                        <TouchableOpacity
                          style={styles.subSearch}
                          onPress={() => {
                            setSelectedValue(item);
                            setFilteredFilms([]);
                          }}>
                          <Text style={styles.itemText}>{item.nama}</Text>
                        </TouchableOpacity>
                      )}
                    />
                    <View style={styles.descriptionContainer}>
                      {films.length > 0 ? (
                        <>
                          <Gap height={10} />
                          <TextInput
                            label="Kode ICD"
                            defaultValue={selectedValue.kode}
                          />
                          <Gap height={10} />
                          <TextInput
                            label="Nama Penyakit"
                            defaultValue={selectedValue.nama}
                          />
                          <Gap height={10} />
                        </>
                      ) : (
                        <View>
                          <Gap height={10} />
                          <TextInput label="Kode ICD" />
                          <Gap height={10} />
                          <TextInput label="Nama Penyakit" />
                          <Gap height={10} />
                        </View>
                      )}
                    </View>
                  </View>
                  <Gap height={16} />
                </View>
              )}
              {content === '' && (
                <View>
                  <Gap height={16} />
                  <Image source={Background} style={styles.background} />
                  <Gap height={16} />
                </View>
              )}
            </View>
          </View>
          {/* End Content */}
        </View>
      </View>
    </ScrollView>
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
    width: 660,
    height: 450,
    borderRadius: 8,
  },
  contentData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    marginRight: 16,
    width: 110,
  },
  right: {
    width: 110,
  },
  headerForm: {
    backgroundColor: '#228B22',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 12,
  },
  textHeaderForm: {
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  contentForm: {
    backgroundColor: '#CCCCCC',
    padding: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    width: 150,
    borderRadius: 8,
    marginBottom: 24,
  },
  textButton: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#020202',
    textAlign: 'center',
  },
  autocompleteContainer: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
  },
  subSearch: {
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
});
