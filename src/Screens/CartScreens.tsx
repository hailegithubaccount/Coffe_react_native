import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useCart } from '../Context/CartContext'; // Adjust the path as needed
import { COLORS } from '../theme/theme';

const CartScreens = ({ navigation }) => {
  const { cartItems, removeFromCart, clearCart } = useCart();


  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => sum + parseFloat(item.totalPrice), 0);

  const renderCartItem = ({ item, index }) => (
    <View style={styles.cartItem}>
      <Image
        source={{ uri: item.product.image }}
        style={styles.itemImage}
      />

      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>
          {item.product.name}
        </Text>

        <Text style={styles.itemText}>
          Size: {item.selectedSize.label}
        </Text>

        <Text style={styles.itemText}>
          Quantity: {item.quantity}
        </Text>

        <Text style={styles.itemPrice}>
          Total: ${item.totalPrice}
        </Text>
      </View>
      
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => removeFromCart(index)}
      >
        <Icon name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={34} color="orange" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cart</Text>
        <Image
          source={require("../assets/app_images/avatar.png")}
          style={styles.avatar}
        />
      </View>

      {/* Cart Items */}
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
          
          {/* Checkout Section */}
          <View style={styles.checkoutContainer}>
            
            <View style={styles.totalContainer}>

              <Text style={styles.totalText}>Total:price</Text>
              <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
            </View>
            
            
            <TouchableOpacity 
              style={styles.checkoutButton}
            onPress={() => {navigation.navigate('payment',{totalPrice})}}
            
            >
              <Text style={styles.checkoutText}>Pay</Text>
            </TouchableOpacity>
          
          
         
         
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="remove-shopping-cart" size={80} color="#555" />
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <Text style={styles.emptySubtext}>Add some items to get started</Text>
          <TouchableOpacity 
            style={styles.shopButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.shopButtonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

// ... keep your styles the same

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 100, // Space for checkout section
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(47, 39, 39, 0.9)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemText: {
    color: 'orange',
    fontSize: 14,
    marginBottom: 3,
  },
  itemPrice: {
    color: 'orange',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  removeButton: {
    padding: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtext: {
    color: '#999',
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  shopButton: {
    backgroundColor: 'orange',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
  },
  shopButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkoutContainer: {
    flexDirection:'row',
    marginBottom:100,
    justifyContent:'space-between'
    
   
   
   
  },
  totalContainer: {
    
   
    alignItems: 'center',
    marginBottom: 15,
  },
  totalText: {
    color: 'white',
    fontSize: 15,
    marginTop:20
   
  },
  totalPrice: {
    color: 'orange',
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: COLORS.primaryOrangeHex,
    width:250,
    margin:2,
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center',
    
    


  },
  checkoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreens;