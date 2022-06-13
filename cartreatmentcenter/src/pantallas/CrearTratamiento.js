import React from 'react'
import { useState} from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert, Modal } from 'react-native'
import CtcInputText from '../componentes/CtcInputText'
import CtcBoton from '../componentes/CtcBoton'

const CrearTratamiento = () => {
  const [usuaruio, setUsuario] = useState('');
  const [vehiculo, setVehiculo] = useState('');
  const [tratamiento, setTratamiento] = useState('');
  const [modalVisible, setModalVisible] = useState(true);
  const [fechaIni, setFechaIni] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [manoDeObra, setManoDeObra] = useState('');
  const [insumos, setInsumos] = useState([ "Insumo 1", "Insumo 2", "Insumo 3", "Insumo 4", "Insumo 5"]);
  const [repuestos, setRepuestos] = useState([ "Repuesto 1", "Repuesto 2", "Repuesto 3", "Repuesto 4", "Repuesto 5"]);
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.viewContainer}>
          <View style={styles.generalView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
          <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <View style={styles.unaLinea}>
          <Text style={styles.texto}>Usuario</Text>
          <CtcInputText 
            style={styles.input}
            placeholder="Usuario"
            onChangeText={(text) => setUsuario(text.trim())}    
          />
        </View>
        <CtcBoton 
            style={styles.button}
            title="Cargar"
            btnColor="#FF0000"
            customPress={() => setModalVisible(!modalVisible)}
          />
          </View>
        </View>
        </Modal>
            <View style={styles.unaLinea}>
              <Text style={styles.texto}>Vehículo</Text>
              <CtcInputText 
                style={styles.input}
                placeholder="Vehiculo"
                onChangeText={(text) => setVehiculo(text.trim())}    
              />
            </View>
            <View style={styles.unaLinea}>
              <Text style={styles.texto}>Tratamiento</Text>
              <CtcInputText 
                style={styles.input}
                placeholder="Tratamiento"
                onChangeText={(text) => setTratamiento(text.trim())}    
              />
            </View>
            <View style={styles.unaLinea}>
              <Text style={styles.texto}>Fecha Inicio</Text>
              <CtcInputText 
                style={styles.input}
                placeholder="Fecha Inicio"
                onChangeText={(text) => setFechaIni(text.trim())}    
              />
            </View>
            <CtcBoton 
              style={styles.button}
              title="Crear"
              btnColor="#FF0000"
              customPress={() => Alert.alert(`Vehiculo:${vehiculo} Tratamiento:${tratamiento}`)}
            />
          </View>
        </View>
    </SafeAreaView>
  )
}

export default CrearTratamiento

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
    width: 120, 
    height: 60,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
})