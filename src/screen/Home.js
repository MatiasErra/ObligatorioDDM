import React, {useEffect} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Alert } from "react-native";
import MyButton from "../components/MyButton";

import conectionDb from "../database/conectionDb";
const db = conectionDb.getConnection();


const Home = ({ navigation }) => {
    useEffect(() => {
        db.transaction( (txn) => {
          
          txn.executeSql(
        
            `SELECT name FROM sqlite_master WHERE type='table' AND name='users'`,
            [],
             (tx, res) =>{
              console.log('item:', res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS users', []);
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS users(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_app VARCHAR(40), ci VARCHAR(40), auto VARCHAR(20))',
                  [],);
              }
            }
          );
          txn.executeSql(
        
            `SELECT name FROM sqlite_master WHERE type='table' AND name='auto'`,
            [],
             (tx, res) =>{
              console.log('item:', res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS auto', []);
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS auto(auto_id INTEGER PRIMARY KEY AUTOINCREMENT, matricula VARCHAR(20), marca VARCHAR(20), color VARCHAR(20), motorSr VARCHAR(40))',
                  [],);
              }
            }
          );

          txn.executeSql(
      
            `SELECT name FROM sqlite_master WHERE type='table' AND name='tratamiento'`,
            [],
             (tx, res) =>{
              console.log('item:', res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS tratamiento', []);
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS tratamiento(Trat_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), matricula VARCHAR(20), fechaIni VARCHAR(20), fechaFin VARCHAR(40), insumos VARCHAR(40), repuestos VARCHAR(40))',
             
                  [],);
              }
            }
          );

        });
      }, []);

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.viewContainer}>
      <View style={styles.generalView}>
        <View style={styles.generalView}>
          <ScrollView>
            <MyButton
              title="Abm de usuario"
              btnColor="#438c99"
              
              btnIcon="user-plus"
              customPress={() => navigation.navigate("AbmUser")}
            />
         

      
            <MyButton
              title="Abm de Autos"
              btnColor="#438c99"
              
              btnIcon="car"
              customPress={() => navigation.navigate("AbmAutos")}
            />

            <MyButton
              title="Abm de Tratamiento"
              btnColor="#438c99"
              
              btnIcon="car"
              customPress={() => navigation.navigate("AbmTratamiento")}
            />
         </ScrollView>
        </View>
      </View>
    </View>
   

    
       
  
  
  </SafeAreaView>

  
);
};
  

export default Home


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    viewContainer: {
      flex: 1,
      backgroundColor: "black",
    },
    generalView: {
      flex: 1,
      justifyContent: "center",
    },
  });