import React from 'react'
import { useState, useEffect} from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert, FlatList, ImageBackground} from 'react-native'
import CtcInputText from '../componentes/CtcInputText'
import CtcBoton from '../componentes/CtcBoton'
import CtcCartaInsumo from '../componentes/CtcCartaInsumo'
import CtcEtiqueta from '../componentes/CtcEtiqueta';
import { AñadirInsumo, ModificarInsumo, EliminarInsumo } from '../database/FuncionesABM'
import DatabaseConnection from '../database/database-connection';
const db = DatabaseConnection.getConnection();
 
const Insumos = () => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [insumoId, setInsumoId] = useState('');
  const [insumos, setInsumos] = useState([]);
  const listarInsumos = (item) => {
    return (
      <View >
        <CtcCartaInsumo 
            style={styles.carta}
            texto={item.insumoNombre}
            customPress={() => cargoInsumo(item)}
          />
      </View>
    );
  };
  function TraigoInsumo() {
    let auxInsumos = [];
        db.transaction((tx) => {
            tx.executeSql(`SELECT * FROM insumos`, [], (tx, results) => {
              if (results.rows.length > 0) {
                let temp = [];
                let insumo
                for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
                temp.map((unInsumo) => {
                    insumo = {
                        insumoId: unInsumo.insumoId,
                        insumoNombre: unInsumo.insumoNombre,
                        insumoPrecio: unInsumo.insumoPrecio,
                    }
                    auxInsumos.push(insumo);
                    setInsumos(auxInsumos);                        
                })
              }
            });
        }); 
  }
  function cargoInsumo(item) {
    setNombre(item.insumoNombre);
    setPrecio(item.insumoPrecio.toString());
    setInsumoId(item.insumoId);
  }
  function AltaInsumo() {
    if (nombre.length > 0 && precio.length > 0) {
      Alert.alert("Alta Insumo", `Desea agregar ${nombre} Precio: ${precio}?`, [
        {
          text: "SI",
          onPress() {
            AñadirInsumo(nombre, precio);
            setNombre('');
            setPrecio('');
            let identificadorTiempoDeEspera;
            identificadorTiempoDeEspera = setTimeout(TraigoInsumo, 1000);
          },
        },
        {
          text: "No",
        },
      ]);
    } else {
      Alert.alert('Error', 'Debe completar todos los campos');
    }

  }
  function ModInsumo() {
    if (nombre.length > 0 && precio.length > 0) {
      Alert.alert("Modificar Insumo", `Insumo ${nombre} Precio: ${precio}?`, [
        {
          text: "SI",
          onPress() {
            ModificarInsumo(insumoId, nombre, parseInt(precio));
            setNombre('');
            setPrecio('');
            setInsumoId('');
            let identificadorTiempoDeEspera;
            identificadorTiempoDeEspera = setTimeout(TraigoInsumo, 1000);
          },
        },
        {
          text: "No",
        },
      ]);
    } else {
      Alert.alert('Error', 'Debe completar todos los campos');
    }

  }
  function BajaInsumo() {
    if (insumoId != '') {
      Alert.alert("Eliminar Insumo", `Insumo ${nombre} Precio: ${precio}?`, [
        {
          text: "SI",
          onPress() {
            EliminarInsumo(insumoId);
            setNombre('');
            setPrecio('');
            setInsumoId('');
            let identificadorTiempoDeEspera;
            identificadorTiempoDeEspera = setTimeout(TraigoInsumo, 1000);
          },
        },
        {
          text: "No",
        },
      ]);

    } else {
      Alert.alert('Error', 'Debe seleccionar un insumo');
    }
  }

  useEffect(() => {
    TraigoInsumo();
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
              customPress={() => AltaInsumo()}
            />
            <CtcBoton 
              style={styles.button}
              title="Modificar"
              btnColor="#FF0000"
              customPress={() => ModInsumo()}
            />
            <CtcBoton 
              style={styles.button}
              title="Eliminar"
              btnColor="#FF0000"
              customPress={() => BajaInsumo()}
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
              data={insumos}
              renderItem={({ item }) => listarInsumos(item)}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  </SafeAreaView>
)
}

export default Insumos

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
    width: 200, 
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