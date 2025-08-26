import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigators from './src/Navigators/TabNavigators';
import OrderHistoryScreens from './src/Screens/OrderHistoryScreens';
import LoginScreens from './src/Screens/LoginScreens';
import CartScreens from './src/Screens/CartScreens';
import PaymentScreens from './src/Screens/PaymentScreens'
import { CartProvider } from './src/Context/CartContext'; 

const Stack = createNativeStackNavigator();

function App() {
  return (
     <CartProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Login" component={LoginScreens} />
        <Stack.Screen
        name="Tab"
        component={TabNavigators}
        options={{animation:"slide_from_bottom",title:"Tab page"}}
        >
       </Stack.Screen>    
        <Stack.Screen
        name="details"
        component={OrderHistoryScreens}
        options={{animation:"slide_from_bottom",title:"order page"}}
        >
       </Stack.Screen> 

        <Stack.Screen
        name="payment"
        component={PaymentScreens}
        options={{animation:"slide_from_bottom",title:"order page"}}
        >
       </Stack.Screen> 
       
       
      </Stack.Navigator>
    </NavigationContainer>
    </CartProvider>
  );
}

export default App;
