import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';
import FormItem from '../components/FormItem';

const AddTaskScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn}>
          <Text style={styles.backIcon}>‹</Text>
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
          <View style={{ flex: 1, marginRight: 10 }}>
            <FormItem label="Start Date" value="01 May, 2026" />
          </View>
          <View style={{ flex: 1 }}>
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
    paddingBottom: 20 
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  backIcon: { fontSize: 35, color: COLORS.primary },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.textMain, marginLeft: 20 },
  form: { padding: 20 },
  dateRow: { flexDirection: 'row' },
  saveBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 30,
  },
  saveBtnText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' }
});

export default AddTaskScreen;