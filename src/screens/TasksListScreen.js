import React, { useEffect, useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext'; 
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
import { fetchBalanceTips } from '../services/api';

const TasksListScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Дістаємо тему з контексту
  const { isDark, theme, toggleTheme } = useContext(ThemeContext);

  const dates = [19, 20, 21, 22, 23, 24, 25];

  useEffect(() => {
    fetchBalanceTips()
      .then(result => {
        setData(result);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  const renderTask = ({ item }) => (
    <TaskListItem
      title={item.title}
      time="Flexible time"
      status={item.completed ? 'Complete' : 'To do'}
      // Можна передавати колір тексту з теми у компонент
      color={item.completed ? '#48BB78' : '#4299E1'}
      onPress={() => navigation.navigate(SCREENS.DETAILS, { itemId: item.id })}
    />
  );

  return (
    // 1. Динамічний фон контейнера
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      
      {/* Кнопка перемикання теми */}
      <TouchableOpacity
        style={[styles.themeBtn, { backgroundColor: theme.accent }]}
        onPress={toggleTheme}
      >
        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>
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
        {/* 2. Динамічний колір кнопки назад */}
        <Text style={[styles.backText, { color: theme.accent }]}>‹ Back</Text>
      </TouchableOpacity>

      {/* 3. Динамічний колір заголовка */}
      <Text style={[styles.headerTitle, { color: theme.text }]}>Today's Tasks</Text>

      <View style={styles.calendarContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {dates.map(date => (
            <TouchableOpacity
              key={date}
              // 4. Колір карток календаря
              style={[
                styles.dateCard, 
                { backgroundColor: isDark ? '#2D3748' : '#EDF2F7' },
                date === 25 && { backgroundColor: theme.accent }
              ]}
            >
              <Text style={[styles.dateText, { color: theme.text }, date === 25 && { color: '#FFF' }]}>
                {date}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.filters}>
        <Text style={[styles.filterBtn, styles.activeFilter, { color: theme.accent, borderBottomColor: theme.accent }]}>All</Text>
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
});

export default TasksListScreen;