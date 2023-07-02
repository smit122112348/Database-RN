import { useState } from "react";
import { Button, FlatList, View } from "react-native";
import { SafeAreaView, Text, TextInput } from "react-native";
import { storeGoal } from "../http";

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

        storeGoal(newGoal);
    }

    return (
        <SafeAreaView>
            <View>
                <TextInput placeholder="Add you Goal here" onChangeText={setCurrentGoal} value={currentGoal}/>
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