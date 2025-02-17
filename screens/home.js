import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import axios from 'axios';

const { width } = Dimensions.get('window');

// News API key (You need to sign up at https://newsapi.org/ to get your own API key)
const NEWS_API_KEY = 'YOUR_NEWS_API_KEY';
const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?category=general&apiKey=${NEWS_API_KEY}`;

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Fetch news about life
    axios
      .get(NEWS_API_URL)
      .then(response => {
        setNews(response.data.articles.slice(0, 5)); // Get first 5 news articles
      })
      .catch(error => {
        console.error('Error fetching news:', error);
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Graphs and Charts */}
      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Graph/Chart Section</Text>
        <LineChart
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
              {
                data: [20, 45, 28, 80, 99, 43, 50],
              },
            ],
          }}
          width={width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#1e2923',
            backgroundGradientFrom: '#08130D',
            backgroundGradientTo: '#1e2923',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
        />
      </View>

      {/* News Section */}
      <View style={styles.newsContainer}>
        <Text style={styles.sectionTitle}>News About Life</Text>
        {news.map((article, index) => (
          <View key={index} style={styles.newsItem}>
            <Image source={{ uri: article.urlToImage }} style={styles.newsImage} />
            <View style={styles.newsText}>
              <Text style={styles.newsTitle}>{article.title}</Text>
              <Text style={styles.newsDescription}>{article.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const AboutScreen = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.screenText}>About Screen</Text>
    </View>
  );
};

const SearchScreen = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.screenText}>Search Screen</Text>
    </View>
  );
};

const SettingsScreen = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.screenText}>Settings Screen</Text>
    </View>
  );
};

const ProfileScreen = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.screenText}>Profile Screen</Text>    
    </View>
  );
};

const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#ff4757',
        tabBarInactiveTintColor: '#aaa',
        tabBarStyle: {
          backgroundColor: '#2f3542',
          borderTopWidth: 0,
          borderRadius: 20,
          marginBottom: 10,
          height: 60,
          paddingTop: 5,
        },
        headerShown: false, // Disable header for a cleaner look
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="home" size={28} color={color} />,
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="info" size={28} color={color} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="search" size={28} color={color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="settings" size={28} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="person" size={28} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f3542',
    paddingTop: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  chartContainer: {
    backgroundColor: '#1e2923',
    padding: 20,
    marginBottom: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  newsContainer: {
    padding: 20,
    marginBottom: 20,
  },
  newsItem: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#444',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  newsImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  newsText: {
    flex: 1,
  },
  newsTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  newsDescription: {
    color: '#ddd',
    fontSize: 14,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2f3542',
  },
  screenText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
