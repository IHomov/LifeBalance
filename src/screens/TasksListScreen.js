import React, { useEffect, useState, useContext, useCallback } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { COLORS } from '../constants/colors';
import TaskListItem from '../components/TaskListItem';
import { SCREENS } from '../constants/screens';
import { fetchBalanceTips } from '../services/api';
import dayjs from 'dayjs';
import { useApp } from '../context/AppContext';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TasksListScreen = ({ route, navigation }) => {
  const { groupName } = route.params || {};
  const { tasks, deleteTask, toggleTaskComplete } = useApp();
  const { isDark, theme, toggleTheme } = useContext(ThemeContext);
  const [apiTip, setApiTip] = useState('');

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
    let isMounted = true;

    fetchBalanceTips()
      .then(result => {
        if (isMounted && result && result.title) {
          setApiTip(result.title);
        }
      })
      .catch(err => {
        console.error('API Error:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredTasks = tasks.filter(task => {
    if (groupName) {
      return task.groupName === groupName;
    }
    return true;
  });

  const handleToggleStatus = useCallback(
    id => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      toggleTaskComplete(id);
    },
    [toggleTaskComplete],
  );

  const handleDeleteTask = useCallback(
    id => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      deleteTask(id);
    },
    [deleteTask],
  );

  const handleLongPressTask = useCallback(
    id => {
      navigation.navigate(SCREENS.DETAILS, { itemId: id });
    },
    [navigation],
  );

  const renderTask = useCallback(
    ({ item }) => (
      <View style={styles.taskRow}>
        <View style={styles.taskItemContainer}>
          <TaskListItem
            title={item.title}
            time={item.groupName || 'Flexible time'}
            status={item.isCompleted ? 'Complete' : 'To do'}
            color={item.isCompleted ? COLORS.success : COLORS.inProgress}
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
    ),
    [handleToggleStatus, handleLongPressTask, handleDeleteTask],
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Theme Toggle Button */}
      <TouchableOpacity
        style={[styles.themeBtn, { backgroundColor: theme.accent }]}
        onPress={toggleTheme}
      >
        <Text style={[styles.themeBtnText, { color: theme.text }]}>
          {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </Text>
      </TouchableOpacity>

      {/* Back Button */}
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
        {groupName ? `${groupName}'s Tasks` : "Today's Tasks"}
      </Text>

      {/* responsive quote banner*/}
      {apiTip ? (
        <View
          style={[
            styles.tipContainer,
            {
              backgroundColor: isDark ? COLORS.darkThema : COLORS.lightThema,
              borderLeftColor: theme.accent,
            },
          ]}
        >
          <Text
            style={[
              styles.tipTitle,
              { color: isDark ? COLORS.accent : COLORS.primaryDark },
            ]}
          >
            💡 Balance Tip of the Day:
          </Text>
          <Text style={[styles.tipText, { color: theme.text }]}>
            "{apiTip}"
          </Text>
        </View>
      ) : null}

      <View style={styles.calendarContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {dates.map(date => {
            const isToday = date === dayjs().date();
            return (
              <TouchableOpacity
                key={date}
                style={[
                  styles.dateCard,
                  {
                    backgroundColor: isDark
                      ? COLORS.darkThema
                      : COLORS.lightThema,
                  },
                  isToday && { backgroundColor: theme.accent },
                ]}
              >
                <Text
                  style={[
                    styles.dateText,
                    { color: theme.text },
                    isToday && { color: COLORS.white },
                  ]}
                >
                  {date}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/*Fixing filters */}
      <View style={styles.filters}>
        <Text
          style={[
            styles.filterBtn,
            styles.activeFilter,
            { color: theme.accent, borderBottomColor: theme.accent },
          ]}
        >
          All
        </Text>
        <Text style={styles.filterBtn}>To do</Text>
        <Text style={styles.filterBtn}>In Progress</Text>
        <Text style={styles.filterBtn}>Complete</Text>
      </View>

      {/* Список завдань */}
      <FlatList
        data={filteredTasks}
        renderItem={renderTask}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        initialNumToRender={10}
        windowSize={5}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No tasks found in this category. 🎉
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 60 },
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
  backBtn: { position: 'absolute', left: 10, top: 65, zIndex: 1, padding: 10 },
  backText: { fontSize: 18, fontWeight: 'bold' },
  calendarContainer: { height: 70, marginBottom: 20 },
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
  activeFilter: { borderBottomWidth: 2 },
  flatListContainer: { paddingBottom: 40 },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  taskItemContainer: { flex: 1 },
  deleteButton: {
    width: 45,
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#FED7D7',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: { fontSize: 18 },
  emptyText: {
    textAlign: 'center',
    color: '#A0AEC0',
    marginTop: 50,
    fontSize: 16,
  },

  tipContainer: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
  },
  tipTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 18,
  },
});

export default TasksListScreen;
