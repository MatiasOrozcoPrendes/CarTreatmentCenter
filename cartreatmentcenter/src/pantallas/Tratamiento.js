import React from 'react'
import { useState, useEffect} from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert, Modal, FlatList } from 'react-native'
import CtcInputText from '../componentes/CtcInputText'
import CtcBoton from '../componentes/CtcBoton'
import CtcCartaRepuesto from '../componentes/CtcCartaRepuesto'
import CtcCartaInsumo from '../componentes/CtcCartaInsumo'
import DatabaseConnection from '../database/database-connection';
const db = DatabaseConnection.getConnection();

const Tratamiento = ( {navigation, route} ) => {
  const Recibo = route.params;
  const [vehiculo, setVehiculo] = useState('');
  const [tratamiento, setTratamiento] = useState('');
  const [fechaIni, setFechaIni] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [manoDeObra, setManoDeObra] = useState('');
  const [costo, setCosto] = useState('');
  const [tratamientoID, setTratamientoID] = useState('');
  const [insumos, setInsumos] = useState([]);
  const [repuestos, setRepuestos] = useState([]);
  const listarInsumos = (item) => {
    return (
      <View >
        <CtcCartaInsumo 
            style={styles.carta}
            texto={item.cantidad + " - " + item.insumo}
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
            texto={item.cantidad + " - " + item.repuesto} 
            btnColor="#A9BCF5"
            customPress={() => setVehiculo(item)}
          />
      </View>
    );
  };
  function traigoInsumosFiltrados(){
    let auxTratamientoInsumos = [];
        db.transaction((tx) => {
            tx.executeSql(`SELECT * FROM tratamientoInsumos WHERE tratamientoId = ${tratamientoID}`, [], (tx, results) => {
              if (results.rows.length > 0) {
                let temp = [];
                let tratamientoInsumos
                for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
                temp.map((unTratamientoInsumos) => {
                  tratamientoInsumos = {
                      tratamientoId: unTratamientoInsumos.tratamientoId,
                      insumoId: unTratamientoInsumos.insumoId,
                      cantidad: unTratamientoInsumos.cantidad,
                      tratamientoInsumoId: unTratamientoInsumos.tratamientoInsumoId,
                      insumo: DoyNombreInsumo(unTratamientoInsumos.insumoId)
                    }
                    auxTratamientoInsumos.push(tratamientoInsumos);
                    setInsumos(auxTratamientoInsumos);
                })
              }
            });
        });
  }
  function traigoRepuestosFiltrados(){
    let auxTratamientoRepuestos = [];
        db.transaction((tx) => {
            tx.executeSql(`SELECT * FROM tratamientoRepuestos WHERE tratamientoId = ${tratamientoID}`, [], (tx, results) => {
              if (results.rows.length > 0) {
                let temp = [];
                let tratamientoRepuestos
                for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
                temp.map((unTratamientoRepuestos) => {
                  tratamientoRepuestos = {
                      tratamientoId: unTratamientoRepuestos.tratamientoId,
                      repuestoId: unTratamientoRepuestos.repuestoId,
                      cantidad: unTratamientoRepuestos.cantidad,
                      tratamientoRepuestoId: unTratamientoRepuestos.tratamientoRepuestoId,
                      repuesto: DoyNombreRepuesto(unTratamientoRepuestos.repuestoId)
                    }
                    auxTratamientoRepuestos.push(tratamientoRepuestos);
                    setRepuestos(auxTratamientoRepuestos);
                })
              }
            });
        });
  }
  function DoyNombreInsumo(id){
    let nombre = "-";
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM insumos WHERE insumoId = ${id}`, [], (tx, results) => {
        if (results.rows.length > 0) {
          nombre = results.rows.item(0).insumoNombre;
          return nombre;
          
        }
      });
    });
  }
  function DoyNombreRepuesto(id){
    let nombre = "";
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM repuestos WHERE repuestoId = ${id}`, [], (tx, results) => {
        if (results.rows.length > 0) {
          nombre = results.rows.item(0).repuestoNombre;
          return nombre;
        }
      });
    });
    
  }
  useEffect(() => {
    setVehiculo(Recibo.matricula);
    setTratamiento(Recibo.tratamiento);
    setFechaIni(Recibo.fechaInicioTratamiento);
    setFechaFin(Recibo.fechaFinalTratamiento);
    setManoDeObra(Recibo.manoDeObra);
    setCosto(Recibo.costo);
    setTratamientoID(Recibo.tratamientoID);
    traigoInsumosFiltrados();
    traigoRepuestosFiltrados();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.viewContainer}>
          <View style={styles.generalView}>
          
            <View style={styles.unaLinea}>
              <Text style={styles.texto}>Vehículo</Text>
              <CtcInputText 
                style={styles.input}
                placeholder="Vehiculo"
                value={vehiculo}
                onChangeText={(text) => setVehiculo(text)}    
              />
            </View>
            <View style={styles.unaLinea}>
              <Text style={styles.texto}>Tratamiento</Text>
              <CtcInputText 
                style={styles.input}
                placeholder="Tratamiento"
                value={tratamiento}
                onChangeText={(text) => setTratamiento(text)}    
              />
            </View>
            <View style={styles.unaLinea}>
              <Text style={styles.texto}>Fecha Inicio</Text>
              <CtcInputText 
                style={styles.input}
                placeholder="Fecha Inicio"
                value={fechaIni}
                onChangeText={(text) => setFechaIni(text)}    
              />
            </View>
            <View style={styles.unaLinea}>
              <Text style={styles.texto}>Fecha Fin</Text>
              <CtcInputText 
                style={styles.input}
                placeholder="Fecha Fin"
                value={fechaFin}
                onChangeText={(text) => setFechaFin(text)}    
              />
            </View>
            <View style={styles.unaLinea}>
              <Text style={styles.texto}>Mano De Obra</Text>
              <CtcInputText 
                style={styles.input}
                placeholder="Mano De Obra"
                value={manoDeObra.toString()}
                onChangeText={(text) => setManoDeObra(text)}    
              />
            </View>
            <View style={styles.unaLinea}>
              <Text style={styles.texto}>Costo Final</Text>
              <CtcInputText 
                style={styles.input}
                placeholder="Costo Final"
                value={costo.toString()}
                onChangeText={(text) => setManoDeObra(text)}    
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