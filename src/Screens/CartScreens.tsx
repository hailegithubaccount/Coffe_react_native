import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
const CartScreens = ({ route }) => {
  const { product, selectedSize, quantity, totalPrice } = route.params;

  return (
    <View style={styles.container}>

      <View style={{
        flexDirection: "row",
        justifyContent: 'space-between',
        top: 59,
        backgroundColor: '#21262E',
        marginBottom: 20,


      }}>
        <Icon name="menu"
          size={34}
          color="orange"
        />
        <Text style={{
          color: 'white',
          fontSize: 23
        }}>
          Cart
        </Text>
        <Image
          source={require("../assets/app_images/avatar.png")}
          style={{ width: 50, height: 50, borderRadius: 20 }}
        />

      </View>
      <View style={{
        marginTop: 50, width: "100%", height: 180, backgroundColor: 'rgba(47, 39, 39, 0.9)', borderRadius: 40, flexDirection: 'row', gap: 20
      }}
      >
        <Image
          source={{ uri: product.image }}
          style={{ width: 140, height: 140, borderRadius: 20, marginTop: 20, marginLeft: 10 }}
        />
        <View>
          <View>
            <Text style={{
              color: 'white',
              marginTop: 20,
              fontSize: 20

            }}>{product.name}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View
              style={{ margin: 10, width: 50, height: 40, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}
            >
              <Text style={{
                color: 'white'
              }}>M</Text>
            </View>
            <View>
              <Text
                style={{
                  color: 'orange',
                  marginTop: 20,
                }}>
                ${totalPrice}
              </Text>

            </View>

          </View>

<View style={{flexDirection:'row',gap:10}}>
  <TouchableOpacity
  
  style={{
    width:20,
    height:20,
    backgroundColor:'orange'
  }}
 
  
  >
     <Text style={{fontSize:20,alignContent:'center',justifyContent:'center',color:'black'}}>
      -
  </Text>

  </TouchableOpacity>
  <Text style={{color:'white'}}>
    {quantity}
    
  </Text>
  <TouchableOpacity
   style={{
    width:20,
    height:20,
    backgroundColor:'orange'
  }}
 
  
  >
     <Text style={{fontSize:20,alignContent:'center',justifyContent:'center',color:'black'}}>
      +
  </Text>

  </TouchableOpacity>

</View>
          
        </View>








      </View>

    </View>
  );
};

export default CartScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  text: {
    fontSize: 18,
    color: 'white',
    marginTop: 50

  },
});
