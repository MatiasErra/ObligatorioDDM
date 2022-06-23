import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";
import MyText from "../../components/MyText";


import conectionDb from "../../database/conectionDb";
const db = conectionDb.getConnection();


const AltaAuto =() => {
  // Permite guardar diferentes variables 
  const [Matricula, setMat] = useState('');
  const [Marca, setMar] = useState('');
  const [Color, setCol] = useState('');
  const [MotroSr, setMot] = useState('');



  const clearData = () => {
    // Permite limpiar los datos del formulario 
    setMat("");
    setMar("");
    setCol("");
    setMot("");
  };


  const registerUser = () => {
  console.log("states", Matricula, Marca, Color, MotroSr);
  // validaciones estados

  
  debugger;

    //Validar si los campos de formularios tienen datos
    if (!Matricula.trim()) {
      Alert.alert("Ingrese su nombre");
      return;
    }

    if (!Marca.trim()) {
      Alert.alert("Ingrese su apellido");
      return;
    }

    if (!Color.trim()) {
      Alert.alert("Ingrese su Cedula");
      return;
    }

    
    if (!MotroSr.trim()) {
      Alert.alert("Ingrese su matricula de vehiculo");
      return;
    }
    // Secuencia Sql que ingresa el Auto nuevo 
    db.transaction((tx) => {
      tx.executeSql(
     
      `INSERT INTO auto (matricula, marca, color, motorSr) VALUES (?, ?, ?, ?)`,
   
        [Matricula, Marca, Color, MotroSr],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rowsAffected > 0) {
            clearData();
            Alert.alert(
              "Exito",
              "Auto registrado!!!",
              
              [
                {
                  text: "Ok",
              
                },
              ],
              { cancelable: false }
              
            );
          } else {
            Alert.alert("Error al registrar Auto");
          }

        }
      );
    });
    //ActualizarUser()
  };
  return (
// Formulario para ingresar los datos del nuevo Auto
    <><MyText  text="Alta Auto" style={styles.Title} /><View style={styles.viewContainer}>
      <View style={styles.generalView}>
        <ScrollView>
          <KeyboardAvoidingView style={styles.keyboardView}>
            <MyInputText
              placeholder="Matricula del auto"
              onChangeText={setMat}
              style={styles.nameInput}
              value={Matricula} />

            <MyInputText
              placeholder="Marca"

              onChangeText={setMar}
              style={styles.passwordInput}
              value={Marca} />

            <MyInputText
              placeholder="Color"

              onChangeText={setCol}
              style={styles.emailInput}
              value={Color} />

            <MyInputText
              placeholder="Serial del motor"

              onChangeText={setMot}
              style={styles.emailInput}
              value={MotroSr} />

            <MySingleButton
              title="Guardar Auto"
              customPress={registerUser} />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View></>
 
 
 
    
    )

};
export default AltaAuto

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
  keyboardView: {
    flex: 1,
    justifyContent: "space-between",
  },
  nameInput: {
    padding: 15,
    textAlignVertical: "top",
  },
  passwordInput: {
    padding: 15,
    textAlignVertical: "top",
  },
  emailInput: {
    padding: 15,
    textAlignVertical: "top",
  },
  Title:{
    fontSize: 20,
alignSelf: "center",
marginTop : 10,
marginBottom: 20,
  }
});
