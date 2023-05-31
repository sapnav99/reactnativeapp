import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const ProfileScreen = ({ route }) => {
  const { users } = route.params;
  const [userList, setUserList] = useState(users);

  const handleUpdateUser = async (userId) => {
    try {
      const response = await axios.put(
        `https://gorest.co.in/public-api/users/${userId}`,
        {
          name: 'Updated Name',
          // Add other fields to update if required
        },
        {
          headers: {
            Authorization: `Bearer 31f3b906ec3d4b50b3ac2699290b9a6eaf56d611b25d5cb6ef5fb5d376faf362`,
          },
        }
      );

      if (response.data.code === 200) {
        const updatedUser = response.data.data;

        // Update the user in the user list
        const updatedList = userList.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
        setUserList(updatedList);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update user. Please try again.');
    }
  };

  return (
    <View>
      <Text>User Profile Icon</Text>
      {userList.map((user) => (
        <View key={user.id}>
          <Text>{user.name}</Text>
          <TouchableOpacity onPress={() => handleUpdateUser(user.id)}>
            <Text>Update</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default ProfileScreen;
