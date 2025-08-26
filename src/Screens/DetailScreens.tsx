import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import { COLORS } from '../theme/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const way = {
  Wallet: [
    { id: 1, name: 'Wallet', image: require('../assets/app_images/avatar.png') },
  ],
  GooglePay: [
    { id: 2, name: 'Google Pay', image: require('../assets/app_images/gpay.png') },
  ],
  ApplePay: [
    { id: 3, name: 'Apple Pay', image: require('../assets/app_images/applepay.png') },
  ],
  AmazonPay: [
    { id: 4, name: 'Amazon Pay', image: require('../assets/app_images/amazonpay.png') },
  ],
};

// Gradient mapping
const categoryGradients = {
  "Wallet": ['#FF6B6B', '#FF8E53'],
  "GooglePay": ['#4FACFE', '#00F2FE'],
  "ApplePay": ['#A8FF78', '#78FFD6'],
  "AmazonPay": ['#9D50BB', '#6E48AA']
};

const DetailScreens = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient 
      colors={['#0C0C0C', '#1A1A1A']} 
      style={styles.DetailContainer}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
    >
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={35} color={'white'} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Payment</Text>
      </View>

      {/* ATM Image */}
      <Image
        source={require("../assets/app_images/atm.png")}
        style={styles.atmImage}
      />

      {/* Payment Options */}
      <View style={styles.paymentContainer}>
       
        
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.box}>
            {Object.entries(way).map(([cat, items]) => (
              <View key={cat} style={styles.categoryContainer}>
                {/* Items */}
                {items.map((item) => (
                  <LinearGradient
                    key={item.id}
                    colors={['#393636ff', '#393838ff']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientItem}
                  >
                    <View style={styles.itemContent}>
                      <Image source={item.image} style={styles.itemImage} />
                      <Text style={styles.itemText}>{item.name}</Text>
                    </View>
                  </LinearGradient>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

export default DetailScreens;

const styles = StyleSheet.create({
  DetailContainer: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row', 
    marginTop: 50,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: 'white', 
    fontSize: 20, 
    marginLeft: 100, 
    fontWeight: 'bold'
  },
  atmImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginVertical: 1,
  },
  paymentContainer: {
    flex: 1,
    marginTop: 10,
  },
  paymentHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
 
  categoryContainer: {
    marginBottom: 2,
  
  },
  gradientItem: {
    borderRadius: 50,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius:500
  },
  itemImage: {
    width: 30,
    height: 30,
    marginRight: 15,
    borderRadius: 5,
  },
  itemText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});