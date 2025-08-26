import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme/theme';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handlogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      const response = await axios.post(
        'https://backend-rendered-1.onrender.com/api/users/login',
        { email, password }
      );

      console.log('Login Success:', response.data);

      // Save data locally
      await AsyncStorage.multiSet([
        ['token', response.data.token],
        ['userId', response.data.user.id],
        ['role', response.data.user.role],
      ]);

      Alert.alert('Success', response.data.message || 'Login successful');

      // Navigate to your tab screen
      navigation.navigate('Tab', { screen: 'TabNavigators' });

    } catch (error) {
      console.error('Login Error:', error);
      if (error.response?.data?.message) {
        Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert('Error', 'Login failed. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../assets/app_images/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Login Screen</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          autoCapitalize="none"
          placeholderTextColor={'orange'}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          placeholderTextColor={'orange'}
          secureTextEntry
        />
      </View>
    
      <View style={styles.checkoutButton}>
        <TouchableOpacity onPress={handlogin}>
          <Text style={styles.checkoutText}>Login</Text>
        </TouchableOpacity>
      </View> 
      
      {/* Add a register navigation option */}
      <TouchableOpacity 
        style={styles.registerLink}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.registerText}>
          Don't have an account? Register here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: COLORS.primaryBlackHex,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain", 
    marginBottom: 40,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
    color: 'orange'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    color: 'white',
  },
  checkoutButton: {
    backgroundColor: COLORS.primaryOrangeHex,
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  checkoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    color: 'orange',
    fontSize: 14,
  }
});

export default LoginScreen;