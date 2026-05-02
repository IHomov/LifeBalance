import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TaskDetailsScreen = ({ route, navigation }) => {
  const { itemId } = route.params; // Отримуємо той самий ID, який ми передали

  return (
    <View style={styles.container}>
        <TouchableOpacity 
        style={styles.backBtn} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>‹ Back</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Task Details Screen</Text>
      <Text>Displaying info for ID: {itemId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, fontWeight: 'bold' },
  paddingTop: 60,
});

export default TaskDetailsScreen;
