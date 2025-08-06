import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useStore } from '../store/store'
import { COLORS } from '../theme/theme'
import Icon from 'react-native-vector-icons/MaterialIcons';



const Catagores=['all','withmilk','milk','tea']





const HomeScreens = () => {
  const CoffeeData= useStore((state: any)=>state.CoffeeData)
  console.log(CoffeeData);

  
  return (
    <View style={styles.container}>
      <View style={styles.imagewithicon}>
        <Icon name="menu"
         size={34}
         color="orange"
        />
        <Image
        source={require("../assets/app_images/avatar.png")}
        style={{width:50,height:50,borderRadius:20}}
         />

      </View>
     
       <Text style={{
        fontWeight:600,
        fontSize:28,
        fontStyle:'SemiBold',
        lineHeight:36,
        marginTop:45,
        marginHorizontal:60,
        color:"#FFFFFF"
       


      
      

        

      }}>
        FIND THE BEST COFFE FOR YOU</Text>
    

    <View style={styles.catgoriesContainer}> 

      { Catagores.map((cat)=>(
        <TouchableOpacity key={cat}>
          <Text>{cat}</Text>
        </TouchableOpacity>
      ))}



    </View>
     
      
    </View>
  )
}

export default HomeScreens

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:40,
    backgroundColor:COLORS.primaryBlackHex

  },
  imagewithicon:{
    flexDirection:"row",
    justifyContent:'space-between',
    top:59,
    backgroundColor:'#21262E',
    margin:30
    

  },
  catgoriesContainer:{

  }
})