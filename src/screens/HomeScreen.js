import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../constants/colors';
import TaskCard from '../components/TaskCard';
import { SCREENS } from '../constants/screens';
import GroupCard from '../components/GroupCard';
import { useApp } from '../context/AppContext';

const HomeScreen = ({ navigation }) => {
  const { tasks } = useApp();

  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/quotes/random')
      .then(res => res.json())
      .then(data => {
        setQuote(data.quote);
        setAuthor(data.author);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching quote:', err);
        setQuote('Make today amazing!');
        setAuthor('LifeBalance');
        setIsLoading(false);
      });
  }, []);

const getGroupData = (groupName) => {
  const groupTasks = tasks.filter(t => t.groupName === groupName);
  const taskCount = groupTasks.length;
  
  // Рахуємо середній прогрес по групі
  const totalProgress = groupTasks.reduce((sum, t) => sum + t.progress, 0);
  const progress = taskCount > 0 ? Math.round(totalProgress / taskCount) : 0;

  return { taskCount, progress };
};

  const totalDayProgress =
    tasks.length > 0
      ? Math.round(
          tasks.reduce((sum, task) => sum + task.progress, 0) / tasks.length,
        )
      : 0;

  const inProgressTasks = tasks.filter(
    task => task.progress > 0 && task.progress < 100,
  );

  const workData = getGroupData('Work');
  const studyData = getGroupData('Study');
  const kidsData = getGroupData('Kids');
  const homeData = getGroupData('Home');

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />

      {/* Шапка з градієнтом */}
      <LinearGradient
        colors={[COLORS.primary, '#417DFF']}
        style={styles.headerBackground}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greetingTitle}>Hello, Iris</Text>
            <Text style={styles.greetingSubTitle}>Have a nice day!</Text>
          </View>
          <View style={styles.avatarPlaceholder} />
        </View>

        {/* Промо-картка прогресу */}
        <View style={styles.promoCard}>
          <View style={styles.promoTextContainer}>
            <Text style={styles.promoTitle}>Today's Progress</Text>
            <Text style={styles.promoSubTitle}>
              You have completed {totalDayProgress}% of your tasks
            </Text>
            <TouchableOpacity
              style={styles.viewBtn}
              onPress={() => navigation.navigate(SCREENS.TASKS)}
            >
              <Text style={styles.viewBtnText}>View Task</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.percentContainer}>
            <Text style={styles.promoPercent}>{totalDayProgress}%</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Основний скрол-контент */}
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
       <View style={styles.quoteCard}>
          <Text style={styles.quoteTitle}>Daily Motivation 💡</Text>
          {isLoading ? (
            <ActivityIndicator color={COLORS.primary} style={styles.loadingIndicator} />
          ) : (
            <View>
              <Text style={styles.quoteText}>"{quote}"</Text>
              <Text style={styles.quoteAuthor}>— {author}</Text>
            </View>
          )}
        </View>

        {/* Секція In Progress */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>In progress</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

{inProgressTasks.length > 0 ? (
          inProgressTasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              subTitle={task.subTitle}
              progress={task.progress}
              color={
                task.groupName === 'Work' ? COLORS.primary : 
                task.groupName === 'Study' ? COLORS.secondary : 
                task.groupName === 'Kids' ? COLORS.tertiary : COLORS.quaternary
              }
              onPress={() => navigation.navigate(SCREENS.TASKS)}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>No tasks in progress right now.</Text>
        )}

        {/* Секція Task Groups (ТЕПЕР ДИНАМІЧНА 🚀) */}
        <Text style={styles.sectionTitle}>Task Groups</Text>

        <View style={styles.groupsGrid}>
          <GroupCard
            title="Work"
            taskCount={workData.taskCount}
            icon="briefcase"
            color={COLORS.primary}
            progress={workData.progress}
            onPress={() => navigation.navigate('Tasks', { filter: 'Work' })}
          />
          <GroupCard
            title="Study"
            taskCount={studyData.taskCount}
            icon="book-open"
            color={COLORS.secondary}
            progress={studyData.progress}
            onPress={() => navigation.navigate('Tasks', { filter: 'Study' })}
          />
          <GroupCard
            title="Kids"
            taskCount={kidsData.taskCount}
            icon="heart"
            color={COLORS.tertiary}
            progress={kidsData.progress}
            onPress={() => navigation.navigate('Tasks', { filter: 'Kids' })}
          />
          <GroupCard
            title="Home"
            taskCount={homeData.taskCount}
            icon="home"
            color={COLORS.quaternary}
            progress={homeData.progress}
            onPress={() => navigation.navigate('Tasks', { filter: 'Home' })}
          />
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerBackground: {
    height: 300,
    paddingTop: 60,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  greetingTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  greetingSubTitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  promoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  promoTextContainer: { flex: 1 },
  promoTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  promoSubTitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
    marginVertical: 8,
  },
  viewBtn: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
  },
  viewBtnText: { color: COLORS.primary, fontWeight: 'bold', fontSize: 12 },
  percentContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoPercent: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  contentContainer: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1C24',
    marginVertical: 20,
  },
  seeAll: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  groupsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  bottomSpacer: {
    height: 100,
  },
});

export default HomeScreen;
