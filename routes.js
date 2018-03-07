import React from 'react';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import User from './screens/User';
import Favorites from './screens/Favorotes';
import Contacts from './screens/Contacts';
import Profile from './screens/Profile';
import Options from './screens/Options';
import colors from './utils/colors';

const getTabBarIcon = icon => ({tintColor}) => (
  <Icon name={icon} size={26} style={{ color: tintColor }} ></Icon>
)

const ContactScreen = StackNavigator({
  Contacts: {
    screen: Contacts
  },
  Profile: {
    screen: Profile
  }
}, {
  initialRouteName: 'Contacts',
  navigationOptions: {
    tabBarIcon: getTabBarIcon('list')
  }
});

const FavoritesScreen = StackNavigator({
  Favorites: {
    screen: Favorites,
  },
  Profile: {
    screen: Profile
  }
}, {
  initialRouteName: 'Favorites',
  navigationOptions: {
    tabBarIcon: getTabBarIcon('star')
  }
});

const UserScreen = StackNavigator({
  User: {
    screen: User
  },
  Options: {
    screen: Options
  }
}, {
  initialRouteName: 'User',
  navigationOptions: {
    tabBarIcon: getTabBarIcon('person')
  }
});

export default TabNavigator({
  Contacts: {
    screen: ContactScreen
  },
  Favorites: {
    screen: FavoritesScreen
  },
  User: {
    screen: UserScreen
  }
}, {
  initialRouteName: 'Contacts',
  tabBarPosition: 'bottom',
  tabBarOptions: {
    style: {
      backgroundColor: colors.greyLight
    },
    showLabel: false,
    showIcon: true,
    activeTintColor: colors.blue,
    inactiveTintColor: colors.greyDark,
    renderIndicator: () => null
  }
});

// export default DrawerNavigator({
//   Contacts: {
//     screen: ContactScreen
//   },
//   Favorites: {
//     screen: FavoritesScreen
//   },
//   User: {
//     screen: UserScreen
//   }
// }, {
//   initialRouteName: 'Contacts'
// });

// function for opening draver: navigate('DrawerToggle | DrawerOpen | DrawerClose')