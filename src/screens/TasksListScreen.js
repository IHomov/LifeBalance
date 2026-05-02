import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { COLORS } from '../constants/colors';
import TaskListItem from '../components/TaskListItem';
import { SCREENS } from '../constants/screens';
import { fetchData } from '../services/api';

const TasksListScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dates = [19, 20, 21, 22, 23, 24, 25];
  useEffect(() => {
    fetchData()
      .then(result => {
        setData(result);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);
  const renderTask = ({ item }) => (
    <TaskListItem
      title={item.title}
      time="Flexible time"
      status={item.completed ? 'Complete' : 'To do'}
      color={item.completed ? '#48BB78' : '#4299E1'}
      onPress={() => navigation.navigate(SCREENS.DETAILS, { itemId: item.id })}
    />
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() =>
          navigation.canGoBack()
            ? navigation.goBack()
            : navigation.navigate(SCREENS.HOME)
        }
      >
        <Text style={styles.backText}>‹ Back</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Today's Tasks</Text>

      <View style={styles.calendarContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          style={styles.calendar}
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
      </View>

      {/* Фільтри */}
      <View style={styles.filters}>
        <Text style={[styles.filterBtn, styles.activeFilter]}>All</Text>
        <Text style={styles.filterBtn}>To do</Text>
        <Text style={styles.filterBtn}>In Progress</Text>
        <Text style={styles.filterBtn}>Complete</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={renderTask}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 20,
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
  errorText: { color: 'red', textAlign: 'center', marginTop: 20 },
  flatListContainer: {
    paddingBottom: 40,
  },
  calendarContainer: {
    maxHeight: 60,
  },
});

export default TasksListScreen;
