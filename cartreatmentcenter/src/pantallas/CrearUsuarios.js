import React from 'react'
import { useState} from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native'
import CtcInputText from '../componentes/CtcInputText'
import CtcBoton from '../componentes/CtcBoton'

const CrearUsuarios = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [ci, setCi] = useState('');
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.viewContainer}>
          <View style={styles.generalView}>
            <View style={styles.unaLinea}>
              <Text style={styles.texto}>Nombre</Text>
              <CtcInputText 
                style={styles.input}
                placeholder="Nombre"
                onChangeText={(text) => setNombre(text.trim())}    
              />
            </View>
            <View style={styles.unaLinea}>
              <Text style={styles.texto}>Apellido</Text>
              <CtcInputText 
                style={styles.input}
                placeholder="Apellido"
                onChangeText={(text) => setApellido(text.trim())}    
              />
            </View>
            <View style={styles.unaLinea}>
              <Text style={styles.texto}>CI</Text>
              <CtcInputText 
                style={styles.input}
                placeholder="CI"
                onChangeText={(text) => setCi(text.trim())}    
              />
            </View>
            <CtcBoton 
               style={styles.button}
               title="Crear"
               btnColor="#FF0000"
               customPress={() => Alert.alert(`Nombre:${nombre} Apellido:${apellido} CI:${ci}`)}
            />
          </View>
        </View>
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