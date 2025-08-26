import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Add at the beginning of your file



const CartScreens = ({ route }) => {
  const { cartItems = [] } = route.params || {};

  return (
    <View style={styles.container}>
      <View style={{
        flexDirection:'row',
        justifyContent:'space-between',
        margin:30,

      }}>
              <Icon name="menu"
               size={34}
               color="orange"
              />
              <Text style={{color:'white',
                fontSize:40,
              }}>Cart</Text>
              <Image
              source={require("../assets/app_images/avatar.png")}
              style={{width:50,height:50,borderRadius:20}}
               />
      
            </View>
      

      {cartItems.map((item, index) => (
        <View
          key={index}
          style={{
            marginTop: 20,
            width: "90%",
            height: 180,
            backgroundColor: 'rgba(47, 39, 39, 0.9)',
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            alignSelf: 'center',
          }}
        >
          <Image
            source={{ uri: item.product.image }}
            style={{ width: 120, height: 120, borderRadius: 15 }}
          />

          <View style={{ marginLeft: 15, flex: 1 }}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
              {item.product.name}
            </Text>

            <Text style={{ color: 'orange', marginTop: 5 }}>
              Size: {item.selectedSize.label}
            </Text>

            <Text style={{ color: 'orange', marginTop: 5 }}>
              Quantity: {item.quantity}
            </Text>

            <Text style={{ color: 'orange', marginTop: 5 }}>
              Total: ${item.totalPrice}
            </Text>

            {/* Quantity buttons can be added here if needed */}
          </View>
        </View>
      ))}

      {cartItems.length === 0 && (
        <Text style={{ color: 'white', fontSize: 18, textAlign: 'center', marginTop: 40 }}>
          Your cart is empty.
        </Text>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
});


export default CartScreens;
