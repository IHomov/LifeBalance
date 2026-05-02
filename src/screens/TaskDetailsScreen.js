import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TaskDetailsScreen = ({ route }) => {
  const { itemId } = route.params; // Отримуємо той самий ID, який ми передали

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Task Details Screen</Text>
      <Text>Displaying info for ID: {itemId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, fontWeight: 'bold' },
});

export default TaskDetailsScreen;
