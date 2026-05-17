import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { SCREENS } from '../constants/screens';
import { useApp } from '../context/AppContext';


const InProgressCard = ({ title, subTitle, progress, color }) => (
  <View style={[styles.inProgressCard, { borderLeftColor: color }]}>
    <View style={styles.cardInfo}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubTitle}>{subTitle}</Text>
    </View>
    <Text style={[styles.cardProgressText, { color: color }]}>{progress}%</Text>
  </View>
);

// Task Groups Card Component (Task Groups)
const GroupCard = ({ title, taskCount, progress, icon, color, bgColor, onPress }) => {
  return (
    <TouchableOpacity 
      style={[styles.groupCard, { backgroundColor: bgColor }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.groupHeader}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          <Text style={styles.groupIcon}>{icon}</Text>
        </View>
        <Text style={[styles.groupProgressText, { color: color }]}>{progress}%</Text>
      </View>
      <Text style={styles.groupTitle}>{title}</Text>
      <Text style={styles.groupSubTitle}>{taskCount} Tasks</Text>
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: `${progress}%`, backgroundColor: color }]} />
      </View>
    </TouchableOpacity>
  );
};

const HomeScreen = ({ navigation }) => {
  const { tasks } = useApp();


  const getGroupStats = (groupName) => {
    const groupTasks = tasks.filter(task => task.groupName === groupName);
    const taskCount = groupTasks.length;

    if (taskCount === 0) {
      return { taskCount: 0, progress: 0 };
    }

    const totalProgress = groupTasks.reduce((sum, task) => sum + task.progress, 0);
    const averageProgress = Math.round(totalProgress / taskCount);

    return { taskCount, progress: averageProgress };
  };


  const workStats = getGroupStats('Work');
  const studyStats = getGroupStats('Study');
  const kidsStats = getGroupStats('Kids');
  const homeStats = getGroupStats('Home');

 
  const totalProgressDay = useMemo(() => {
    if (tasks.length === 0) return 0;
    const total = tasks.reduce((sum, task) => sum + task.progress, 0);
    return Math.round(total / tasks.length);
  }, [tasks]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Blue Header Section */}
      <View style={styles.blueHeader}>
        <View style={styles.userInfoRow}>
          <View>
            <Text style={styles.greetingText}>Hello, Iris</Text>
            <Text style={styles.subGreetingText}>Have a nice day!</Text>
          </View>
          <View style={styles.avatarPlaceholder} />
        </View>

        {/* Progress Block */}
        <View style={styles.progressBlock}>
          <View style={styles.progressBlockInfo}>
            <Text style={styles.progressBlockTitle}>Today's Progress</Text>
            <Text style={styles.progressBlockSub}>
              You have completed {totalProgressDay}% of your tasks
            </Text>
            <TouchableOpacity 
              style={styles.viewTaskBtn}
              onPress={() => navigation.navigate(SCREENS.TASKS)}
            >
              <Text style={styles.viewTaskBtnText}>View Task</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.circleProgressContainer}>
            <View style={styles.circleProgress}>
              <Text style={styles.circleProgressText}>{totalProgressDay}%</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* In Progress Section */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>In progress</Text>
          <TouchableOpacity onPress={() => navigation.navigate(SCREENS.TASKS)}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

      
        {tasks.filter(t => t.progress < 100).slice(0, 2).map((task) => {
          const colorsMap = { Work: COLORS.primary, Study: COLORS.secondary, Kids: COLORS.tertiary, Home: COLORS.quaternary };
          return (
            <InProgressCard
              key={task.id}
              title={task.title}
              subTitle={task.subTitle}
              progress={task.progress}
              color={colorsMap[task.groupName] || COLORS.primary}
            />
          );
        })}

        {tasks.filter(t => t.progress < 100).length === 0 && (
          <Text style={styles.noTasksText}>No tasks in progress. Enjoy your day! 🎉</Text>
        )}

        {/* Task Groups Section */}
        <Text style={[styles.sectionTitle, styles.sectionTitleSpacing]}>Task Groups</Text>
        
        <View style={styles.gridContainer}>
  <GroupCard
    title="Work"
    taskCount={workStats.taskCount}
    progress={workStats.progress}
    icon="💼"
    color={COLORS.primary}
    bgColor={COLORS.background}
    onPress={() => navigation.navigate('Tasks', { groupName: 'Work' })} 
  />
  <GroupCard
    title="Study"
    taskCount={studyStats.taskCount}
    progress={studyStats.progress}
    icon="📚"
    color= {COLORS.secondary}
    bgColor={COLORS.secondaryBg}
    onPress={() => navigation.navigate('Tasks', { groupName: 'Study' })}
  />
  <GroupCard
    title="Kids"
    taskCount={kidsStats.taskCount}
    progress={kidsStats.progress}
    icon="👶"
    color={COLORS.tertiary}
    bgColor={COLORS.tertiaryBg}
    onPress={() => navigation.navigate('Tasks', { groupName: 'Kids' })}
  />
  <GroupCard
    title="Home"
    taskCount={homeStats.taskCount}
    progress={homeStats.progress}
    icon="🏠"
    color={COLORS.quaternary}
    bgColor={COLORS.quaternaryBg}
    onPress={() => navigation.navigate('Tasks', { groupName: 'Home' })}
  />
</View>
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity 
        style={styles.floatingAddBtn}
        onPress={() => navigation.navigate(SCREENS.ADD_TASK)}
      >
        <Text style={styles.floatingAddBtnText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  blueHeader: {
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 25,
  },
  userInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  greetingText: { color:COLORS.white, fontSize: 26, fontWeight: 'bold' },
  subGreetingText: { color: COLORS.white, fontSize: 14, marginTop: 4 },
  avatarPlaceholder: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: 'rgba(255,255,255,0.4)' },
  progressBlock: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBlockInfo: { flex: 1, marginRight: 10 },
  progressBlockTitle: { color: COLORS.white, fontSize: 18, fontWeight: 'bold' },
  progressBlockSub: { color: COLORS.white, fontSize: 12, marginVertical: 8, lineHeight: 16 },
  viewTaskBtn: { backgroundColor: COLORS.white, alignSelf: 'flex-start', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10 },
  viewTaskBtnText: { color: COLORS.primary, fontSize: 13, fontWeight: 'bold' },
  circleProgressContainer: { justifyContent: 'center', alignItems: 'center' },
  circleProgress: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    borderWidth: 6,
    borderColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  circleProgressText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
  contentContainer: { paddingHorizontal: 20, paddingBottom: 100 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 25, marginBottom: 15 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.textMain },
  sectionTitleSpacing: { marginTop: 25, marginBottom: 15 },
  seeAllText: { color: COLORS.placeholder, fontSize: 14 },
  inProgressCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderLeftWidth: 5,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.inputText },
  cardSubTitle: { fontSize: 13, color: COLORS.placeholder, marginTop: 4 },
  cardProgressText: { fontSize: 15, fontWeight: 'bold' },
  noTasksText: { textAlign: 'center', color: COLORS.placeholder, marginVertical: 15, fontSize: 14 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  groupCard: {
    width: '48%',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 5,
    elevation: 1,
  },
  groupHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  iconContainer: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  groupIcon: { fontSize: 18 },
  groupProgressText: { fontSize: 13, fontWeight: 'bold' },
  groupTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.inputText },
  groupSubTitle: { fontSize: 12, color: COLORS.placeholder, marginTop: 4, marginBottom: 12 },
  progressBarBg: { height: 5, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 2.5, width: '100%' },
  progressBarFill: { height: '100%', borderRadius: 2.5 },
  floatingAddBtn: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 999,
  },
  floatingAddBtnText: { color: COLORS.white, fontSize: 32, fontWeight: 'light', lineHeight: 34 },
});

export default HomeScreen;