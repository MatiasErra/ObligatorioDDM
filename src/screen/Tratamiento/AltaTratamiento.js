import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} 

from "react-native";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";
import MyText from "../../components/MyText";


import conectionDb from "../../database/conectionDb";
const db = conectionDb.getConnection();

const AltaTratamiento =() => {
    // Permite guardar diferentes variables 
    const [NameTra, setNameTra] = useState('');
    const [Matricula, setMat] = useState('');
    const [FechaIni, setFechaIni] = useState('');
    const [FechaFin, setFechaFin] = useState('');
    const [Insumos, setInsumos] = useState('');
    const [Repuestos, setRepuestos] = useState('');
  
  
    const clearData = () => {
        // Permite limpiar los datos del formulario 
        setNameTra("");
        setMat("");
        setFechaIni("");
        setFechaFin("");
        setInsumos("");
        setRepuestos("");
      };

      const registerTratamineto = () => {
        console.log("states", NameTra, Matricula, FechaIni, FechaFin, Insumos, Repuestos);
        // validaciones estados
      


         debugger;

    //Validar si los campos de formularios tienen datos
    if (!NameTra.trim()) {
      Alert.alert("Ingrese Trataminto");
      return;
    }

    if (!Matricula.trim()) {
      Alert.alert("Ingrese Matricula");
      return;
    }

    if (!FechaIni.trim()) {
      Alert.alert("Ingrese fecha de ingreso ");
      return;
    }

    
    if (!FechaFin.trim()) {
      Alert.alert("Ingrese fecha de salida");
      return;
    }

    if (!Insumos.trim()) {
        Alert.alert("Ingrese insumo final");
        return;
      }
  
      
      if (!Repuestos.trim()) {
        Alert.alert("Ingrese repuesto");
        return;
      }

       // Secuencia Sql que ingresa el Auto nuevo 
    db.transaction((tx) => {
        tx.executeSql(
       
        `INSERT INTO tratamiento (name ,matricula, fechaIni, fechaFin, insumos , repuestos) VALUES (?, ?, ?, ?, ?,?)`,
     
          [NameTra,Matricula, FechaIni, FechaFin, Insumos, Repuestos],
          (tx, results) => {
            console.log("results", results);
            // validar resultado
            if (results.rowsAffected > 0) {
              clearData();
              Alert.alert(
                "Exito",
                "Tratamiento registrado!!!",
                
                [
                  {
                    text: "Ok",
                
                  },
                ],
                { cancelable: false }
                
              );
            } else {
              Alert.alert("Error al registrar el tratamiento");
            }
  
          }
        );
      });
      //ActualizarTratamiento()
    };
    return (
        // Formulario para ingresar los datos del nuevo tratamiento
            <><MyText  text="Alta Tratamiento" style={styles.Title} /><View style={styles.viewContainer}>
              <View style={styles.generalView}>
                <ScrollView>
                  <KeyboardAvoidingView style={styles.keyboardView}>
                    <MyInputText
                      placeholder="Nombre Tratamiento"
                      onChangeText={setNameTra}
                      style={styles.nameInput}
                      value={NameTra} />
        
                    <MyInputText
                      placeholder="Matricula"
        
                      onChangeText={setMat}
                      style={styles.passwordInput}
                      value={Matricula} />
        
                    <MyInputText
                      placeholder="Fecha Inicio"
        
                      onChangeText={setFechaIni}
                      style={styles.emailInput}
                      value={FechaIni} />
        
                    <MyInputText
                      placeholder="Fecha Final"
        
                      onChangeText={setFechaFin}
                      style={styles.emailInput}
                      value={FechaFin} />
        
                 <MyInputText
                      placeholder="Insumo"
        
                      onChangeText={setInsumos}
                      style={styles.emailInput}
                      value={Insumos} />

                <MyInputText
                      placeholder="Repuestos"
        
                      onChangeText={setRepuestos}
                      style={styles.emailInput}
                      value={Repuestos} />

                    <MySingleButton
                      title="Guardar Tratamiento"
                      customPress={registerTratamineto} />
                  </KeyboardAvoidingView>
                </ScrollView>
              </View>
            </View></>
         
         
         
            
            )
        
        }
        export default AltaTratamiento
        
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
