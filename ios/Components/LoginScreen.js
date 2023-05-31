import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log('Attempting login...');
    try {
      const response = await axios.get(
        'https://gorest.co.in/public-api/users',
        {
          headers: {
            Authorization: `Bearer 31f3b906ec3d4b50b3ac2699290b9a6eaf56d611b25d5cb6ef5fb5d376faf362`,
          },
        }
      );
  
      // Handle succestesful login and navigate to profile screen
      navigation.naviga('Profile', {
        users: response.data.data,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to login. Please try again.');
    }
  };

  return (
    <View>
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <Text>Password:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
