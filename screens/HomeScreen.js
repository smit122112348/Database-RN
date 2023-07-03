import { Button, FlatList, View } from "react-native";
import { SafeAreaView, Text, TextInput, StyleSheet } from "react-native";
import { db } from "../src/config";
import React, { useState, useEffect } from "react";
import { ref, set, onValue, remove, push} from "firebase/database";

export default function HomeScreen()
{
    const [editing, setEditing] = useState(false);
    const [editingGoal, setEditingGoal] = useState(null);
    const [goalData, setGoalData] = useState([]);
    const [currentGoal, setCurrentGoal] = useState("");

    var TopView = null;

    useEffect(() => {
        const starCountRef = ref(db, 'posts/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            var newPosts = null;
           if(data)
           {
            newPosts = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));
           }
            console.log(newPosts);
            setGoalData(newPosts);
        });

        if(!editing)
        {
            TopView = () => {
                return(
                    <View>
                        <TextInput style={styles.inputs} placeholder="Add you Goal here" onChangeText={setCurrentGoal} value={currentGoal}/>
                        <Button title="Add Goal" onPress={addButtonHandler}/>
                    </View>
                );
            }
        }
        else
        {
            TopView = () => {
                return(
                    <View>
                    <TextInput style={styles.inputs} placeholder="" onChangeText={setCurrentGoal} value={setCurrentGoal}/>
                    <Button title="Edit Goal" onPress={updateButtonHandler}/>
                </View>
                );
            }
        }


    }, []);

    function addButtonHandler()
    {
        push(ref(db, 'posts/'), {
            goal: currentGoal
        }).then();
        setCurrentGoal("");
        setEditing(false);
    }

    function updateButtonHandler()
    {
        set(ref(db, 'posts/' + editingGoal.id), {
            goal: currentGoal
        }).then();
        setCurrentGoal("");
        setEditing(false);
    }

    function editButtonHandler(id)
    {
        const searchObject= goalData.find((goal) => goal.id === id);
        setCurrentGoal(searchObject.goal);
        setEditingGoal(searchObject);
        setEditing(true);
    }

    function deleteButtonHandler(id)
    {
        remove(ref(db, 'posts/' + id)).then(() => {console.log("deleted")}).catch((error) => {console.log("error: ", error)});
    }

    return (
        <SafeAreaView>
            {editing ? (
            <View>
                <TextInput style={styles.inputs} placeholder="" onChangeText={setCurrentGoal} value={currentGoal}/>
                <Button title="Edit Goal" onPress={updateButtonHandler}/>
                <Button title="Add Goal" onPress={addButtonHandler}/>
            </View>
        ) : <View>
                <TextInput style={styles.inputs} placeholder="Add you Goal here" onChangeText={setCurrentGoal} value={currentGoal}/>
                <Button title="Add Goal" onPress={addButtonHandler}/>
            </View>
            }
            <View>
                <FlatList 
                    keyExtractor={(item, index) => {return item.id}}
                    data={goalData}
                    renderItem={(itemData) => {
                        return (
                        <View>
                            <Text>goal: {itemData.item.goal}</Text>
                            <Text>id: {itemData.item.id}</Text>
                            <Button title="Edit" onPress={() => {editButtonHandler(itemData.item.id)}} />
                            <Button title="Delete" onPress={() => {deleteButtonHandler(itemData.item.id)}} />
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