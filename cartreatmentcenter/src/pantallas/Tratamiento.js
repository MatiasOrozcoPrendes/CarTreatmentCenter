import React from 'react'
import { useState} from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert, Modal, FlatList } from 'react-native'
import CtcInputText from '../componentes/CtcInputText'
import CtcBoton from '../componentes/CtcBoton'
import CtcCartaRepuesto from '../componentes/CtcCartaRepuesto'
import CtcCartaInsumo from '../componentes/CtcCartaInsumo'

const Tratamiento = () => {
  const [usuaruio, setUsuario] = useState('');
  const [vehiculo, setVehiculo] = useState('');
  const [tratamiento, setTratamiento] = useState('');
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
              <Text style={styles.texto}>Costo Final</Text>
              <CtcInputText 
                style={styles.input}
                placeholder="Costp Final"
                onChangeText={(text) => setManoDeObra(text.trim())}    
              />
            </View>
            <View style={styles.unaLinea}>
                <FlatList
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                  data={insumos}
                  renderItem={({ item }) => listarInsumos(item)}
                />
                <FlatList
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                  data={repuestos}
                  renderItem={({ item }) => listarRepuestos(item)}
                />
            </View>
          </View>
        </View>
    </SafeAreaView>
  )
}

export default Tratamiento

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
  
})