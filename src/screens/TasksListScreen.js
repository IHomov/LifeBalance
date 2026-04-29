import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../constants/colors';
import TaskListItem from '../components/TaskListItem';

const TasksListScreen = ({ navigation }) => {
  const dates = [19, 20, 21, 22, 23, 24, 25];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            navigation.navigate('Home');
          }
        }}
      >
        <Text style={styles.backText}>‹ Back</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Today's Tasks</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.calendar}
      >
        {dates.map(date => (
          <TouchableOpacity
            key={date}
            style={[styles.dateCard, date === 25 && styles.activeDateCard]}
          >
            <Text
              style={[styles.dateText, date === 25 && styles.activeDateText]}
            >
              {date}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Фільтри */}
      <View style={styles.filters}>
        <Text style={[styles.filterBtn, styles.activeFilter]}>All</Text>
        <Text style={styles.filterBtn}>To do</Text>
        <Text style={styles.filterBtn}>In Progress</Text>
        <Text style={styles.filterBtn}>Complete</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <TaskListItem
          title="Work Project"
          time="10:00 AM"
          status="done"
          color="#48BB78"
        />
        <TaskListItem
          title="UX Design Course"
          time="04:00 PM"
          status="In Progress"
          color="#F6AD55"
        />
        <TaskListItem
          title="Family & Kids"
          time="09:00 PM"
          status="todo"
          color="#4299E1"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
    paddingTop: 60,
  },
    headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textMain,
    textAlign: 'center',
    marginBottom: 30,
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
  calendar: { flexDirection: 'row', marginBottom: 30, maxHeight: 60 },
  dateCard: {
    width: 45,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 15,
    backgroundColor: '#EDF2F7',
  },
  activeDateCard: { backgroundColor: COLORS.primary },
  dateText: { color: COLORS.textMain, fontWeight: '600' },
  activeDateText: { color: COLORS.white },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  filterBtn: { color: '#A0AEC0', fontSize: 13, fontWeight: '500' },
  activeFilter: {
    color: COLORS.primary,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
});

export default TasksListScreen;
