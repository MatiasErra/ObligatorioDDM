import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import MyText from "../../components/MyText";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

import conectionDb from "../../database/conectionDb";
const db = conectionDb.getConnection();

const UpdateTratamiento = () => {
// Permite guardar diferentes variables
  const [Nomsearch, setNomSearch] = useState("");
  const [Id, setId] = useState('');
  const [NameTra, setNameTra] = useState('');
  const [Matricula, setMatricula] = useState('');
  const [FechaIni, setFechaIni] = useState('');
  const [FechaFin, setFechaFin] = useState('');
  const [Insumo, setInsumo] = useState('');
  const [Repuesto, setRepuesto] = useState('');

  // Permite buscar al Tratamiento dado su matricula
  const searchTratamiento = () => {
    console.log("searchTratamiento");

    // Valida que el campo tenga algun dato
    if (!Nomsearch.trim()) {
      Alert.alert("El nombre del Tratamiento es requerido");
      return;
    }
    // Secuencia SQL que permite buscar el Tratamiento ingresado y guardar sus datos
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM tratamiento WHERE name = ?",
        [Nomsearch],
        (tx, results) => {
          if (results.rows.length > 0) {
            
            setId(results.rows.item(0).Trat_id);
            setNameTra(results.rows.item(0).name);
            setMatricula(results.rows.item(0).matricula);
            setFechaIni(results.rows.item(0).fechaIni);
            setFechaFin(results.rows.item(0).fechaFin);
            setInsumo(results.rows.item(0).insumos);
            setRepuesto(results.rows.item(0).repuestos);
          } else {
            Alert.alert("Tratamiento no encontrado");
          }
        }
      );
    });
  };

  const updateTratamiento = () => {
    console.log("states", NameTra, Matricula, FechaIni, FechaFin, Insumo, Repuesto);
 
// Valida que los Campos tengan datos 
    if (!NameTra.trim()) {
      Alert.alert("El nombre del Tratamiento no puede estar vacio");
      return;
    }

    if (!Matricula.trim()) {
      Alert.alert("La Matricula no puede estar vacio");
      return;
    }
    if (!FechaIni.trim()) {
        Alert.alert("La Fecha inicial no puede estar vacio");
        return;
    }
    if (!FechaFin.trim()) {
        Alert.alert("La Fecha Final no puede estar vacio");
        return;
    }

       if (!Insumo.trim()) {
        Alert.alert("Los insumos no pueden estar vacio");
        return;
    }

    if (!Repuesto.trim()) {
      Alert.alert("Los Repuesos no pueden estar vacio");
      return;
  }

    // Secuencia SQL que permite actualizar el Tratamiento con los nuevos datos

    db.transaction((tx) => {
      tx.executeSql(
        //tratamiento(Trat_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), matricula VARCHAR(20), fechaIni VARCHAR(20), fechaFin VARCHAR(40), insumos VARCHAR(40), repuestos VARCHAR(40))'
        "UPDATE tratamiento SET name = ?, matricula = ?, fechaIni = ?, fechaFin = ?, insumos = ?, repuestos = ?  WHERE Trat_id = ?",
        [NameTra, Matricula, FechaIni, FechaFin, Insumo, Repuesto, Id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert("Tratamiento actualizado");
          } else {
            Alert.alert("No se pudo actualizar el Tratamiento");
          }
        }
      );
    });
  };


  return (
    //Formulario de Buscar al Tratamiento y actualizar el Tratamiento
    <><MyText text="Update Tratamiento" style={styles.Title} />
    <SafeAreaView style={styles.container}>
          <View style={styles.viewContainer}>
              <View style={styles.generalView}>
                  <ScrollView keyboardShouldPersistTaps="handled">
                      <KeyboardAvoidingView
                          behavior="padding"
                          style={styles.keyboardView}
                      >
                          <MyText text="Buscar Tratamiento" style={styles.text} />
                          <MyInputText
                              placeholder="Ingrese el nombre del Tratamiento"
                              style={styles.inputStyle}
                              onChangeText={(text) => setNomSearch(text)} />
                          <MySingleButton title="Buscar" customPress={searchTratamiento} />
            
                          <MyInputText
                              placeholder="Ingrese el Nombre del Tratamiento:"
                              value={NameTra}
                              onChangeText={(text) =>setNameTra(text)} />
                          <MyInputText
                              placeholder="Ingrese la Matricula"
                              value={Matricula}
                              onChangeText={(text) => setMatricula(text)} />
                          <MyInputText
                              placeholder="Ingrese la Fecha de Ingreso:"
                              value={FechaIni}
                              onChangeText={(text) => setFechaIni(text)} />
                          <MyInputText
                              placeholder="Ingrese la Fecha de Salida:"
                              value={FechaFin}
                              onChangeText={(text) => setFechaFin(text)} />
                            <MyInputText
                              placeholder="Ingrese el Insumo"
                              value={Insumo}
                              onChangeText={(text) => setInsumo(text)} />
                          <MyInputText
                              placeholder="Ingrese el Repuesto"
                              value={Repuesto}
                              onChangeText={(text) => setRepuesto(text)} />

                          <MySingleButton title="Actualizar" customPress={updateTratamiento} />
                      </KeyboardAvoidingView>
                  </ScrollView>
              </View>
          </View>
      </SafeAreaView></>
  );
  }

export default UpdateTratamiento;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  generalView: {
    flex: 1,
  },
  text: {
    padding: 10,
    marginLeft: 25,
    color: "black",
  },
  inputStyle: {
    padding: 15,
  },
  keyboardView: {
    flex: 1,
    justifyContent: "space-between",
  },
  Title:{
    fontSize: 20,
alignSelf: "center",
marginTop : 50,
marginBottom: 20,
  }
});
