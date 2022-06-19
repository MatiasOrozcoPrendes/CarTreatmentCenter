import React, { Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native'
import CtcInputText from '../componentes/CtcInputText'
import CtcBoton from '../componentes/CtcBoton'
import { AñadirUsuario, CargarUsuarios } from '../database/FuncionesABM'

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
  render(){	
  
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.viewContainer}>
          <View style={styles.generalView}>
            <View style={styles.unaLinea}>
              <Text style={styles.texto}>Nombre</Text>
              <CtcInputText 
                style={styles.input}
                placeholder="Nombre"
                onChangeText={(value) => this.handleInputChange('nombre', value)}    
              />
            </View>
            <View style={styles.unaLinea}>
              <Text style={styles.texto}>Apellido</Text>
              <CtcInputText 
                style={styles.input}
                placeholder="Apellido"
                onChangeText={(value) => this.handleInputChange('apellido', value)}    
              />
            </View>
            <View style={styles.unaLinea}>
              <Text style={styles.texto}>CI</Text>
              <CtcInputText 
                style={styles.input}
                placeholder="CI"
                onChangeText={(value) => this.handleInputChange('ci', value)}    
              />
            </View>
            <CtcBoton 
               style={styles.button}
               title="Crear"
               btnColor="#FF0000"
               customPress={() => { AñadirUsuario(this.state.ci, this.state.nombre, this.state.apellido)}}
            />
            <CtcBoton 
               style={styles.button}
               title="Listar"
               btnColor="#FF0000"
               customPress={() => { CargarUsuarios()}}
            />
          </View>
        </View>
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
  generalView: {
    flex: 1,
  },
  button: {
    width: 200, 
    height: 80,
  },
  unaLinea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  texto: {
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 15,
    fontSize: 20,
    color: 'black',
  },
  input: {
    width: 200, 
    height: 40,
  },
})