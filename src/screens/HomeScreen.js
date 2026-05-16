import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../constants/colors';
import TaskCard from '../components/TaskCard';
import { SCREENS } from '../constants/screens';
import GroupCard from '../components/GroupCard';

const HomeScreen = ({ navigation }) => {
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
            <Text style={styles.promoSubTitle}>You have completed 85% of your tasks</Text>
            <TouchableOpacity
              style={styles.viewBtn}
              onPress={() => navigation.navigate(SCREENS.TASKS)}
            >
              <Text style={styles.viewBtnText}>View Task</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.percentContainer}>
             <Text style={styles.promoPercent}>85%</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Основний скрол-контент */}
      <ScrollView 
        style={styles.contentContainer} 
        showsVerticalScrollIndicator={false}
      >
        {/* Секція In Progress */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>In progress</Text>
          <TouchableOpacity>
             <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        <TaskCard
          title="Work"
          subTitle="Finish task on week"
          progress={45}
          color="#1E67FF"
          onPress={() => navigation.navigate('AddTask', { groupName: 'Work' })}
        />
        <TaskCard
          title="Study"
          subTitle="Exam last week home"
          progress={80}
          color="#FF6B6B"
          onPress={() => navigation.navigate('AddTask', { groupName: 'Study' })}
        />

        {/* Секція Task Groups */}
        <Text style={styles.sectionTitle}>Task Groups</Text>
        
        <View style={styles.groupsGrid}>
          <GroupCard
            title="Work"
            taskCount={22}
            icon="briefcase"
            color="#1E67FF"
            progress={70}
            onPress={() => navigation.navigate('Tasks', { filter: 'Work' })}
          />
          <GroupCard
            title="Study"
            taskCount={12}
            icon="book-open"
            color="#FF9F43"
            progress={30}
            onPress={() => navigation.navigate('Tasks', { filter: 'Study' })}
          />
          <GroupCard
            title="Kids"
            taskCount={10}
            icon="heart"
            color="#6C5CE7"
            progress={20}
            onPress={() => navigation.navigate('Tasks', { filter: 'Kids' })}
          />
          <GroupCard
            title="Home"
            taskCount={8}
            icon="home"
            color="#4ECDC4"
            progress={50}
            onPress={() => navigation.navigate('Tasks', { filter: 'Home' })}
          />
        </View>
        
        {/* Нижній відступ для комфортного скролу над таб-баром */}
        <View style={styles.bottomSpacer} /> 
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { 
    flex: 1, 
    backgroundColor: '#FFFFFF' 
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
    color: '#FFFFFF' 
  },
  greetingSubTitle: { 
    fontSize: 16, 
    color: 'rgba(255, 255, 255, 0.8)' 
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
  promoSubTitle: { color: 'rgba(255, 255, 255, 0.8)', fontSize: 13, marginVertical: 8 },
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