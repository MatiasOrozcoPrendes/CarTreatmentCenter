import React from 'react'
import { useState} from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert, Modal, FlatList } from 'react-native'
import CtcInputText from '../componentes/CtcInputText'
import CtcBoton from '../componentes/CtcBoton'
import CtcCartaRepuesto from '../componentes/CtcCartaRepuesto'
import CtcCartaInsumo from '../componentes/CtcCartaInsumo'


const ModificarTratamiento = ({ navigation }) => {
  const [usuaruio, setUsuario] = useState('');
  const [vehiculo, setVehiculo] = useState('');
  const [tratamiento, setTratamiento] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [fechaIni, setFechaIni] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [manoDeObra, setManoDeObra] = useState('');
  const [insumos, setInsumos] = useState([ "Insumo 1", "Insumo 2", "Insumo 3", "Insumo 4", "Insumo 5"]);
  const [repuestos, setRepuestos] = useState([ "Repuesto 1", "Repuesto 2", "Repuesto 3", "Repuesto 4", "Repuesto 5"]);
  const listarInsumos = (item) => {
    return (
      <View >
        <CtcCartaInsumo 
            style={styles.carta}
            texto={item}
            btnColor="#A9BCF5"
            customPress={() => setVehiculo(item)}
          />
      </View>
    );
  };
  const listarRepuestos = (item) => {
    return (
      <View >
        <CtcCartaRepuesto 
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
          <Text style={styles.texto}>Insumo</Text>
          <CtcInputText 
            style={styles.input}
            placeholder="Insumo"
            onChangeText={(text) => setUsuario(text.trim())}    
          />
        </View>
        <View style={styles.unaLinea}>
          <Text style={styles.texto}>Cantidad</Text>
          <CtcInputText 
            style={styles.input}
            placeholder="Cantidad"
            onChangeText={(text) => setUsuario(text.trim())}    
          />
        </View>
        <View style={styles.unaLinea}>
            <CtcBoton 
                style={styles.button}
                title="Cargar"
                btnColor="#FF0000"
                customPress={() => setModalVisible(!modalVisible)}
              />
              <CtcBoton 
                style={styles.button}
                title="Agregar Insumo"
                btnColor="#FF0000"
                customPress={() => navigation.navigate("Insumos")}
              />
          </View>
          </View>
        </View>
        </Modal>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modal2Visible}
            onRequestClose={() => {
              setModal2Visible(!modal2Visible);
            }}
          >
          <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <View style={styles.unaLinea}>
          <Text style={styles.texto}>Repuesto</Text>
          <CtcInputText 
            style={styles.input}
            placeholder="Repuesto"
            onChangeText={(text) => setUsuario(text.trim())}    
          />
        </View>
        <View style={styles.unaLinea}>
          <Text style={styles.texto}>Cantidad</Text>
          <CtcInputText 
            style={styles.input}
            placeholder="Cantidad"
            onChangeText={(text) => setUsuario(text.trim())}    
          />
        </View>
        <View style={styles.unaLinea}>
          <CtcBoton 
            style={styles.button}
            title="Cargar"
            btnColor="#FF0000"
            customPress={() => setModal2Visible(!modal2Visible)}
          />
          <CtcBoton 
            style={styles.button}
            title="Agregar Repuesto"
            btnColor="#FF0000"
            customPress={() => navigation.navigate("Repuestos")}
          />
          </View>
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
            <View style={styles.unaLinea}>
              <Text style={styles.texto}>Fecha Fin</Text>
              <CtcInputText 
                style={styles.input}
                placeholder="Fecha Fin"
                onChangeText={(text) => setFechaFin(text.trim())}    
              />
            </View>
            <View style={styles.unaLinea}>
              <Text style={styles.texto}>Mano De Obra</Text>
              <CtcInputText 
                style={styles.input}
                placeholder="Mano De Obra"
                onChangeText={(text) => setManoDeObra(text.trim())}    
              />
            </View>
            <View style={styles.unaLinea}>
              <View>
                <FlatList
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                  data={insumos}
                  renderItem={({ item }) => listarInsumos(item)}
                />
                <CtcBoton 
                  style={styles.button2}
                  title="+ Ins"
                  btnColor="#FF0000"
                  customPress={() => setModalVisible(!modalVisible)}
                />
              </View>
              <View>
                <FlatList
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                  data={repuestos}
                  renderItem={({ item }) => listarRepuestos(item)}
                />
                <CtcBoton 
                  style={styles.button2}
                  title="+ Rep"
                  btnColor="#FF0000"
                  customPress={() => setModal2Visible(!modal2Visible)}
                />
              </View>
            </View>
            
            <View style={styles.unaLinea}>
                <CtcBoton 
                  style={styles.button}
                  title="Modificar"
                  btnColor="#FF0000"
                  customPress={() => Alert.alert(`Vehiculo:${vehiculo} Tratamiento:${tratamiento}`)}
                />
                <CtcBoton 
                  style={styles.button}
                  title="Eliminar"
                  btnColor="#FF0000"
                  customPress={() => Alert.alert(`Vehiculo:${vehiculo} Tratamiento:${tratamiento}`)}
                />
            </View>
            
          </View>
        </View>
    </SafeAreaView>
  )
}


export default ModificarTratamiento

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
    height: 50,
  },
  button2: {
    width: 90, 
    height: 50,
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