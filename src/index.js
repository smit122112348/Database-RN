import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { db } from "./config";
import React, { useState } from "react";
import { ref, set } from "firebase/database";

export const AddData = () =>{
    const [goalID, setGoalID] = useState("");
    const [goalText, setGoalText] = useState("");

    //function to add data to Firebase realtime db
    const addData = () => {
        set(ref(db, 'posts/' + goalText), {
            goal: goalText
        });
        setGoalText("")
    }


    return (
        <View style={styles.container}>
            <View>
                <TextInput style={styles.inputs} placeholder="Add you Goal here" onChangeText={setGoalText} value={goalText}/>
                <Button title="Add Goal" onPress={addData}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    inputs: {
        margin: 10,
        fontSize: 22,
        fontWeight: "bold",
        padding: 10
    },

  });