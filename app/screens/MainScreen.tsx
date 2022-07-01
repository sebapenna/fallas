import React, {useReducer, useState} from 'react';
import {Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Modal} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {CustomPicker, Item} from '../components/DropDownList';
import axios from "axios";

interface Form {
  precio: string,
  rigidez: string,
  duracion: string,
  resistencia: string,
  movimiento: string,
}

const defaultForm = {
  precio: 'BA',
  rigidez: 'RIM',
  duracion: 'DB',
  resistencia: 'REB',
  movimiento: 'TM',
}

const MainScreen = () => {

  const {top} = useSafeAreaInsets()

  const [form, setForm] = useReducer((state: Form, newState: Partial<Form> ) => ({...state, ...newState}), defaultForm, () => defaultForm)

  const [recommendation, setRecommendation] = useState('')

  const hideModal = () => {
    setRecommendation('')
  }

  const sendForm = async () => {
    const res = await axios.get('http://192.168.0.4:5000/buscar_colchon', {
      params: form
    })
    console.log(res.data)
    setRecommendation(res.data)
  }

  return (
    <View style={[styles.container]}>
      <StatusBar style={'light'}/>
      <View style={[styles.titleContainer, {paddingTop: top}]} >
        <View style={styles.titleSubContainer}>
          <Text style={styles.title}>Recomendador de colchones</Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.subtitle}>Seleccione las características</Text>
        <Text style={styles.itemTitle}>Precio</Text>
        <CustomPicker style={styles.input} selectedValue={form.precio} onValueChange={v => setForm({precio: v})}>
          <Item label={'Caro'} value="CA"  />
          <Item label={'Economico'} value="EC"  />
          <Item label={'Barato'} value="BA"  />
        </CustomPicker>
        <Text style={styles.itemTitle}>Rigidez</Text>
        <CustomPicker style={styles.input} selectedValue={form.rigidez} onValueChange={v => setForm({rigidez: v})}>
          <Item label={'Baja'} value="RIB"  />
          <Item label={'Media'} value="RIM"  />
          <Item label={'Alta'} value="RIA"  />
        </CustomPicker>
        <Text style={styles.itemTitle}>Duración</Text>
        <CustomPicker style={styles.input} selectedValue={form.duracion} onValueChange={v => setForm({duracion: v})}>
          <Item label={'Mas de 10 años'} value="DA"  />
          <Item label={'Entre 5 y 10 años'} value="DM"  />
          <Item label={'Menos de 5 años'} value="DB"  />
        </CustomPicker>
        <Text style={styles.itemTitle}>Resistencia</Text>
        <CustomPicker style={styles.input} selectedValue={form.resistencia} onValueChange={v => setForm({resistencia: v})}>
          <Item label={'Baja'} value="REB"  />
          <Item label={'Media'} value="REM"  />
          <Item label={'Alta'} value="REA"  />
        </CustomPicker>
        <Text style={styles.itemTitle}>Movimiento</Text>
        <CustomPicker style={styles.input} selectedValue={form.movimiento} onValueChange={v => setForm({movimiento: v})}>
          <Item label={'No transfiere'} value="NT"  />
          <Item label={'Transfiere poco'} value="TP"  />
          <Item label={'Transfiere mucho'} value="TM"  />
        </CustomPicker>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={sendForm} activeOpacity={0.7} style={styles.button}>
          <Text style={styles.buttonText}>Obtener recomendación</Text>
        </TouchableOpacity>
      </View>
      <Modal transparent visible={!!recommendation}>
        <TouchableOpacity activeOpacity={1} onPress={hideModal} style={styles.modalTouch}>
          <View style={styles.recommendationContainer}>
            <Text style={styles.recommendationText}>{recommendation}</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    backgroundColor: '#ff6a00',
    alignItems: 'center'
  },
  titleSubContainer: {
    paddingVertical: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white'
  },
  formContainer: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    alignSelf: 'center'
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 32
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 32,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'flex-start',
  },
  input: {
    paddingVertical: 5,
    marginTop: 8,
    marginBottom: 18,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ff6a00',
    width: '100%',
  },
  button: {
    backgroundColor: '#ff6a00',
    borderRadius: 10,
    paddingVertical: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  modalTouch: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00000022',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recommendationContainer: {
    backgroundColor: 'white',
    width: '70%',
    padding: 32,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  recommendationText: {},
});
