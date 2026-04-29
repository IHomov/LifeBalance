import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../constants/colors';
import FormItem from '../components/FormItem';
import { SCREENS } from '../constants/screens';      

const AddTaskScreen = ({ navigation }) => {
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

      <ScrollView contentContainerStyle={styles.form}>
        <FormItem label="Task Group" value="Work" />
        <FormItem label="Task Name" value="Prepare weekly report" />

        <FormItem
          label="Description"
          value="Analyze last week's sales, create visual charts, and send the final PDF to the manager."
          isMultiline={true}
        />

        <View style={styles.dateRow}>
          <View style={styles.dateInputContainer}>
            <FormItem label="Start Date" value="01 May, 2026" />
          </View>
          <View style={styles.dateInputWrapper}>
            <FormItem label="End Date" value="05 May, 2026" />
          </View>
        </View>

        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save Task</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
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
