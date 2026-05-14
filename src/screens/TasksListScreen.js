import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setTasks,
  removeItem,
  toggleTaskStatus,
} from '../redux/slices/tasksSlice';
import { ThemeContext } from '../context/ThemeContext';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { COLORS } from '../constants/colors';
import TaskListItem from '../components/TaskListItem';
import { SCREENS } from '../constants/screens';
import { fetchBalanceTips } from '../services/api';
import dayjs from 'dayjs';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TasksListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.items);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isDark, theme, toggleTheme } = useContext(ThemeContext);

const dates = [
  dayjs().subtract(3, 'day').date(),
  dayjs().subtract(2, 'day').date(),
  dayjs().subtract(1, 'day').date(),
  dayjs().date(), 
  dayjs().add(1, 'day').date(),
  dayjs().add(2, 'day').date(),
  dayjs().add(3, 'day').date(),
];

  useEffect(() => {
    fetchBalanceTips()
      .then(result => {
        dispatch(setTasks(result));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, [dispatch]);


  const handleToggleStatus = useCallback((id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    dispatch(toggleTaskStatus(id));
  }, [dispatch]);

  const handleDeleteTask = useCallback((id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    dispatch(removeItem(id));
  }, [dispatch]);

  const handleLongPressTask = useCallback((id) => {
    navigation.navigate(SCREENS.DETAILS, { itemId: id });
  }, [navigation]);

  // Оптимізація: renderTask тепер обгорнутий у useCallback
  const renderTask = useCallback(({ item }) => (
    <View style={styles.taskRow}>
      <View style={styles.taskItemContainer}>
        <TaskListItem
          title={item.title}
          time="Flexible time"
          status={item.completed ? 'Complete' : 'To do'}
          color={item.completed ? COLORS.success : COLORS.inProgress}
          onPress={() => handleToggleStatus(item.id)}
          onLongPress={() => handleLongPressTask(item.id)}
        />
      </View>

      <TouchableOpacity 
        onPress={() => handleDeleteTask(item.id)} 
        style={styles.deleteButton}
      >
        <Text style={styles.deleteIcon}>🗑️</Text>
      </TouchableOpacity>
    </View>
  ), [handleToggleStatus, handleLongPressTask, handleDeleteTask]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity
        style={[styles.themeBtn, { backgroundColor: theme.accent }]}
        onPress={toggleTheme}
      >
        <Text style={[styles.themeBtnText, { color: theme.text }]}>
          {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() =>
          navigation.canGoBack()
            ? navigation.goBack()
            : navigation.navigate(SCREENS.HOME)
        }
      >
        <Text style={[styles.backText, { color: theme.accent }]}>‹ Back</Text>
      </TouchableOpacity>

      <Text style={[styles.headerTitle, { color: theme.text }]}>
        Today's Tasks
      </Text>

      <View style={styles.calendarContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {dates.map(date => (
            <TouchableOpacity
              key={date}
              style={[
                styles.dateCard,
                { backgroundColor: isDark ? COLORS.darkThema : COLORS.lightThema },
                date === 25 && { backgroundColor: theme.accent },
              ]}
            >
              <Text
                style={[
                  styles.dateText,
                  { color: theme.text },
                  date === 25 && { color: COLORS.white },
                ]}
              >
                {date}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.filters}>
        <Text style={[styles.filterBtn, styles.activeFilter, { color: theme.accent, borderBottomColor: theme.accent }]}>
          All
        </Text>
        <Text style={styles.filterBtn}>To do</Text>
        <Text style={styles.filterBtn}>In Progress</Text>
        <Text style={styles.filterBtn}>Complete</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={theme.accent} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
          initialNumToRender={10}
          windowSize={5} // Оптимізація пам'яті
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  themeBtn: {
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  backBtn: {
    position: 'absolute',
    left: 10,
    top: 65,
    zIndex: 1,
    padding: 10,
  },
  backText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  calendarContainer: {
    height: 70,
    marginBottom: 20,
  },
  dateCard: {
    width: 45,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 15,
  },
  dateText: { fontWeight: '600' },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  filterBtn: { color: '#A0AEC0', fontSize: 13, fontWeight: '500' },
  activeFilter: {
    borderBottomWidth: 2,
  },
  errorText: { color: 'red', textAlign: 'center', marginTop: 20 },
  flatListContainer: {
    paddingBottom: 40,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  taskItemContainer: {
    flex: 1,
  },
  deleteButton: {
    width: 45,
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#FED7D7',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteIcon: {
    fontSize: 18,
  },
});

export default TasksListScreen;