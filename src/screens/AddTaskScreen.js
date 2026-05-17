import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { COLORS } from '../constants/colors';
import FormItem from '../components/FormItem';
import { SCREENS } from '../constants/screens';
import { useApp } from '../context/AppContext';

const AddTaskScreen = ({ navigation }) => {
  const { addTask } = useApp();

  const [groupName, setGroupName] = useState('Work');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // 1. Initialize dates immediately as text strings
  const [startDate, setStartDate] = useState('16 May, 2026');
  const [endDate, setEndDate] = useState('20 May, 2026');

  const showGroupPicker = () => {
    Alert.alert(
      'Select Task Group',
      'Choose a category for this task:',
      [
        { text: '💼 Work', onPress: () => setGroupName('Work') },
        { text: '📚 Study', onPress: () => setGroupName('Study') },
        { text: '👶 Kids', onPress: () => setGroupName('Kids') },
        { text: '🏠 Home', onPress: () => setGroupName('Home') },
      ],
      { cancelable: true },
    );
  };

  const showStartDatePicker = () => {
    Alert.alert('Select Start Date', 'Quick select:', [
      { text: 'Today (16 May)', onPress: () => setStartDate('16 May, 2026') },
      {
        text: 'Tomorrow (17 May)',
        onPress: () => setStartDate('17 May, 2026'),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const showEndDatePicker = () => {
    Alert.alert('Select End Date', 'Quick select:', [
      { text: 'In 3 Days', onPress: () => setEndDate('19 May, 2026') },
      { text: 'In a Week', onPress: () => setEndDate('23 May, 2026') },
      { text: 'End of Month', onPress: () => setEndDate('31 May, 2026') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleSaveTask = () => {
    if (!title.trim()) {
      Alert.alert('Помилка', 'Будь ласка, введіть назву завдання');
      return;
    }
    const newTask = {
      title: title,
      subTitle: description || 'No description',
      groupName: groupName,
      progress: 10,
      isCompleted: false,
    };

    addTask(newTask);
    Alert.alert('Success', 'Task added successfully!', [
      {
        text: 'OK',
        onPress: () => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            navigation.navigate(SCREENS.HOME);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate(SCREENS.HOME);
            }
          }}
        >
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Task Details</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.form}
        showsVerticalScrollIndicator={false}
      >
        {/* Група (Кнопка) */}
        <FormItem
          label="Task Group"
          value={groupName}
          onPress={showGroupPicker}
        />

        <FormItem
          label="Task Name"
          value={title}
          onChangeText={setTitle}
          placeholder="Enter task name..."
          isInput={true}
        />

        <FormItem
          label="Description"
          value={description}
          onChangeText={setDescription}
          isMultiline={true}
          placeholder="Enter task description..."
          isInput={true}
        />

        <View style={styles.dateRow}>
          <View style={styles.dateInputContainer}>
            <FormItem
              label="Start Date"
              value={startDate}
              onPress={showStartDatePicker}
            />
          </View>
          <View style={styles.dateInputWrapper}>
            <FormItem
              label="End Date"
              value={endDate}
              onPress={showEndDatePicker}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSaveTask}>
          <Text style={styles.saveBtnText}>Save Task</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: 'center',
    position: 'relative',
  },
  backBtn: {
    position: 'absolute',
    left: 10,
    top: 55,
    zIndex: 1,
    padding: 10,
  },
  backText: {
    fontSize: 15,
    color: COLORS.primary,
    lineHeight: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textMain,
    textAlign: 'center',
  },
  form: { padding: 20 },
  dateRow: { flexDirection: 'row' },
  saveBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 30,
  },
  saveBtnText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
  dateInputContainer: {
    flex: 1,
    marginRight: 10,
  },
  dateInputWrapper: {
    flex: 1,
  },
});

export default AddTaskScreen;
