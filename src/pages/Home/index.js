/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import {useDispatch} from 'react-redux';
import {Background} from '../../assets';
import {Button, Gap, Header, TextInput} from '../../components';
import {setLoading} from '../../redux/action/global';
import {showMessage} from '../../utils';
import RadioForm from 'react-native-simple-radio-button';

const Home = () => {
  const Item = ({key, kode, penyakit, onPress, onDelete}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.desc}>
          <Text style={styles.descName}>{kode}</Text>
          <Text style={styles.descEmail}>{penyakit}</Text>
        </View>
        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.delete}>X</Text>
        </TouchableOpacity>
      </View>
    );
  };

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
  const [idRekamMedis, setIdRekamMedis] = useState('');
  const [icd, setICD] = useState([]);
  const [rtAleri, setRtAlergi] = useState('');
  const [rtObatDulu, setRtObatDulu] = useState('');
  const [rtPenDulu, setRtPenDulu] = useState('');
  const [rtKeluarga, setRtKeluarga] = useState('');
  const [fkKesadaran, setFkKesadaran] = useState('');
  const [fkNadi, setFkNadi] = useState('');
  const [fkNafas, setFkNafas] = useState('');
  const [fkMasalah, setFkMasalah] = useState('');
  const [pnKeluhan, setPnKeluhan] = useState('');
  const [pnIramaNafas, setPnIramaNafas] = useState('');
  const [pnSuaraNafas, setPnSuaraNafas] = useState('');
  const [pnMasalah, setPnMasalah] = useState('');
  const [krNyeriDada, setKrNyeriDada] = useState('');
  const [krSuaraJantung, setKrSuaraJantung] = useState('');
  const [krCRT, setKrCRT] = useState('');
  const [krJVP, setKrJVP] = useState('');
  const [krMasalah, setKrMasalah] = useState('');
  const [pfKeluhanPusing, setPfKeluhanPusing] = useState('');
  const [pfKesadaran, setPfKesadaran] = useState('');
  const [pfPupil, setPfPupil] = useState('');
  const [pfSklera, setPfSklera] = useState('');
  const [pfKakuKuduk, setPfKakuKuduk] = useState('');
  const [pfKelumpuhan, setPfKelumpuhan] = useState('');
  const [pfSensorik, setPfSensorik] = useState('');
  const [pfMasalah, setPfMasalah] = useState('');
  const [phKeluhan, setPhKeluhan] = useState('');
  const [phMemakaiKacamata, setPhMemakaiKacamata] = useState('');
  const [phLuarMata, setPhLuarMata] = useState('');
  const [phBolaMata, setPhBolaMata] = useState('');
  const [phBolaMataLainnya, setPhBolaMataLainnya] = useState('');
  const [phMasalah, setPhMasalah] = useState('');
  const [phMasalahLainnya, setPhMasalahLainnya] = useState('');
  const [puKeluhan, setPuKeluhan] = useState('');
  const [puHidung, setPuHidung] = useState('');
  const [puHidungLainnya, setPuHidungLainnya] = useState('');
  const [puMasalah, setPuMasalah] = useState('');
  const [puMasalahLainnya, setPuMasalahLainnya] = useState('');
  const [pgKeluhan, setPgKeluhan] = useState('');
  const [pgTelinga, setPgTelinga] = useState('');
  const [PgTelingaLainnya, setPgTelingaLainnya] = useState('');
  const [pgMasalah, setPgMasalah] = useState('');
  const [PgMasalahLainnya, setPgMasalahLainnya] = useState('');
  const [ekKeluhan, setEkKeluhan] = useState('');
  const [ekUrin, setEkUrin] = useState('');
  const [ekBAK, setEkBAK] = useState('');
  const [ekWarna, setEkWarna] = useState('');
  const [ekBAU, setEkBAU] = useState('');
  const [ekMasalah, setEkMasalah] = useState('');
  const [pcMulut, setPcMulut] = useState('');
  const [pcAbdomen, setPcAbdomen] = useState('');
  const [pcPembengkakan, setPcPembengkakan] = useState('');
  const [pcBAB, setPcBAB] = useState('');
  const [pcKonsistensi, setPcKonsistensi] = useState('');
  const [pcDiet, setPcDiet] = useState('');
  const [pcFrekuensi, setPcFrekuensi] = useState('');
  const [pcJumlah, setPcJumlah] = useState('');
  const [pcMasalah, setPcMasalah] = useState('');
  const [ktGatal, setKtGatal] = useState('');
  const [ktKelainan, setKtKelainan] = useState('');
  const [ktLainnya, setKtLainnya] = useState('');
  const [ktSendi, setKtSendi] = useState('');
  const [ktAkral, setKtAkral] = useState('');
  const [ktPatah, setKtPatah] = useState('');
  const [ktEksternal, setKtEksternal] = useState('');
  const [ktLuka, setKtLuka] = useState('');
  const [ktPerih, setKtPerih] = useState('');
  const [ktOtot, setKtOtot] = useState('');
  const [ktTurgor, setKtTurgor] = useState('');
  const [ktMasalah, setKtMasalah] = useState('');
  const [ktMasalahLainnya, setKtMasalahLainyya] = useState('');
  const [rpPenis, setRpPenis] = useState('');
  const [rpScrotum, setRpScrotum] = useState('');
  const [rpTestis, setRpTestis] = useState('');
  const [rpVagina, setRpVagina] = useState('');
  const [rpPendarahan, setRpPendarahan] = useState('');
  const [rpPayudara, setRpPayudara] = useState('');
  const [rpHaid, setRpHaid] = useState('');
  const [rpMasalah, setRpMasalah] = useState('');
  const [psPsikologis, setPsPsikologis] = useState('');
  const [psSosiologis, setPsSosiologis] = useState('');
  const [psSpiritual, setPsSpiritual] = useState('');
  const [psLainnya, setPsLainnya] = useState('');
  const [psMasalah, setPsMasalah] = useState('');
  const [hambatanDiri, sethambatanDiri] = useState('');
  const [Datapenunjang, setDataPenunjang] = useState('');
  const [qty, setQty] = useState('');
  const [hari, setHari] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [resultObat, setResultObat] = useState([]);
  const [resultTindakan, setResultTindakan] = useState([]);
  const [resultRujukan, setResultRujukan] = useState([]);
  const [agree, setAgree] = useState(1);
  const [pemPenunjang, setPemPenunjang] = useState('');
  const [edukasi, setEdukasi] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const API_HOST = {
    url: 'https://puskesmas-ceria.alatujilingkungan.id/api',
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
        setIdRekamMedis(res.data.data.id);
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
    getData();
  };

  const planning = () => {
    setContent('Planning');
    getDataObat();
  };

  const tindakan = () => {
    setContent('Tindakan');
    getDataTindakan();
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

    Axios.post(`${API_HOST.url}/pushSubjektif`, data, {
      headers: {
        Accept: 'application/json',
      },
    })
      .then((res) => {
        dispatch(setLoading(false));
        showMessage('Data berhasil disimpan', 'success');
      })
      .catch((err) => {
        dispatch(setLoading(false));
        showMessage(err?.response?.data?.meta?.message);
      });
  };

  const [films, setFilms] = useState([]);
  const [obat, setObat] = useState([]);
  const [searchTindakan, setSearchTindakan] = useState([]);
  const [searchRujukan, setSearchRujukan] = useState([]);
  // For Filtered Data
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [filteredObat, setFilteredObat] = useState([]);
  const [filteredTindakan, setFilteredTindakan] = useState([]);
  const [filteredRujukan, setFilteredRujukan] = useState([]);
  // For Selected Data
  const [selectedValue, setSelectedValue] = useState({});
  const [selectedValueObat, setSelectedValueObat] = useState({});
  const [selectedValueTindakan, setSelectedValueTindakan] = useState({});
  const [selectedValueRujukan, setSelectedValueRujukan] = useState({});
  useEffect(() => {
    fetch(`${API_HOST.url}/getICD`)
      .then((res) => res.json())
      .then((json) => {
        // eslint-disable-next-line no-shadow
        const {results: films} = json;
        setFilms(films);
        //setting the data in the films state
      })
      .catch((e) => {
        // eslint-disable-next-line no-alert
        alert(e);
      });
  }, []);

  useEffect(() => {
    fetch(`${API_HOST.url}/getObat`)
      .then((res) => res.json())
      .then((json) => {
        // eslint-disable-next-line no-shadow
        const {results: obat} = json;
        setObat(obat);
        //setting the data in the films state
      })
      .catch((e) => {
        // eslint-disable-next-line no-alert
        alert(e);
      });
  }, []);

  useEffect(() => {
    fetch(`${API_HOST.url}/getTindakan`)
      .then((res) => res.json())
      .then((json) => {
        // eslint-disable-next-line no-shadow
        const {results: tindakan} = json;
        setSearchTindakan(tindakan);
        //setting the data in the films state
      })
      .catch((e) => {
        // eslint-disable-next-line no-alert
        alert(e);
      });
  }, []);

  useEffect(() => {
    fetch(`${API_HOST.url}/getRujukan`)
      .then((res) => res.json())
      .then((json) => {
        const {results: rujukan} = json;
        setSearchRujukan(rujukan);
        //setting the data in the films state
      })
      .catch((e) => {
        // eslint-disable-next-line no-alert
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
  const findObat = (query) => {
    // Method called every time when we change the value of the input
    if (query) {
      // Making a case insensitive regular expression
      const regex = new RegExp(`${query.trim()}`, 'i');
      // Setting the filtered film array according the query
      setFilteredObat(obat.filter((text) => text.nama.search(regex) >= 0));
    } else {
      // If the query is null then return blank
      setFilteredObat([]);
    }
  };
  const findTindakan = (query) => {
    // Method called every time when we change the value of the input
    if (query) {
      // Making a case insensitive regular expression
      const regex = new RegExp(`${query.trim()}`, 'i');
      // Setting the filtered film array according the query
      setFilteredTindakan(
        searchTindakan.filter((text) => text.nama.search(regex) >= 0),
      );
    } else {
      // If the query is null then return blank
      setFilteredTindakan([]);
    }
  };
  const findRujukan = (query) => {
    // Method called every time when we change the value of the input
    if (query) {
      // Making a case insensitive regular expression
      const regex = new RegExp(`${query.trim()}`, 'i');
      // Setting the filtered film array according the query
      setFilteredRujukan(
        searchRujukan.filter((text) => text.nama.search(regex) >= 0),
      );
    } else {
      // If the query is null then return blank
      setFilteredRujukan([]);
    }
  };
  const dataICD = {
    id_rekam_medis: idRekamMedis,
    kategori: 'icd',
    id_icd: selectedValue.id,
  };

  const dataObat = {
    id_rekam_medis: idRekamMedis,
    kategori: 'obat',
    id_obat: selectedValueObat.id,
    harga: selectedValueObat.harga_umum,
    qty: qty,
    hari: hari,
    jumlah: jumlah,
  };
  const dataTindakan = {
    id_rekam_medis: idRekamMedis,
    kategori: 'tindakan',
    id_tindakan: selectedValueTindakan.id,
    harga: selectedValueTindakan.umum,
  };
  const dataRujukan = {
    id_rekam_medis: idRekamMedis,
    id_rujukan: selectedValueRujukan.id,
    pemeriksaan_penunjang: pemPenunjang,
    rencana_edukasi: edukasi,
    persetujuan: agree,
    kategori: 'rujukan',
  };

  const saveObat = () => {
    dispatch(setLoading(true));
    const dataObatForSave = new FormData();
    dataObatForSave.append('id_rekam_medis', dataObat.id_rekam_medis);
    dataObatForSave.append('kategori', dataObat.kategori);
    dataObatForSave.append('id_obat', dataObat.id_obat);
    dataObatForSave.append('harga', dataObat.harga);
    dataObatForSave.append('qty', dataObat.qty);
    dataObatForSave.append('hari', dataObat.hari);
    dataObatForSave.append('jumlah', dataObat.jumlah);
    Axios.post(`${API_HOST.url}/pushDokter`, dataObatForSave, {
      headers: {
        Accept: 'application/json',
      },
    })
      .then((res) => {
        dispatch(setLoading(false));
        getDataObat();
        showMessage('Data berhasil disimpan', 'success');
      })
      .catch((err) => {
        dispatch(setLoading(false));
        showMessage(err?.response?.data?.meta?.message);
      });
  };
  const saveTindakan = () => {
    dispatch(setLoading(true));
    const dataTindakanForSave = new FormData();
    dataTindakanForSave.append('id_rekam_medis', dataTindakan.id_rekam_medis);
    dataTindakanForSave.append('kategori', dataTindakan.kategori);
    dataTindakanForSave.append('id_tindakan', dataTindakan.id_tindakan);
    dataTindakanForSave.append('harga', dataTindakan.harga);
    Axios.post(`${API_HOST.url}/pushDokter`, dataTindakanForSave, {
      headers: {
        Accept: 'application/json',
      },
    })
      .then((res) => {
        dispatch(setLoading(false));
        getDataTindakan();
        showMessage('Data berhasil disimpan', 'success');
      })
      .catch((err) => {
        dispatch(setLoading(false));
        showMessage(err?.response?.data?.meta?.message);
      });
  };
  const saveRujukan = () => {
    dispatch(setLoading(true));
    const dataRujukanForSave = new FormData();
    dataRujukanForSave.append('id_rekam_medis', dataRujukan.id_rekam_medis);
    dataRujukanForSave.append('id_rujukan', dataRujukan.id_rujukan);
    dataRujukanForSave.append(
      'pemeriksaan_penunjang',
      dataRujukan.pemeriksaan_penunjang,
    );
    dataRujukanForSave.append('rencana_edukasi', dataRujukan.rencana_edukasi);
    dataRujukanForSave.append('persetujuan', dataRujukan.persetujuan);
    dataRujukanForSave.append('kategori', dataRujukan.kategori);
    Axios.post(`${API_HOST.url}/pushDokter`, dataRujukanForSave, {
      headers: {
        Accept: 'application/json',
      },
    })
      .then((res) => {
        dispatch(setLoading(false));
        showMessage('Data berhasil disimpan', 'success');
      })
      .catch((err) => {
        dispatch(setLoading(false));
        showMessage(err?.response?.data?.meta?.message);
      });
  };

  const getData = () => {
    Axios.get(`${API_HOST.url}/getDokterICD`, {
      params: {
        id_rekam_medis: dataICD.id_rekam_medis,
      },
    })
      .then((result) => {
        setICD(result.data.results);
      })
      .catch((err) => console.log('Error: ', err));
  };

  const getDataObat = () => {
    Axios.get(`${API_HOST.url}/getDokterObat`, {
      params: {
        id_rekam_medis: dataObat.id_rekam_medis,
      },
    })
      .then((result) => {
        setResultObat(result.data.results);
      })
      .catch((err) => console.log('Error: ', err));
  };
  const getDataTindakan = () => {
    Axios.get(`${API_HOST.url}/getDokterTindakan`, {
      params: {
        id_rekam_medis: dataTindakan.id_rekam_medis,
      },
    })
      .then((result) => {
        setResultTindakan(result.data.results);
      })
      .catch((err) => console.log('Error: ', err));
  };

  const getDataRujukan = () => {
    Axios.get(`${API_HOST.url}/getDokterRujukan`, {
      params: {
        id_rekam_medis: dataRujukan.id_rekam_medis,
      },
    })
      .then((result) => {
        setResultRujukan(result.data.results);
      })
      .catch((err) => console.log('Error: ', err));
  };

  const saveICD = () => {
    dispatch(setLoading(true));
    const dataforSave = new FormData();
    dataforSave.append('id_rekam_medis', dataICD.id_rekam_medis);
    dataforSave.append('kategori', dataICD.kategori);
    dataforSave.append('id_icd', dataICD.id_icd);

    Axios.post(`${API_HOST.url}/pushDokter`, dataforSave, {
      headers: {
        Accept: 'application/json',
      },
    })
      .then((res) => {
        dispatch(setLoading(false));
        getData();
        showMessage('Data berhasil disimpan', 'success');
      })
      .catch((err) => {
        dispatch(setLoading(false));
        showMessage(err?.response?.data?.meta?.message);
      });
  };

  const deleteICD = (item) => {
    Axios.get(`${API_HOST.url}/deleteDokterICD`, {
      params: {
        id: item.id,
      },
    })
      .then((result) => {
        getData();
      })
      .catch((err) => console.log('Error: ', err));
  };

  const deleteObat = (item) => {
    Axios.get(`${API_HOST.url}/deleteDokterObat`, {
      params: {
        id: item.id,
      },
    })
      .then((result) => {
        getDataObat();
      })
      .catch((err) => console.log('Error: ', err));
  };

  const deleteTindakan = (item) => {
    console.log(item.id);
    Axios.get(`${API_HOST.url}/deleteDokterTindakan`, {
      params: {
        id: item.id,
      },
    })
      .then((result) => {
        getDataTindakan();
      })
      .catch((err) => console.log('Error: ', err));
  };

  const rujukan = () => {
    setContent('Rujukan');
  };

  const resetForm = () => {
    setSelectedValue({});
  };
  const resetFormObat = () => {
    setSelectedValueObat({});
    setQty('');
    setHari('');
    setJumlah('');
  };
  const resetFormTindakan = () => {
    setSelectedValueTindakan({});
  };

  const pemeriksaanAwal = () => {
    setStatus('Pemeriksaan');
  };

  const riwayat = () => {
    setContent('Riwayat');
    Axios.get(`${API_HOST.url}/getSubjektif`, {
      params: {
        nomor: keyword,
      },
    })
      .then((res) => {
        setRtAlergi(res.data.data.rt_alergi);
        setRtObatDulu(res.data.data.rt_pengobatan_terdahulu);
        setRtPenDulu(res.data.data.rt_penyakit_dahulu);
        setRtKeluarga(res.data.data.rt_penyakit_di_keluarga);
        setStatus('Pemeriksaan');
        if (res.data === null) {
          setStatus('');
        }
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  };
  const fisik = () => {
    setContent('Fisik');
    Axios.get(`${API_HOST.url}/getSubjektif`, {
      params: {
        nomor: keyword,
      },
    })
      .then((res) => {
        setTinggi(res.data.data.fk_tinggi_badan);
        setBerat(res.data.data.fk_berat_badan);
        setFkKesadaran(res.data.data.fk_kesadaran);
        setGcs(res.data.data.fk_gcs);
        setTekananDarah(res.data.data.fk_tekanan_darah);
        setFkNadi(res.data.data.fk_frekuensi_nadi);
        setFkNafas(res.data.data.fk_frekuensi_nafas);
        setSuhu(res.data.data.fk_suhu_tubuh);
        setFkMasalah(res.data.data.fk_masalah);
        setHeartRate(res.data.data.fk_heart_rate);
        setHeartRate(res.data.data.fk_heart_rate);
        setRespirasi(res.data.data.fk_respirasi_rate);
        setPemFisik(res.data.data.fk_pemeriksaan_fisik);
        setNote(res.data.data.fk_catatan_keperawatan);
        setStatus('Pemeriksaan');
        if (res.data === null) {
          setStatus('');
        }
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  };
  const pernafasan = () => {
    setContent('Pernafasan');
    Axios.get(`${API_HOST.url}/getSubjektif`, {
      params: {
        nomor: keyword,
      },
    })
      .then((res) => {
        setPnKeluhan(res.data.data.pn_keluhan);
        setPnIramaNafas(res.data.data.pn_irama_napas);
        setPnSuaraNafas(res.data.data.pn_suara_napas);
        setPnMasalah(res.data.data.pn_masalah);
        setStatus('Pemeriksaan');
        if (res.data === null) {
          setStatus('');
        }
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  };
  const kardiovaskular = () => {
    setContent('Kardiovaskular');
    Axios.get(`${API_HOST.url}/getSubjektif`, {
      params: {
        nomor: keyword,
      },
    })
      .then((res) => {
        setKrNyeriDada(res.data.data.kr_nyeri_dada);
        setKrSuaraJantung(res.data.data.kr_suara_jantung);
        setKrCRT(res.data.data.kr_crt);
        setKrJVP(res.data.data.kr_jvp);
        setKrMasalah(res.data.data.kr_masalah);
        setStatus('Pemeriksaan');
        if (res.data === null) {
          setStatus('');
        }
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  };
  const persyarafan = () => {
    setContent('Persyarafan');
    Axios.get(`${API_HOST.url}/getSubjektif`, {
      params: {
        nomor: keyword,
      },
    })
      .then((res) => {
        setPfKeluhanPusing(res.data.data.pf_keluhan_pusing);
        setPfKesadaran(res.data.data.pf_kesadaran);
        setPfPupil(res.data.data.pf_pupil);
        setPfSklera(res.data.data.pf_sklera);
        setPfKakuKuduk(res.data.data.pf_kaku_kuduk);
        setPfKelumpuhan(res.data.data.pf_kelumpuhan);
        setPfSensorik(res.data.data.pf_gangguan_persepsi_sensorik);
        setPfMasalah(res.data.data.pf_masalah);
        setStatus('Pemeriksaan');
        if (res.data === null) {
          setStatus('');
        }
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  };
  const penglihatan = () => {
    setContent('Penglihatan');
    Axios.get(`${API_HOST.url}/getSubjektif`, {
      params: {
        nomor: keyword,
      },
    })
      .then((res) => {
        setPhKeluhan(res.data.data.ph_keluhan);
        setPhMemakaiKacamata(res.data.data.ph_memakai_kacamata);
        setPhLuarMata(res.data.data.ph_bagian_luar_bola_mata);
        setPhBolaMata(res.data.data.ph_bola_mata);
        setPhBolaMataLainnya(res.data.data.ph_lainnya_selain_pilihan_diatas);
        setPhMasalah(res.data.data.ph_masalah);
        setPhMasalahLainnya(res.data.data.ph_masalah_lainnya);
        setStatus('Pemeriksaan');
        if (res.data === null) {
          setStatus('');
        }
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  };
  const pengidu = () => {
    setContent('Pengidu');
    Axios.get(`${API_HOST.url}/getSubjektif`, {
      params: {
        nomor: keyword,
      },
    })
      .then((res) => {
        setPuKeluhan(res.data.data.pu_keluhan);
        setPuHidung(res.data.data.pu_hidung);
        setPuHidungLainnya(res.data.data.pu_selain_dari_pilihan_diatas);
        setPuMasalah(res.data.data.pu_masalah);
        setPuMasalahLainnya(res.data.data.pu_masalah_lainnya);
        setStatus('Pemeriksaan');
        if (res.data === null) {
          setStatus('');
        }
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  };
  const pendengaran = () => {
    setContent('Pendengaran');
    Axios.get(`${API_HOST.url}/getSubjektif`, {
      params: {
        nomor: keyword,
      },
    })
      .then((res) => {
        setPgKeluhan(res.data.data.pg_keluhan);
        setPgTelinga(res.data.data.pg_telinga);
        setPgTelingaLainnya(res.data.data.pg_lainnya);
        setPgMasalah(res.data.data.pg_masalah);
        setPgMasalahLainnya(res.data.data.pg_masalah_lainnya);
        setStatus('Pemeriksaan');
        if (res.data === null) {
          setStatus('');
        }
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  };
  const eksresi = () => {
    setContent('Ekskresi');
    Axios.get(`${API_HOST.url}/getSubjektif`, {
      params: {
        nomor: keyword,
      },
    })
      .then((res) => {
        setEkKeluhan(res.data.data.ek_keluhan);
        setEkUrin(res.data.data.ek_produksi_urin);
        setEkBAK(res.data.data.ek_bak);
        setEkBAU(res.data.data.ek_bau);
        setEkWarna(res.data.data.ek_warna);
        setEkMasalah(res.data.data.ek_masalah);
        setStatus('Pemeriksaan');
        if (res.data === null) {
          setStatus('');
        }
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  };
  const pencernaan = () => {
    setContent('Percernaan');
    Axios.get(`${API_HOST.url}/getSubjektif`, {
      params: {
        nomor: keyword,
      },
    })
      .then((res) => {
        setPcMulut(res.data.data.pc_mulut);
        setPcAbdomen(res.data.data.pc_abdomen);
        setPcPembengkakan(res.data.data.pc_pembengkakan);
        setPcBAB(res.data.data.pc_bab);
        setPcKonsistensi(res.data.data.pc_konsistensi);
        setPcDiet(res.data.data.pc_diet);
        setPcFrekuensi(res.data.data.pc_frekuensi);
        setPcJumlah(res.data.data.pc_jumlah);
        setPcMasalah(res.data.data.pc_masalah);
        setStatus('Pemeriksaan');
        if (res.data === null) {
          setStatus('');
        }
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  };
  const kulit = () => {
    setContent('Kulit');
    Axios.get(`${API_HOST.url}/getSubjektif`, {
      params: {
        nomor: keyword,
      },
    })
      .then((res) => {
        setKtGatal(res.data.data.kt_kulit_gatal);
        setKtKelainan(res.data.data.kt_ujud_kelianan);
        setKtLainnya(res.data.data.kt_lainnya);
        setKtSendi(res.data.data.kt_pergerakan_sendi);
        setKtAkral(res.data.data.kt_akral);
        setKtPatah(res.data.data.kt_patah_tulang_di);
        setKtEksternal(res.data.data.kt_eksternal_fiksasi_di);
        setKtLuka(res.data.data.kt_luka);
        setKtPerih(res.data.data.kt_nyeri);
        setKtOtot(res.data.data.kt_kekuatan_otot);
        setKtTurgor(res.data.data.kt_turgor);
        setKtMasalah(res.data.data.kt_masalah);
        setKtMasalahLainyya(res.data.data.kt_masalah_lainnya);
        setStatus('Pemeriksaan');
        if (res.data === null) {
          setStatus('');
        }
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  };
  const psikologis = () => {
    setContent('Psikologis');
    Axios.get(`${API_HOST.url}/getSubjektif`, {
      params: {
        nomor: keyword,
      },
    })
      .then((res) => {
        setPsPsikologis(res.data.data.ps_psikologis);
        setPsSosiologis(res.data.data.ps_sosiologis);
        setPsSpiritual(res.data.data.ps_spiritual);
        setPsLainnya(res.data.data.ps_spiritual);
        setPsMasalah(res.data.data.ps_masalah);
        setStatus('Pemeriksaan');
        if (res.data === null) {
          setStatus('');
        }
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  };
  const reproduksi = () => {
    setContent('Reproduksi');
    Axios.get(`${API_HOST.url}/getSubjektif`, {
      params: {
        nomor: keyword,
      },
    })
      .then((res) => {
        setRpPenis(res.data.data.rp_penis);
        setRpTestis(res.data.data.rp_testis);
        setRpScrotum(res.data.data.rp_scrotum);
        setRpVagina(res.data.data.rp_vagina);
        setRpPendarahan(res.data.data.rp_pendarahan);
        setRpPayudara(res.data.data.rp_payudara);
        setRpHaid(res.data.data.rp_siklus_haid);
        setRpMasalah(res.data.data.rp_masalah);
        setStatus('Pemeriksaan');
        if (res.data === null) {
          setStatus('');
        }
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  };
  const hambatan = () => {
    setContent('Hambatan');
    Axios.get(`${API_HOST.url}/getSubjektif`, {
      params: {
        nomor: keyword,
      },
    })
      .then((res) => {
        sethambatanDiri(res.data.data.hd_jika_ada);
        setStatus('Pemeriksaan');
        if (res.data === null) {
          setStatus('');
        }
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  };
  const penunjang = () => {
    setContent('Penunjang');
    Axios.get(`${API_HOST.url}/getSubjektif`, {
      params: {
        nomor: keyword,
      },
    })
      .then((res) => {
        setDataPenunjang(res.data.data.dp_data_penunjang);
        setStatus('Pemeriksaan');
        if (res.data === null) {
          setStatus('');
        }
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  };
  const resume = () => {
    setContent('Resume');
    Axios.get(`${API_HOST.url}/getSubjektif`, {
      params: {
        nomor: keyword,
      },
    })
      .then((res) => {
        getDataObat();
        getDataTindakan();
        getDataRujukan();
        setDataPenunjang(res.data.data.dp_data_penunjang);
        if (res.data === null) {
          setStatus('');
        }
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  };

  const back = () => {
    setStatus('Ada');
    setContent('');
  };
  const pasienBaru = () => {
    setStatus('');
    setContent('');
    setName('');
    setAge('');
  };

  const nextPasien = () => {
    Axios.get(`${API_HOST.url}/nextDokter`)
      .then((result) => {
        if (result.data.nomor === null) {
          alert('Nomor Antrian habis ');
        } else {
          alert('Pasien dengan Nomor Antrian ' + result.data.nomor);
        }
      })
      .catch((err) => console.log('Error: ', err));
  };

  const repeatPasien = () => {
    Axios.get(`${API_HOST.url}/repeatSuara`)
      .then((result) => {
        alert('Pasien dengan Nomor Antrian ' + result.data.nomor);
      })
      .catch((err) => console.log('Error: ', err));
  };

  const radio_props = [
    {label: 'Setuju', value: 1},
    {label: 'Tidak Setuju', value: 0},
    ,
  ];

  return (
    <View style={styles.page}>
      <Header />
      <View style={styles.content}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          {status === 'Pemeriksaan' ? (
            <View style={styles.sidebarContainer}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Gap height={10} />
                <Button text="Kembali" onPress={back} />
                <View style={styles.contentData}>
                  <View style={styles.left}>
                    <Gap height={10} />
                    <Button text="Riwayat" onPress={riwayat} />
                    <Gap height={10} />
                    <Button text="Pernafasan" onPress={pernafasan} />
                    <Gap height={10} />
                    <Button text="Persyarafan" onPress={persyarafan} />
                    <Gap height={10} />
                    <Button text="Pengidu" onPress={pengidu} />
                    <Gap height={10} />
                    <Button text="Ekskresi" onPress={eksresi} />
                    <Gap height={10} />
                    <Button text="Kulit" onPress={kulit} />
                    <Gap height={10} />
                    <Button text="Psikologis" onPress={psikologis} />
                    <Gap height={10} />
                    <Button text="Data Penunjang" onPress={penunjang} />
                  </View>
                  <View style={styles.right}>
                    <Gap height={10} />
                    <Button text="Fisik" onPress={fisik} />
                    <Gap height={10} />
                    <Button text="Kardiovaskular" onPress={kardiovaskular} />
                    <Gap height={10} />
                    <Button text="Penglihatan" onPress={penglihatan} />
                    <Gap height={10} />
                    <Button text="Pendengaran" onPress={pendengaran} />
                    <Gap height={10} />
                    <Button text="Pencernaan" onPress={pencernaan} />
                    <Gap height={10} />
                    <Button text="Reproduksi" onPress={reproduksi} />
                    <Gap height={10} />
                    <Button text="Hambatan Diri" onPress={hambatan} />
                  </View>
                </View>
              </ScrollView>
            </View>
          ) : (
            <View style={styles.sidebarContainer}>
              {status === 'Ada' ? (
                <View>
                  <Gap height={20} />
                  <Button text="Pasien Baru" onPress={pasienBaru} />
                </View>
              ) : (
                <View>
                  <TextInput
                    placeholder="No. Antrian"
                    onChangeText={(value) => setKeyword(value)}
                    returnKeyType="search"
                    onSubmitEditing={search}
                  />
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
                    <Button text="Planning" onPress={planning} />
                  </View>
                </View>
              )}
              {status === 'Ada' ? (
                <View>
                  <Button text="Pemeriksaan Awal" onPress={pemeriksaanAwal} />
                  <Gap height={10} />
                  <Button text="Resume" onPress={resume} />
                </View>
              ) : (
                <View>
                  <Button text="Panggil Pasien" onPress={() => nextPasien()} />
                  <Gap height={10} />
                  <Button
                    text="Panggil Ulang Pasien"
                    onPress={() => repeatPasien()}
                  />
                </View>
              )}
            </View>
          )}
        </View>
        {/* End Sidebar */}
        {/* Contente */}
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <View style={styles.contentContainer}>
              <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}>
                <View style={styles.headerContent}>
                  <Text style={styles.text}>
                    {idRekamMedis ? '' : ''}
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
                        readonly
                      />
                      <Gap height={10} />
                      <TextInput
                        label="Riwayat Obat Terdahulu"
                        placeholder="Masukkan riwayat obat terdahulu"
                        value={rot}
                        onChangeText={(value) => setRot(value)}
                        readonly
                      />
                      <Gap height={10} />
                      <TextInput
                        label="Riwayat Penyakit Keluarga"
                        placeholder="Masukkan riwayat penyakit keluarga"
                        value={rpk}
                        readonly
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
                          <View>
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
                          </View>
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
                    <View style={styles.footer}>
                      <View style={styles.save}>
                        <Button text="Add" onPress={saveICD} />
                      </View>
                      <Gap width={20} />
                      <View style={styles.reset}>
                        <Button text="Reset" onPress={resetForm} />
                      </View>
                    </View>
                    {icd.map((data) => {
                      return (
                        <Item
                          key={data.id}
                          kode={data.kode}
                          penyakit={data.nama}
                          onDelete={() =>
                            Alert.alert('Warning', 'Are you sure?', [
                              {
                                text: 'No',
                                onPress: () => getData(),
                              },
                              {
                                text: 'Yes',
                                onPress: () => deleteICD(data),
                              },
                            ])
                          }
                        />
                      );
                    })}
                  </View>
                )}
                {content === 'Planning' && (
                  <View>
                    <Gap height={20} />
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                      }}>
                      <Button text="Tindakan" menu onPress={tindakan} />
                      <Gap width={20} />
                      <Button text="Rujukan" menu onPress={rujukan} />
                    </View>
                    <Gap height={16} />
                    <View>
                      <Autocomplete
                        autoCapitalize="none"
                        autoCorrect={false}
                        inputContainerStyle={styles.autocompleteContainer}
                        // Data to show in suggestion
                        data={filteredObat}
                        // Default value if you want to set something in input
                        defaultValue={
                          JSON.stringify(selectedValueObat) === '{}'
                            ? ''
                            : selectedValueObat.nama
                        }
                        onChangeText={(text) => findObat(text)}
                        placeholder="Cari berdasarkan nama obat"
                        renderItem={({item}) => (
                          // For the suggestion view
                          <TouchableOpacity
                            style={styles.subSearch}
                            onPress={() => {
                              setSelectedValueObat(item);
                              setFilteredObat([]);
                            }}>
                            <Text style={styles.itemText}>{item.nama}</Text>
                          </TouchableOpacity>
                        )}
                      />
                      <View style={styles.descriptionContainer}>
                        <View>
                          <Gap height={20} />
                          <View style={styles.aturanContainer}>
                            <View style={styles.aturan}>
                              <TextInput
                                width={100}
                                label="Aturan Obat"
                                value={qty}
                                onChangeText={(value) => setQty(value)}
                              />
                              <Gap width={25} />
                              <Text style={styles.x}>X</Text>
                              <Gap width={25} />
                              <TextInput
                                width={100}
                                label=" "
                                value={hari}
                                onChangeText={(value) => setHari(value)}
                              />
                            </View>
                            <View style={styles.jumlah}>
                              <TextInput
                                width={100}
                                label="Jumlah"
                                value={jumlah}
                                onChangeText={(value) => setJumlah(value)}
                              />
                            </View>
                            <Gap height={20} />
                          </View>
                        </View>
                      </View>
                    </View>
                    <Gap height={16} />
                    <View style={styles.footer}>
                      <View style={styles.save}>
                        <Button text="Add" onPress={saveObat} />
                      </View>
                      <Gap width={20} />
                      <View style={styles.reset}>
                        <Button text="Reset" onPress={resetFormObat} />
                      </View>
                    </View>
                    {resultObat.map((data) => {
                      return (
                        <Item
                          key={data.id}
                          kode={data.kode}
                          penyakit={data.nama}
                          onDelete={() =>
                            Alert.alert('Warning', 'Are you sure?', [
                              {
                                text: 'No',
                                onPress: () => getDataObat(),
                              },
                              {
                                text: 'Yes',
                                onPress: () => deleteObat(data),
                              },
                            ])
                          }
                        />
                      );
                    })}
                  </View>
                )}
                {content === 'Tindakan' && (
                  <View>
                    <Gap height={20} />
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                      }}>
                      <Button text="Rekomendasi Obat" menu onPress={planning} />
                      <Gap width={20} />
                      <Button text="Rujukan" menu onPress={rujukan} />
                    </View>
                    <Gap height={16} />
                    <View>
                      <Autocomplete
                        autoCapitalize="none"
                        autoCorrect={false}
                        inputContainerStyle={styles.autocompleteContainer}
                        // Data to show in suggestion
                        data={filteredTindakan}
                        // Default value if you want to set something in input
                        defaultValue={
                          JSON.stringify(selectedValueTindakan) === '{}'
                            ? ''
                            : selectedValueTindakan.nama
                        }
                        onChangeText={(text) => findTindakan(text)}
                        placeholder="Cari berdasarkan nama tindakan"
                        renderItem={({item}) => (
                          // For the suggestion view
                          <TouchableOpacity
                            style={styles.subSearch}
                            onPress={() => {
                              setSelectedValueTindakan(item);
                              setFilteredTindakan([]);
                            }}>
                            <Text style={styles.itemText}>{item.nama}</Text>
                          </TouchableOpacity>
                        )}
                      />
                      <View style={styles.descriptionContainer}>
                        {searchTindakan.length > 0 ? (
                          <View>
                            <Gap height={10} />
                            <TextInput
                              label="Harga"
                              defaultValue={selectedValueTindakan.umum}
                            />
                            <Gap height={10} />
                          </View>
                        ) : (
                          <View>
                            <Gap height={10} />
                            <TextInput label="Harga" />
                            <Gap height={10} />
                          </View>
                        )}
                      </View>
                    </View>
                    <Gap height={16} />
                    <View style={styles.footer}>
                      <View style={styles.save}>
                        <Button text="Add" onPress={saveTindakan} />
                      </View>
                      <Gap width={20} />
                      <View style={styles.reset}>
                        <Button text="Reset" onPress={resetFormTindakan} />
                      </View>
                    </View>
                    {resultTindakan.map((data) => {
                      return (
                        <Item
                          key={data.id}
                          kode={data.nama}
                          penyakit={data.umum}
                          onDelete={() =>
                            Alert.alert('Warning', 'Are you sure?', [
                              {
                                text: 'No',
                                onPress: () => getDataTindakan(),
                              },
                              {
                                text: 'Yes',
                                onPress: () => deleteTindakan(data),
                              },
                            ])
                          }
                        />
                      );
                    })}
                  </View>
                )}
                {content === 'Rujukan' && (
                  <View>
                    <Gap height={20} />
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                      }}>
                      <Button text="Tindakan" menu onPress={tindakan} />
                      <Gap width={20} />
                      <Button text="Rekomendasi Obat" menu onPress={planning} />
                    </View>
                    <Gap height={16} />
                    <View>
                      <TextInput
                        label="Rencana Pemeriksaan Penunjang"
                        placeholder="Masukkan Rencana Pemeriksaan Penunjang"
                        defaultValue={pemPenunjang}
                        onChangeText={(value) => setPemPenunjang(value)}
                      />
                      <Gap height={10} />
                      <TextInput
                        label="Rencana Edukasi: Pola Makan/Pola Aktifitas"
                        placeholder="Masukkan Rencana Edukasi: Pola Makan/Pola Aktifitas"
                        defaultValue={edukasi}
                        onChangeText={(value) => setEdukasi(value)}
                      />
                      <Gap height={10} />
                      <Text style={styles.label}>Rencana Rujukan</Text>
                      <Autocomplete
                        autoCapitalize="none"
                        autoCorrect={false}
                        inputContainerStyle={styles.autocompleteContainer}
                        // Data to show in suggestion
                        data={filteredRujukan}
                        // Default value if you want to set something in input
                        defaultValue={
                          JSON.stringify(selectedValueRujukan) === '{}'
                            ? ''
                            : selectedValueRujukan.nama
                        }
                        onChangeText={(text) => findRujukan(text)}
                        placeholder="Cari berdasarkan nama rumah sakit atau poli"
                        renderItem={({item}) => (
                          // For the suggestion view
                          <TouchableOpacity
                            style={styles.subSearch}
                            onPress={() => {
                              setSelectedValueRujukan(item);
                              setFilteredRujukan([]);
                            }}>
                            <Text style={styles.itemText}>{item.nama}</Text>
                          </TouchableOpacity>
                        )}
                      />
                      <Gap height={10} />
                      <Text style={styles.label}>Persetujuan</Text>
                      <RadioForm
                        radio_props={radio_props}
                        initial={0}
                        buttonSize={10}
                        onPress={(value) => setAgree(value)}
                      />
                      <Gap height={30} />
                      <Button text="Simpan" onPress={saveRujukan} />
                    </View>
                    <Gap height={16} />
                  </View>
                )}
                {content === 'Riwayat' && (
                  <View>
                    <Gap height={16} />
                    <View style={styles.headerForm}>
                      <Text style={styles.textHeaderForm}>Riwayat</Text>
                    </View>
                    <View style={styles.pemeriksaanAwal}>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Alergi: </Text>
                        <Text style={styles.value}>{rtAleri}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>
                          Riwayat Pengobatan Terdahulu:
                        </Text>
                        <Text style={styles.value}>{rtObatDulu}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>
                          Riwayat Penyakit Terdahulu:
                        </Text>
                        <Text style={styles.value}>{rtPenDulu}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>
                          Riwayat Penyakit di Keluarga:
                        </Text>
                        <Text style={styles.value}>{rtKeluarga}</Text>
                      </View>
                    </View>
                    <Gap height={16} />
                  </View>
                )}
                {content === 'Fisik' && (
                  <View>
                    <Gap height={16} />
                    <View style={styles.headerForm}>
                      <Text style={styles.textHeaderForm}>Fisik</Text>
                    </View>
                    <View style={styles.pemeriksaanAwal}>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Tinggi Badan: </Text>
                        <Text style={styles.value}>{tinggi} cm</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Berat Badan:</Text>
                        <Text style={styles.value}>{berat} kg</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Kesadaran</Text>
                        <Text style={styles.value}>{fkKesadaran}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>GCS:</Text>
                        <Text style={styles.value}>{gcs}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Tekanan Darah:</Text>
                        <Text style={styles.value}>{tekananDarah} mmHg</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Frekuensi Nadi:</Text>
                        <Text style={styles.value}>{fkNadi} x/mnt</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Frekuensi Nafas:</Text>
                        <Text style={styles.value}>{fkNafas} x/mnt</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Suhu Tubuh:</Text>
                        <Text style={styles.value}>{suhu} Celcius</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Masalah:</Text>
                        <Text style={styles.value}>{fkMasalah}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Detak Jantung:</Text>
                        <Text style={styles.value}>{heartRate} x/mnt</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Respirasi Rate:</Text>
                        <Text style={styles.value}>{respirasi} x/mnt</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Pemeriksaan Fisik:</Text>
                        <Text style={styles.value}>{pemFisik}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Catatan Keperawatan:</Text>
                        <Text style={styles.value}>{note}</Text>
                      </View>
                    </View>
                    <Gap height={16} />
                  </View>
                )}
                {content === 'Pernafasan' && (
                  <View>
                    <Gap height={16} />
                    <View style={styles.headerForm}>
                      <Text style={styles.textHeaderForm}>Pernafasan</Text>
                    </View>
                    <View style={styles.pemeriksaanAwal}>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Keluhan: </Text>
                        <Text style={styles.value}>{pnKeluhan}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Irama Nafas:</Text>
                        <Text style={styles.value}>{pnIramaNafas}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Suara Nafas:</Text>
                        <Text style={styles.value}>{pnSuaraNafas}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Masalah:</Text>
                        <Text style={styles.value}>{pnMasalah}</Text>
                      </View>
                    </View>
                    <Gap height={16} />
                  </View>
                )}
                {content === 'Kardiovaskular' && (
                  <View>
                    <Gap height={16} />
                    <View style={styles.headerForm}>
                      <Text style={styles.textHeaderForm}>Kardiovaskular</Text>
                    </View>
                    <View style={styles.pemeriksaanAwal}>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Nyeri Dada: </Text>
                        <Text style={styles.value}>{krNyeriDada}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Suara Jantung:</Text>
                        <Text style={styles.value}>{krSuaraJantung}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>CRT:</Text>
                        <Text style={styles.value}>{krCRT}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>JVP:</Text>
                        <Text style={styles.value}>{krJVP}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Masalah:</Text>
                        <Text style={styles.value}>{krMasalah}</Text>
                      </View>
                    </View>
                    <Gap height={16} />
                  </View>
                )}
                {content === 'Persyarafan' && (
                  <View>
                    <Gap height={16} />
                    <View style={styles.headerForm}>
                      <Text style={styles.textHeaderForm}>Persyarafan</Text>
                    </View>
                    <View style={styles.pemeriksaanAwal}>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Keluhan Pusing: </Text>
                        <Text style={styles.value}>{pfKeluhanPusing}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Kesadaran:</Text>
                        <Text style={styles.value}>{pfKesadaran}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Pupil:</Text>
                        <Text style={styles.value}>{pfPupil}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Sklera:</Text>
                        <Text style={styles.value}>{pfSklera}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Kaku Kuduk:</Text>
                        <Text style={styles.value}>{pfKakuKuduk}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Kelumpuhan:</Text>
                        <Text style={styles.value}>{pfKelumpuhan}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>
                          Gangguan Persepsi Sensorik:
                        </Text>
                        <Text style={styles.value}>{pfSensorik}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Masalah:</Text>
                        <Text style={styles.value}>{pfMasalah}</Text>
                      </View>
                    </View>
                    <Gap height={16} />
                  </View>
                )}
                {content === 'Pengidu' && (
                  <View>
                    <Gap height={16} />
                    <View style={styles.headerForm}>
                      <Text style={styles.textHeaderForm}>Pengidu</Text>
                    </View>
                    <View style={styles.pemeriksaanAwal}>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Keluhan: </Text>
                        <Text style={styles.value}>{puKeluhan}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Hidung:</Text>
                        <Text style={styles.value}>{puHidung}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Hidung Lainnya:</Text>
                        <Text style={styles.value}>{puHidungLainnya}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Masalah:</Text>
                        <Text style={styles.value}>{puMasalah}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Masalah Lainnya:</Text>
                        <Text style={styles.value}>{puMasalahLainnya}</Text>
                      </View>
                    </View>
                    <Gap height={16} />
                  </View>
                )}
                {content === 'Penglihatan' && (
                  <View>
                    <Gap height={16} />
                    <View style={styles.headerForm}>
                      <Text style={styles.textHeaderForm}>Penglihatan</Text>
                    </View>
                    <View style={styles.pemeriksaanAwal}>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Keluhan: </Text>
                        <Text style={styles.value}>{phKeluhan}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Memakai Kacamata:</Text>
                        <Text style={styles.value}>{phMemakaiKacamata}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Bagian Luar Bola Mata:</Text>
                        <Text style={styles.value}>{phLuarMata}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Bola Mata:</Text>
                        <Text style={styles.value}>{phBolaMata}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Bola Mata Lainnya:</Text>
                        <Text style={styles.value}>{phBolaMataLainnya}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Masalah:</Text>
                        <Text style={styles.value}>{phMasalah}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Masalah Lainnya:</Text>
                        <Text style={styles.value}>{phMasalahLainnya}</Text>
                      </View>
                    </View>
                    <Gap height={16} />
                  </View>
                )}
                {content === 'Pendengaran' && (
                  <View>
                    <Gap height={16} />
                    <View style={styles.headerForm}>
                      <Text style={styles.textHeaderForm}>Pendengaran</Text>
                    </View>
                    <View style={styles.pemeriksaanAwal}>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Keluhan: </Text>
                        <Text style={styles.value}>{pgKeluhan}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Keluhan Lainnya:</Text>
                        <Text style={styles.value}>{PgTelingaLainnya}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Telingan:</Text>
                        <Text style={styles.value}>{pgTelinga}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Masalah:</Text>
                        <Text style={styles.value}>{pgMasalah}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Masalah Lainnya:</Text>
                        <Text style={styles.value}>{PgMasalahLainnya}</Text>
                      </View>
                    </View>
                    <Gap height={16} />
                  </View>
                )}
                {content === 'Ekskresi' && (
                  <View>
                    <Gap height={16} />
                    <View style={styles.headerForm}>
                      <Text style={styles.textHeaderForm}>Ekskresi</Text>
                    </View>
                    <View style={styles.pemeriksaanAwal}>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Keluhan: </Text>
                        <Text style={styles.value}>{ekKeluhan}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Produksi Urin:</Text>
                        <Text style={styles.value}>{ekUrin}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>BAK:</Text>
                        <Text style={styles.value}>{ekBAK}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Warna:</Text>
                        <Text style={styles.value}>{ekWarna}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>BAU:</Text>
                        <Text style={styles.value}>{ekBAU}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Masalah:</Text>
                        <Text style={styles.value}>{ekMasalah}</Text>
                      </View>
                    </View>
                    <Gap height={16} />
                  </View>
                )}
                {content === 'Percernaan' && (
                  <View>
                    <Gap height={16} />
                    <View style={styles.headerForm}>
                      <Text style={styles.textHeaderForm}>Pencernaan</Text>
                    </View>
                    <View style={styles.pemeriksaanAwal}>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Mulut: </Text>
                        <Text style={styles.value}>{pcMulut}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Abdomen:</Text>
                        <Text style={styles.value}>{pcAbdomen}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Pembengkakan:</Text>
                        <Text style={styles.value}>{pcPembengkakan}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>BAB:</Text>
                        <Text style={styles.value}>{pcBAB}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Konsistensi:</Text>
                        <Text style={styles.value}>{pcKonsistensi}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Diet:</Text>
                        <Text style={styles.value}>{pcDiet}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Frekuensi:</Text>
                        <Text style={styles.value}>{pcFrekuensi}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Jumlah:</Text>
                        <Text style={styles.value}>{pcJumlah}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Masalah:</Text>
                        <Text style={styles.value}>{pcMasalah}</Text>
                      </View>
                    </View>
                    <Gap height={16} />
                  </View>
                )}
                {content === 'Kulit' && (
                  <View>
                    <Gap height={16} />
                    <View style={styles.headerForm}>
                      <Text style={styles.textHeaderForm}>Kulit</Text>
                    </View>
                    <View style={styles.pemeriksaanAwal}>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Kulit Gatal: </Text>
                        <Text style={styles.value}>{ktGatal}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Ujud Kelainan:</Text>
                        <Text style={styles.value}>{ktKelainan}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Gejala Lainnya:</Text>
                        <Text style={styles.value}>{ktLainnya}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Pergerakan Sendi:</Text>
                        <Text style={styles.value}>{ktSendi}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Akral:</Text>
                        <Text style={styles.value}>{ktAkral}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Patah Tulang di:</Text>
                        <Text style={styles.value}>{ktPatah}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Eksternal Fiksasi di:</Text>
                        <Text style={styles.value}>{ktEksternal}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Luka:</Text>
                        <Text style={styles.value}>{ktLuka}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Nyeri:</Text>
                        <Text style={styles.value}>{ktPerih}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Kukuatan Otot:</Text>
                        <Text style={styles.value}>{ktOtot}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Turgor:</Text>
                        <Text style={styles.value}>{ktTurgor}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Masalah:</Text>
                        <Text style={styles.value}>{ktMasalah}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Masalah Lainnya:</Text>
                        <Text style={styles.value}>{ktMasalahLainnya}</Text>
                      </View>
                    </View>
                    <Gap height={16} />
                  </View>
                )}
                {content === 'Reproduksi' && (
                  <View>
                    <Gap height={16} />
                    <View style={styles.headerForm}>
                      <Text style={styles.textHeaderForm}>Reproduksi</Text>
                    </View>
                    <View style={styles.pemeriksaanAwal}>
                      <Text style={styles.laki}>Laki-Laki</Text>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Penis: </Text>
                        <Text style={styles.value}>{rpPenis}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Scrotum:</Text>
                        <Text style={styles.value}>{rpScrotum}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Testis:</Text>
                        <Text style={styles.value}>{rpTestis}</Text>
                      </View>
                      <Text style={styles.perempuan}>Perempuan</Text>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Vagina:</Text>
                        <Text style={styles.value}>{rpVagina}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Pendarahan:</Text>
                        <Text style={styles.value}>{rpPendarahan}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Payudara:</Text>
                        <Text style={styles.value}>{rpPayudara}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Siklus Haid:</Text>
                        <Text style={styles.value}>{rpHaid}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Masalah:</Text>
                        <Text style={styles.value}>{rpMasalah}</Text>
                      </View>
                    </View>
                    <Gap height={16} />
                  </View>
                )}
                {content === 'Psikologis' && (
                  <View>
                    <Gap height={16} />
                    <View style={styles.headerForm}>
                      <Text style={styles.textHeaderForm}>Psikologis</Text>
                    </View>
                    <View style={styles.pemeriksaanAwal}>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Psikologis: </Text>
                        <Text style={styles.value}>{psPsikologis}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Sosiologis:</Text>
                        <Text style={styles.value}>{psSosiologis}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Spiritual:</Text>
                        <Text style={styles.value}>{psSpiritual}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Spiritual Lainnya:</Text>
                        <Text style={styles.value}>{psLainnya}</Text>
                      </View>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Masalah:</Text>
                        <Text style={styles.value}>{psMasalah}</Text>
                      </View>
                    </View>
                    <Gap height={16} />
                  </View>
                )}
                {content === 'Hambatan' && (
                  <View>
                    <Gap height={16} />
                    <View style={styles.headerForm}>
                      <Text style={styles.textHeaderForm}>Hambatan Diri</Text>
                    </View>
                    <View style={styles.pemeriksaanAwal}>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Hambatan Diri: </Text>
                        <Text style={styles.value}>{hambatanDiri}</Text>
                      </View>
                    </View>
                    <Gap height={16} />
                  </View>
                )}
                {content === 'Penunjang' && (
                  <View>
                    <Gap height={16} />
                    <View style={styles.headerForm}>
                      <Text style={styles.textHeaderForm}>Data Penunjang</Text>
                    </View>
                    <View style={styles.pemeriksaanAwal}>
                      <View style={styles.riwayat}>
                        <Text style={styles.label}>Data Penunjang: </Text>
                        <Text style={styles.value}>{Datapenunjang}</Text>
                      </View>
                    </View>
                    <Gap height={16} />
                  </View>
                )}
                {content === 'Resume' && (
                  <View>
                    <View>
                      <Gap height={16} />
                      <View style={styles.headerForm}>
                        <Text style={styles.textHeaderForm}>Subjektif</Text>
                      </View>
                      <View style={styles.pemeriksaanAwal}>
                        <View style={styles.riwayat}>
                          <Text style={styles.label}>Keluhan Utama: </Text>
                          <Text style={styles.value}>{ku}</Text>
                        </View>
                        <View style={styles.riwayat}>
                          <Text style={styles.label}>Keluhan Tambahan:</Text>
                          <Text style={styles.value}>{kt}</Text>
                        </View>
                        <View style={styles.riwayat}>
                          <Text style={styles.label}>
                            Riwayat Penyakit Terdahulu:
                          </Text>
                          <Text style={styles.value}>{rpt}</Text>
                        </View>
                        <View style={styles.riwayat}>
                          <Text style={styles.label}>
                            Riwayat Obat Terdahulu:
                          </Text>
                          <Text style={styles.value}>{rot}</Text>
                        </View>
                        <View style={styles.riwayat}>
                          <Text style={styles.label}>
                            Riwayat Penyakit di Keluarga:
                          </Text>
                          <Text style={styles.value}>{rpk}</Text>
                        </View>
                      </View>
                      <Gap height={16} />
                    </View>
                    <View>
                      <Gap height={16} />
                      <View style={styles.headerForm}>
                        <Text style={styles.textHeaderForm}>Objektif</Text>
                      </View>
                      <View style={styles.pemeriksaanAwal}>
                        <View style={styles.riwayat}>
                          <Text style={styles.label}>GCS: </Text>
                          <Text style={styles.value}>{gcs}</Text>
                        </View>
                        <View style={styles.riwayat}>
                          <Text style={styles.label}>Tekanan Darah:</Text>
                          <Text style={styles.value}>{tekananDarah}</Text>
                        </View>
                        <View style={styles.riwayat}>
                          <Text style={styles.label}>Detak Jantung:</Text>
                          <Text style={styles.value}>{heartRate}</Text>
                        </View>
                        <View style={styles.riwayat}>
                          <Text style={styles.label}>Suhu Badan:</Text>
                          <Text style={styles.value}>{suhu}</Text>
                        </View>
                        <View style={styles.riwayat}>
                          <Text style={styles.label}>Respirasi Rate:</Text>
                          <Text style={styles.value}>{respirasi}</Text>
                        </View>
                        <View style={styles.riwayat}>
                          <Text style={styles.label}>Tinggi Badan:</Text>
                          <Text style={styles.value}>{tinggi}</Text>
                        </View>
                        <View style={styles.riwayat}>
                          <Text style={styles.label}>Berat Badan:</Text>
                          <Text style={styles.value}>{berat}</Text>
                        </View>
                        <View style={styles.riwayat}>
                          <Text style={styles.label}>Pemeriksaan Fisik:</Text>
                          <Text style={styles.value}>{pemFisik}</Text>
                        </View>
                        <View style={styles.riwayat}>
                          <Text style={styles.label}>Catatan Keperawatan:</Text>
                          <Text style={styles.value}>{note}</Text>
                        </View>
                      </View>
                      <Gap height={16} />
                    </View>
                    <View>
                      <Gap height={16} />
                      <View style={styles.headerForm}>
                        <Text style={styles.textHeaderForm}>Assesment</Text>
                      </View>
                      {icd.map((data) => {
                        return (
                          <View style={styles.pemeriksaanAwal}>
                            <View style={styles.riwayat}>
                              <Text style={styles.label}>Kode: </Text>
                              <Text style={styles.value}>{data.kode}</Text>
                            </View>
                            <View style={styles.riwayat}>
                              <Text style={styles.label}>Nama Penyakit:</Text>
                              <Text style={styles.value}>{data.nama}</Text>
                            </View>
                          </View>
                        );
                      })}
                      <Gap height={10} />
                    </View>
                    <View>
                      <Gap height={16} />
                      <View style={styles.headerForm}>
                        <Text style={styles.textHeaderForm}>Planning</Text>
                      </View>
                      <Gap height={10} />
                      <Text style={styles.subPlanning}>Rekomendasi Obat</Text>
                      {resultObat.map((data) => {
                        return (
                          <View>
                            <View style={styles.pemeriksaanAwal}>
                              <View style={styles.riwayat}>
                                <Text style={styles.label}>Nama Obat: </Text>
                                <Text style={styles.value}>{data.nama}</Text>
                              </View>
                              <View style={styles.riwayat}>
                                <Text style={styles.label}>Aturan Pakai:</Text>
                                <Text style={styles.value}>
                                  {data.qty} x {data.hari} hari
                                </Text>
                              </View>
                            </View>
                          </View>
                        );
                      })}
                      <Gap height={10} />
                      <Text style={styles.subPlanning}>Tindakan</Text>
                      {resultTindakan.map((data) => {
                        return (
                          <View>
                            <View style={styles.pemeriksaanAwal}>
                              <View style={styles.riwayat}>
                                <Text style={styles.label}>
                                  Nama Tindakan:{' '}
                                </Text>
                                <Text style={styles.value}>{data.nama}</Text>
                              </View>
                              <View style={styles.riwayat}>
                                <Text style={styles.label}>Harga:</Text>
                                <Text style={styles.value}>{data.umum}</Text>
                              </View>
                            </View>
                          </View>
                        );
                      })}
                      {resultRujukan.map((data) => {
                        return (
                          <View>
                            <Gap height={10} />
                            <Text style={styles.subPlanning}>Rujukan</Text>
                            <View style={styles.pemeriksaanAwal}>
                              <View style={styles.riwayat}>
                                <Text style={styles.label}>
                                  Nama Rumah Sakit:{' '}
                                </Text>
                                <Text style={styles.value}>{data.nama}</Text>
                              </View>
                              <View style={styles.riwayat}>
                                <Text style={styles.label}>Alamat:</Text>
                                <Text style={styles.value}>{data.alamat}</Text>
                              </View>
                            </View>
                          </View>
                        );
                      })}
                      <Gap height={10} />
                    </View>
                  </View>
                )}
                {content === '' && (
                  <View>
                    <Gap height={16} />
                    <Image source={Background} style={styles.background} />
                    <Gap height={16} />
                  </View>
                )}
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
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
  text: (focused) => ({
    fontFamily: 'Poppins-Medium',
    color: focused ? '#020202' : '#8D92A3',
  }),
  scrollView: {
    flex: 1,
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
  save: {
    width: '40%',
  },
  reset: {
    width: '40%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    paddingVertical: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  desc: {
    marginLeft: 18,
    flex: 1,
  },
  descName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  descEmail: {
    fontSize: 16,
  },
  descBidang: {
    fontSize: 12,
    marginTop: 8,
  },
  delete: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#020202',
    marginRight: 30,
  },
  subPlanning: {
    fontFamily: 'Poppins-Regular',
    fontSize: 24,
    color: '#020202',
  },
  laki: {
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    color: '#020202',
  },
  perempuan: {
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    color: '#020202',
  },
  value: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#020202',
    marginRight: 30,
    width: 240,
  },
  pemeriksaanAwal: {
    paddingVertical: 12,
  },
  riwayat: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  aturan: {
    width: 350,
    flexDirection: 'row',
    alignItems: 'center',
  },
  x: {
    marginTop: 20,
  },
  aturanContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flex: 1,
    marginVertical: 20,
  },
  indicatorStyle: {
    backgroundColor: '#020202',
    height: 3,
    width: '20%',
    marginLeft: '5%',
  },
  backgroundTab: {
    backgroundColor: '#FFFFFF',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
  },
  tabStyle: {width: 'auto'},
  backgroundColor: {
    backgroundColor: '#FFFFFF',
  },
  containerTab: {
    paddingTop: 8,
  },
  safeArea: {
    flex: 1,
  },
});
