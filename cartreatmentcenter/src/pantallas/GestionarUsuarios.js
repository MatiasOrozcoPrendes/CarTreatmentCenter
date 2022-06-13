import React from 'react'
import { useState} from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert, FlatList, Modal } from 'react-native'
import CtcInputText from '../componentes/CtcInputText'
import CtcBoton from '../componentes/CtcBoton'
import CtcCartaVehiculo from '../componentes/CtcCartaVehiculo';

const GestionarUsuarios = ({ navigation }) => {
  const [vehiculos, setVehiculos] = useState(["Vehiculo 1", "Vehiculo 2", "Vehiculo 3", "Vehiculo 4", "Vehiculo 5"]);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [ci, setCi] = useState('');
  const [vehiculo, setVehiculo] = useState('');
  const [modalVisible, setModalVisible] = useState(true);
  const listarVehiculos = (item) => {
    return (
      <View >
        <CtcCartaVehiculo 
            style={styles.carta}
            texto={item}
            btnColor="#A9BCF5"
            customPress={() => setVehiculo(item)}
          />
      </View>
    );
  };

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
          <Text style={styles.texto}>Nombre</Text>
          <CtcInputText 
            style={styles.input}
            placeholder="Nombre"
            onChangeText={(text) => setNombre(text.trim())}    
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
          <Text style={styles.texto}>Nombre</Text>
          <CtcInputText 
            style={styles.input}
            placeholder="Nombre"
            value={nombre}
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
        <View style={styles.unaLinea}>
          <CtcBoton 
            style={styles.button}
            title="Modificar"
            btnColor="#FF0000"
            customPress={() => Alert.alert(`Nombre:${nombre} Apellido:${apellido} CI:${ci}`)}
          />
          <CtcBoton 
            style={styles.button}
            title="Eliminar"
            btnColor="#FF0000"
            customPress={() => Alert.alert(`Nombre:${nombre} Apellido:${apellido} CI:${ci}`)}
          />
        </View>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={vehiculos}
          renderItem={({ item }) => listarVehiculos(item)}
        />
        <View style={styles.unaLinea}>
          <CtcBoton 
            style={styles.button}
            title="Agregar"
            btnColor="#FF0000"
            customPress={() => navigation.navigate("AgregarVehiculo")}
          />
          <CtcBoton 
            style={styles.button}
            title="Modificar"
            btnColor="#FF0000"
            customPress={() => navigation.navigate("ModificarVehiculo")}
          />
          <CtcBoton 
            style={styles.button}
            title="Eliminar"
            btnColor="#FF0000"
            customPress={() => Alert.alert(`Elimino:${vehiculo}`)}
          />
        </View>
      </View>
    </View>
</SafeAreaView>
  )
}

export default GestionarUsuarios

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
  button: {
    width: 100, 
    height: 80,
  },
  carta:{
    width: 250, 
    height: 50,
  },
  listItemView: {
    margin: 5,
    alignItems: "center",
    elevation: 5,
    width: 300, 
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