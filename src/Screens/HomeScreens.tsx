import { Image, StyleSheet, Text, TouchableOpacity, View,FlatList } from 'react-native'
import React, { useState } from 'react'

import { COLORS } from '../theme/theme'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Dimensions } from 'react-native';




const categories = ['All', 'Tea', 'Coffee', 'Milk'];

const itemsByCategory = {
  All: [
    {
      name: 'Green Tea',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=100&q=80',
      description: 'Fresh and calming green tea.',
      price: '$2',
      type: 'Bean',
      ingredients: 'Africa',
    },
     {
      name: 'Green Tea',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=100&q=80',
      description: 'Fresh and calming green tea.',
      price: '$2',
       type: 'Bean',
      ingredients: 'Africa',
    },
     {
      name: 'Green Tea',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=100&q=80',
      description: 'Fresh and calming green tea.',
      price: '$2',
       type: 'Bean',
      ingredients: 'Africa',
    },
    {
      name: 'Espresso Coffee',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=100&q=80',
      description: 'Strong and rich espresso.',
      price: '$3',
       type: 'Bean',
      ingredients: 'Africa',
    },
    {
      name: 'Organic Milk',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=100&q=80',
      description: 'Fresh organic cow milk.',
      price: '$1.5',
       type: 'Bean',
      ingredients: 'Africa',
    },
  ],
  Tea: [
    {
      name: 'Green Tea',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=100&q=80',
      description: 'Fresh and calming green tea.',
      price: '$2',
       type: 'Bean',
      ingredients: 'Africa',
    },
  ],
  Coffee: [
    {
      name: 'Espresso Coffee',
      image: 'https://images.unsplash.com/photo-1587037030272-4dfe57b47c2d?auto=format&fit=crop&w=100&q=80',
      description: 'Strong and rich espresso.',
      price: '$3',
       type: 'Bean',
      ingredients: 'Africa',
    },
  ],
  Milk: [
    {
      name: 'Organic Milk',
      image: 'https://images.unsplash.com/photo-1601412436969-4fca4d5c3a03?auto=format&fit=crop&w=100&q=80',
      description: 'Fresh organic cow milk.',
      price: '$1.5',
      type: 'Bean',
      ingredients: 'Africa',
    },
  ],
};







const HomeScreens = ({ navigation }) => {
 const [selectedCategory, setSelectedCategory] = useState('All');
const screenWidth = Dimensions.get('window').width;
const itemWidth = Math.floor((screenWidth - 16 * 3) / 2); // Padding + spacing
const itemHeight = 240;


const renderItem = ({ item }) => (
    <View style={[styles.card ,{ width: itemWidth, height: itemHeight }]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text>{item.description}</Text>
      <View style={styles.priceOrderContainer}>
  <Text style={styles.price}>{item.price}</Text>
  <TouchableOpacity 
  onPress={() => navigation.navigate('details', { product: item })}
  style={styles.button}
  >
    <Text style={{ color: 'black' }}>order</Text>
  </TouchableOpacity>
</View>
      
    </View>
  );

  
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

    {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.catagores,
              selectedCategory === cat && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}



    </View>
      
       <FlatList
        data={itemsByCategory[selectedCategory]}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        numColumns={2} 
        columnWrapperStyle={{ justifyContent: 'space-between' }}// ✅ this makes the grid 2 columns
       
      />
       
      
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
    flexDirection:'row',
    margin:10,
    justifyContent:'space-between'

  },
  catagores:{

  },
  
  imagewithicon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    backgroundColor: '#21262E',
  },
  headerText: {
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 32,
    marginTop: 20,
    marginHorizontal: 20,
    color: '#FFFFFF',
  },
  catgoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  catagores: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#333',
  },
  selectedCategory: {
    backgroundColor: 'orange',
  },
  categoryText: {
    color: 'white',
    fontSize: 15,
  },
  list: {
    margin:10
   
  },
  card: {
    
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  description: {
    color: '#ccc',
    marginTop: 4,
  },
  price: {
    color: 'orange',
    fontWeight: '600',
    marginTop: 6,
  },
  button:{
    width:50,
    height:30,
    backgroundColor:'orange',
    borderRadius:10,
    alignItems:"center"
  },
  priceOrderContainer:{
    flexDirection:'row',
    justifyContent:'space-between'
  }


})