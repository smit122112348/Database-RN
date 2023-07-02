import { Button, FlatList, View } from "react-native";
import { SafeAreaView, Text, TextInput, StyleSheet } from "react-native";
import { db } from "../src/config";
import React, { useState } from "react";
import { ref, set } from "firebase/database";

export default function HomeScreen()
{
    const [goals, setGoals] = useState([]);
    const [currentGoal, setCurrentGoal] = useState("");

    function addButtonHandler()
    {
        setGoals((currentGoals) => [...currentGoals, {
            text: currentGoal,
            id: Math.random().toString()
        }]);

        var newGoal = {
            name: currentGoal.text
        }

        set(ref(db, 'posts/' + currentGoal), {
            goal: currentGoal
        });
        setCurrentGoal("")
    }

    return (
        <SafeAreaView>
            <View>
                <TextInput style={styles.inputs} placeholder="Add you Goal here" onChangeText={setCurrentGoal} value={currentGoal}/>
                <Button title="Add Goal" onPress={addButtonHandler}/>
            </View>
            <View>
                <FlatList 
                    keyExtractor={(item, index) => {return item.id}}
                    data={goals}
                    renderItem={(itemData) => {
                        return (
                        <View>
                            <Text>{itemData.item.text}</Text>
                        </View>);
                    }}
                />
            </View>
        </SafeAreaView>
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