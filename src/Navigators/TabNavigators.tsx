import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import {createBottomTabNavigator} from'@react-navigation/bottom-tabs'
import CartScreens from '../Screens/CartScreens';
import DetailScreens from '../Screens/PaymentScreens';
import FavouriteScreens from '../Screens/FavouriteScreens';
import HomeScreens from '../Screens/HomeScreens';
import { COLORS } from '../theme/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';






const Tab=createBottomTabNavigator();
    const TabNavigators = () => {
  return (
  <Tab.Navigator
  screenOptions={{
    tabBarHideOnKeyboard: true,
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: styles.tabBarStyle,
  }}
>
  <Tab.Screen
    name="Home"
    component={HomeScreens}
    options={{
      tabBarIcon: ({ focused }) => (
        <Icon
          name="home"
          size={24}
          color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
        />
      ),
    }}
  />
  <Tab.Screen
    name="Cart"
    component={CartScreens}
    options={{
      tabBarIcon: ({ focused }) => (
        <Icon
          name="shopping-cart"
          size={24}
          color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
        />
      ),
    }}
  />
  <Tab.Screen
    name="Favouritee"
    component={FavouriteScreens}
    options={{
      tabBarIcon: ({ focused }) => (
        <Icon
          name="favorite"
          size={24}
          color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
        />
      ),
    }}
  />
  <Tab.Screen
    name="History"
    component={DetailScreens}
    options={{
      tabBarIcon: ({ focused }) => (
        <Icon
          name="history"
          size={24}
          color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
        />
      ),
    }}
  />
</Tab.Navigator>

  )
}

export default TabNavigators

const styles = StyleSheet.create({
  tabBarStyle:{
    height:80,
    position:"absolute",
    // borderTopWidth:0,
    backgroundColor:COLORS.primaryBlackHex,
    // elevation:0,
    // borderTopColor:'transpart'


  }
   
}
)