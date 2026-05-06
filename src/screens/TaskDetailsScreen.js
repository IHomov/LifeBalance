import React, {useContext} from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TaskDetailsScreen = ({ route, navigation }) => {
  const { itemId } = route.params; 
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
        <TouchableOpacity 
        style={styles.backBtn} 
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.backText, { color: theme.accent }]}>‹ Back</Text>
      </TouchableOpacity>
      <Text style={[styles.text, { color: theme.text }]}>Task Details Screen</Text>
      <Text style={[styles.itemId, { color: theme.text }]}>Displaying info for ID: {itemId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, fontWeight: 'bold' },
  paddingTop: 60,
});

export default TaskDetailsScreen;
