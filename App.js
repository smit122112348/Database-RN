import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import { View } from 'react-native';
import { AddData } from './src';
import RegisterUser from './screens/RegisterUser';

const Stack = createStackNavigator();
function StackGroup()
{
  return (
    <Stack.Navigator initialRouteName='LoginScreen'>
      <Stack.Screen name="LoginScreen" component={LoginScreen}/>
      <Stack.Screen name="RegisterScreen" component={RegisterUser}/>
      <Stack.Screen name="HomeScreen" component={HomeScreen}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StackGroup />
    </NavigationContainer>

    // <View style={styles.container}>
    //   <AddData />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
