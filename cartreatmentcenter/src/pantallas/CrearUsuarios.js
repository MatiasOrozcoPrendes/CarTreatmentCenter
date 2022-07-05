import React, { Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Alert, KeyboardAvoidingView, ImageBackground  } from 'react-native'
import CtcInputText from '../componentes/CtcInputText'
import CtcBoton from '../componentes/CtcBoton'
import CtcEtiqueta from '../componentes/CtcEtiqueta'
import { AñadirUsuario } from '../database/FuncionesABM'

class CrearUsuarios extends Component{
  state = {
    nombre: '',
    apellido: '',
    ci: ''
  }
  handleInputChange = (inputName, inputValue) => {
    this.setState(state =>({
      ...state,
      [inputName]: inputValue
    }))
  }
  AgregarUsuario = () => {
    const { nombre, apellido, ci } = this.state
    if(nombre === '' || apellido === '' || ci === ''){
      Alert.alert('Error', 'Debe completar todos los campos')
    }
    else{
      if (ci.length !== 8){
        Alert.alert('Error', 'El CI debe tener 8 dígitos')
      }
      else{
        AñadirUsuario(ci, nombre, apellido)
        this.setState({
          nombre: '',
          apellido: '',
          ci: ''
        })
      }
    }
  }

  render(){	
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../imagenes/Fondo2.jpg')} resizeMode="cover" style={styles.imageBack}>
        <View style={styles.viewContainer}>
            <KeyboardAvoidingView behavior="padding">
              <View style={styles.unaLinea}>
                <CtcEtiqueta texto="Nombre" style={styles.texto}/>
                <CtcInputText 
                  style={styles.input}
                  placeholder="Nombre"
                  value={this.state.nombre}
                  onChangeText={(value) => this.handleInputChange('nombre', value)}    
                />
              </View>
              <View style={styles.unaLinea}>
              <CtcEtiqueta texto="Apellido" />
                <CtcInputText 
                  style={styles.input}
                  placeholder="Apellido"
                  value={this.state.apellido}
                  onChangeText={(value) => this.handleInputChange('apellido', value)}    
                />
              </View>
              <View style={styles.unaLinea}>
              <CtcEtiqueta texto="     CI     " />
                <CtcInputText 
                  style={styles.input}
                  placeholder="CI"
                  keyboardType="numeric"
                  maxLength={8}
                  value={this.state.ci}
                  onChangeText={(value) => this.handleInputChange('ci', value)}

                  
                />
              </View>
              <CtcBoton 
                  style={styles.button}
                  title="Crear"
                  fontSize={20}
                  customPress={() => { this.AgregarUsuario() }}
                    
              />
            </KeyboardAvoidingView>
        </View>
      </ImageBackground> 
    </SafeAreaView>
  )
}
}

export default CrearUsuarios

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    width: 80, 
    height: 60,
  },
  unaLinea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  texto: {

  },
  input: {
    width: 200, 
    height: 40,
  },
  imageBack: {
    flex: 1,
    justifyContent: "center"
  },
})