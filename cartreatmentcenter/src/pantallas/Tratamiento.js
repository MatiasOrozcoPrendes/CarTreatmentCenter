import React from 'react'
import { useState, useEffect} from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert, Modal, FlatList, ImageBackground  } from 'react-native'
import CtcInputText from '../componentes/CtcInputText'
import CtcCartaRepuesto from '../componentes/CtcCartaRepuesto'
import CtcCartaInsumo from '../componentes/CtcCartaInsumo'
import CtcEtiqueta from '../componentes/CtcEtiqueta'
import DatabaseConnection from '../database/database-connection';
const db = DatabaseConnection.getConnection();

const Tratamiento = ( {navigation, route} ) => {
  const Recibo = route.params;
  const [entrada, setEntrada] = useState(Recibo.aux);
  const [todosInsumos, setTodosInsumos] = useState(traigoInsumos());
  const [todosRepuestos, setTodosRepuestos] = useState(traigoRepuestos());
  const [vehiculo, setVehiculo] = useState(Recibo.matricula);
  const [tratamiento, setTratamiento] = useState(Recibo.tratamiento);
  const [fechaIni, setFechaIni] = useState(Recibo.fechaInicioTratamiento);
  const [fechaFin, setFechaFin] = useState(Recibo.fechaFinalTratamiento);
  const [manoDeObra, setManoDeObra] = useState(Recibo.manoDeObra);
  const [costo, setCosto] = useState(Recibo.costo);
  const [tratamientoID, setTratamientoID] = useState(Recibo.tratamientoID);
  const [insumos, setInsumos] = useState([]);
  const [repuestos, setRepuestos] = useState([]);
  const [auxiliar, setAuxiliar] = useState(1);
  //Recorre el array de insumosfiltrados y los muestra en una lista
  const listarInsumos = (item) => {
    return (
      <View >
        <CtcCartaInsumo 
            style={styles.carta}
            texto={item.cantidad + " - " + item.insumo}
          />
      </View>
    );
  };
  //Recorre el array de repuestosfiltrados y los muestra en una lista
  const listarRepuestos = (item) => {
    return (
      <View >
        <CtcCartaRepuesto 
          style={styles.carta}
          texto={item.cantidad + " - " + item.repuesto} 
        />
      </View>
    );
  };
  //Trae los insumos de la base de datos
  function traigoInsumos() {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM insumos', [], (tx, results) => {
        var len = results.rows.length;
        var insumos = [];
        var insumo
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          insumo = {
            insumoId : row.insumoId,
            insumoNombre : row.insumoNombre,
            insumoPrecio : row.insumoPrecio,
          }
          insumos.push(insumo);
        }
        setTodosInsumos(insumos);
        return insumos;
      });
    });
  }
  //Trae los repuestos de la base de datos
  function traigoRepuestos() {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM repuestos', [], (tx, results) => {
        var len = results.rows.length;
        var repuestos = [];
        var repuesto
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          repuesto = {
            repuestoId : row.repuestoId,
            repuestoNombre : row.repuestoNombre,
            repuestoPrecio : row.repuestoPrecio,
          }
          repuestos.push(repuesto);
        }
        setTodosRepuestos(repuestos);
        return repuestos;
      });
    });
  }
  //Trae solo los insumos que se encuentran en el tratamiento
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
  //Trae solo los repuestos que se encuentran en el tratamiento
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
  //Recibe el id del insumo y devuelve el nombre
  function DoyNombreInsumo(id){
    let auxInsumo
    todosInsumos.map((unInsumo) => {
      let texto = unInsumo.insumoNombre;
      let arrayDeCadenas = texto.split(" ");
      let nombre = arrayDeCadenas[0];
      if (unInsumo.insumoId == id){
        auxInsumo = nombre;
      }
    })
    return auxInsumo;
  }
  //Recibe el id del repuesto y devuelve el nombre
  function DoyNombreRepuesto(id){
    let auxRepuesto
    todosRepuestos.map((unRepuesto) => {
      let texto = unRepuesto.repuestoNombre;
      let arrayDeCadenas = texto.split(" ");
      let nombre = arrayDeCadenas[0];
      if(unRepuesto.repuestoId == id){
        auxRepuesto = nombre;
      }
    }
    )
    return auxRepuesto;
  }
  //Se utiliza para el correcto funcuonamiento del useEffect
  function CambioAuxiliar(){
    setAuxiliar(Math.random());
  }
  //Entra cada ves que se abre la pantalla espera un segundo y que se carguen los arrat de insumos y repuestos y llama a la funcion que trae los Insumos Filtrados y Repuestos Filtrados
  useEffect(() => {
    let identificadorTiempoDeEspera;
    identificadorTiempoDeEspera = setTimeout(CambioAuxiliar, 1000);
  }, [entrada])
  //Llama a la funcion que trae los Insumos Filtrados y Repuestos Filtrados
  useEffect(() => {
    if (auxiliar != 1){
      traigoInsumosFiltrados();
      traigoRepuestosFiltrados();
    }
  }, [auxiliar])

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../imagenes/Fondo2.jpg')} resizeMode="cover" style={styles.imageBack}>
        <View style={styles.viewContainer}>
          <View style={styles.generalView}>
          
            <View style={styles.unaLinea}>
              <CtcEtiqueta texto="Vehículo" style={styles.etiqueta}/>
              <CtcInputText 
                style={styles.input}
                placeholder="Vehiculo"
                value={vehiculo}
                onChangeText={(text) => setVehiculo(text)}    
              />
            </View>
            <View style={styles.unaLinea}>
              <CtcEtiqueta texto="Tratamiento" style={styles.etiqueta}/>
              <CtcInputText 
                style={styles.input}
                placeholder="Tratamiento"
                value={tratamiento}
                onChangeText={(text) => setTratamiento(text)}    
              />
            </View>
            <View style={styles.unaLinea}>
              <CtcEtiqueta texto="Fecha Inicio" style={styles.etiqueta}/>
              <CtcInputText 
                style={styles.input}
                placeholder="Fecha Inicio"
                value={fechaIni}
                onChangeText={(text) => setFechaIni(text)}    
              />
            </View>
            <View style={styles.unaLinea}>
              <CtcEtiqueta texto="Fecha Fin" style={styles.etiqueta}/>
              <CtcInputText 
                style={styles.input}
                placeholder="Fecha Fin"
                value={fechaFin}
                onChangeText={(text) => setFechaFin(text)}    
              />
            </View>
            <View style={styles.unaLinea}>
              <CtcEtiqueta texto="Mano De Obra" style={styles.etiqueta}/>
              <CtcInputText 
                style={styles.input}
                placeholder="Mano De Obra"
                value={manoDeObra.toString()}
                onChangeText={(text) => setManoDeObra(text)}    
              />
            </View>
            <View style={styles.unaLinea}>
              <CtcEtiqueta texto="Costo Final" style={styles.etiqueta}/>
              <CtcInputText 
                style={styles.input}
                placeholder="Costo Final"
                value={costo.toString()}
                onChangeText={(text) => setManoDeObra(text)}    
              />
            </View>
            <View
              style={{
              borderBottomColor: 'gray',
              borderBottomWidth: 3,
              marginTop: 10,
              marginBottom: 10,
              }}
            />
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
      </ImageBackground>
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
  imageBack: {
    flex: 1,
    justifyContent: "center"
  },
  etiqueta: {
    width: 110,
  },
})