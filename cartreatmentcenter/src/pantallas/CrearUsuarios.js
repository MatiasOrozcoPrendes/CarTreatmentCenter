import React from 'react'
import { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Alert, KeyboardAvoidingView, ImageBackground } from 'react-native'
import CtcInputText from '../componentes/CtcInputText'
import CtcBoton from '../componentes/CtcBoton'
import CtcEtiqueta from '../componentes/CtcEtiqueta'
import { AñadirUsuario } from '../database/FuncionesABM'

const CrearUsuarios = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [ci, setCi] = useState('');

  function AgregarUsuario () {
    if(nombre === '' || apellido === '' || ci === ''){
      Alert.alert('Error', 'Debe completar todos los campos')
    }
    else{
      if (ci.length !== 8){
        Alert.alert('Error', 'El CI debe tener 8 dígitos')
      }
      else{
        AñadirUsuario(ci, nombre, apellido)
        setNombre('')
        setApellido('')
        setCi('')
      }
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../imagenes/Fondo2.jpg')} resizeMode="cover" style={styles.imageBack}>
        <View style={styles.viewContainer}>
          <View style={styles.generalView}>
            <KeyboardAvoidingView behavior="padding">
              <View style={styles.unaLinea}>
                <CtcEtiqueta texto="Nombre" style={styles.etiqueta}/>
                <CtcInputText 
                  style={styles.input}
                  placeholder="Nombre"
                  value={nombre}
                  onChangeText={(value) => setNombre(value)}   
               />
              </View>
              <View style={styles.unaLinea}>
              <CtcEtiqueta texto="Apellido" style={styles.etiqueta}/>
                <CtcInputText 
                  style={styles.input}
                  placeholder="Apellido"
                  value={apellido}
                  onChangeText={(value) => setApellido(value)}
                />
              </View>
              <View style={styles.unaLinea}>
              <CtcEtiqueta texto="CI" style={styles.etiqueta}/>
                <CtcInputText 
                  style={styles.input}
                  placeholder="12345678"
                  keyboardType="numeric"
                  maxLength={8}
                  value={ci}
                  onChangeText={(value) => setCi(value)}
                />
              </View>
              <View
                style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 3,
                marginTop: 20,
                marginBottom: 30,
                }}
              />
            <View style={[{justifyContent: 'center'}, {alignItems: 'center'} ]}>
                <CtcBoton 
                    style={styles.button}
                    title="Crear"
                    fontSize={20}
                    customPress={() => { AgregarUsuario() }}
                />
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
      </ImageBackground> 
    </SafeAreaView>
  )
}


export default CrearUsuarios

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    top: 20,
  },
  generalView: {
    flex: 1,
  },
  button: {
    width: 150, 
    height: 70,
  },
  unaLinea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    width: 200, 
    height: 40,
  },
  imageBack: {
    flex: 1,
    justifyContent: "center"
  },
  etiqueta: {
    width: 80,
  },
})