import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigators from './src/Navigators/TabNavigators';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen
        name="Tab"
        component={TabNavigators}
        options={{animation:"slide_from_bottom",title:"Tab page"}}
        >
       </Stack.Screen>    
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
