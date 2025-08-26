import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

 const h=()=>{
   navigation.navigate('Tab', { screen: 'TabNavigators' });
 }
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
      <Text style={styles.title}>Login Screen</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />

      {/* ✅ Button used directly without TouchableOpacity */}
      <Button title="Login" onPress={h} />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
});
export default LoginScreen;