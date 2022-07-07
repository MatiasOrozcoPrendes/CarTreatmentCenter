import React from 'react'
import { useState, useEffect} from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert, FlatList, ImageBackground  } from 'react-native'
import CtcInputText from '../componentes/CtcInputText'
import CtcBoton from '../componentes/CtcBoton'
import CtcCartaRepuesto from '../componentes/CtcCartaRepuesto'
import CtcEtiqueta from '../componentes/CtcEtiqueta';
import { AñadirRepuesto, ModificarRepuesto, EliminarRepuesto } from '../database/FuncionesABM'
import DatabaseConnection from '../database/database-connection';
const db = DatabaseConnection.getConnection();

const Repuestos = () => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [repuestoId, setRepuestoId] = useState('');
  const [repuestos, setRepuestos] = useState([]);
  const listarRepuestos = (item) => {
    return (
      <View >
        <CtcCartaRepuesto 
            style={styles.carta}
            texto={item.repuestoNombre}
            customPress={() => cargoRepuesto(item)}
          />
      </View>
    );
  };
  function TraigoRepuesto() {
    let auxRepuestos = [];
        db.transaction((tx) => {
            tx.executeSql(`SELECT * FROM repuestos`, [], (tx, results) => {
              if (results.rows.length > 0) {
                let temp = [];
                let repuesto
                for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
                temp.map((unRepuesto) => {
                  repuesto = {
                    repuestoId: unRepuesto.repuestoId,
                    repuestoNombre: unRepuesto.repuestoNombre,
                    repuestoPrecio: unRepuesto.repuestoPrecio,
                  }
                  auxRepuestos.push(repuesto);
                  setRepuestos(auxRepuestos);                        
                })
              }
            });
        }); 
  }
  function cargoRepuesto(item) {
    setNombre(item.repuestoNombre);
    setPrecio(item.repestoPrecio.toString());
    setRepuestoId(item.repuestoId);
  }
  function AltaRepuesto() {
    if (nombre.length > 0 && precio.length > 0) {
      AñadirRepuesto(nombre, precio);
      setNombre('');
      setPrecio('');
    } else {
      Alert.alert('Error', 'Debe completar todos los campos');
    }
    TraigoRepuesto();
  }
  function ModRepuesto() {
    if (nombre.length > 0 && precio.length > 0) {
      ModificarRepuesto(repuestoId, nombre, precio);
      setNombre('');
      setPrecio('');
    } else {
      Alert.alert('Error', 'Debe completar todos los campos');
    }
    TraigoRepuesto();
  }
  function BajaRepuesto() {
    if (repuestoId != '') {
      EliminarRepuesto(repuestoId);
      setRepuestoId('');
    } else {
      Alert.alert('Error', 'Debe seleccionar un repuesto');
    }
    TraigoInsumo();
  }
  useEffect(() => {
    TraigoRepuesto();
  }, []);

return (
  <SafeAreaView style={styles.container}>
    <ImageBackground source={require('../imagenes/Fondo2.jpg')} resizeMode="cover" style={styles.imageBack}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <View style={styles.unaLinea}>
            <CtcEtiqueta texto="Nombre" style={styles.etiqueta}/>
            <CtcInputText 
              style={styles.input}
              placeholder="Nombre"
              value={nombre}
              onChangeText={(text) => setNombre(text)}    
            />
          </View>
          <View style={styles.unaLinea}>
          <CtcEtiqueta texto="Precio" style={styles.etiqueta}/>
            <CtcInputText 
              style={styles.input}
              placeholder="Precio"
              value={precio}
              keyboardType="numeric"
              onChangeText={(text) => setPrecio(text)}    
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
          <View style={styles.unaLinea}>
          <CtcBoton 
              style={styles.button}
              title="Agregar"
              btnColor="#FF0000"
              customPress={() => AltaRepuesto()}
            />
            <CtcBoton 
              style={styles.button}
              title="Modificar"
              btnColor="#FF0000"
              customPress={() => ModRepuesto()}
            />
            <CtcBoton 
              style={styles.button}
              title="Eliminar"
              btnColor="#FF0000"
              customPress={() => BajaRepuesto()}
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
            <FlatList
              contentContainerStyle={{ paddingHorizontal: 20 }}
              data={repuestos}
              renderItem={({ item }) => listarRepuestos(item)}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  </SafeAreaView>
)
}
export default Repuestos

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
  imageBack: {
    flex: 1,
    justifyContent: "center"
  },
  etiqueta: {
    width: 80,
  },
})