import React from 'react'
import { useState} from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert, FlatList, Modal } from 'react-native'
import CtcCartaTratamiento from '../componentes/CtcCartaTratamiento';
import CtcInputText from '../componentes/CtcInputText';
import CtcBoton from '../componentes/CtcBoton';

const BuscarTratamiento = ({ navigation }) => {
  const [tratamientos, setTratamientos] = useState(["Tratamiento 1", "Tratamiento 2", "Tratamiento 3", "Tratamiento 4", "Tratamiento 5"]);
  const [tratamiento, setTratamiento] = useState('');
  const [usuaruio, setUsuario] = useState('');
  const [modalVisible, setModalVisible] = useState(true);
  const listarTratamiento = (item) => {
    return (
      <View >
        <CtcCartaTratamiento 
            style={styles.carta}
            texto={item}
            btnColor="#A9BCF5"
            customPress={() => navigation.navigate("Tratamiento")}
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
        <Text style={styles.texto}>Tratamientos Terminados</Text>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={tratamientos}
          renderItem={({ item }) => listarTratamiento(item)}
        />
      </View>
    </View>
</SafeAreaView>
  )
}
export default BuscarTratamiento

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