import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ContactThumbnail from '../components/ContactThumbnail';
import colors from '../utils/colors';
import { fetchUserContact } from '../utils/api';

import store from '../store';

export default class User extends React.Component {

  static navigationOptions = ({navigation: { navigate }}) => ({
    title: 'Me',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: colors.blue
    },
    headerRight: (
      <Icon 
      name="settings" 
      size={24} 
      style={{
        color: 'white',
        marginRight: 10
      }} 
      onPress={() => { navigate('Options') }} />
    )
  })

  constructor(props) {
    super(props);
    this.state = {
      user: store.getState().user,
      loading: store.getState().isFetchingUser,
      error: store.getState().error
    }
  }

  async componentDidMount() {

    const { user } = this.state;

    this.unsubscribe = store.onChange(() => {
      this.setState({
        user: store.getState().user,
        loading: store.getState().isFetchingUser,
        error: store.getState().error
      });
    });

    const fetchedUser = await fetchUserContact();
    store.setState({
      user: fetchedUser,
      isFetchingUser: false,
      error: false
    })

  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { user, loading, error } = this.state;
    const { avatar, name, phone } = user;

    return (
      <View style={styles.container} >
        {loading && <ActivityIndicator size="large" />}
        {error && <Text>Error...</Text>}
        {!loading && !error && (
          <ContactThumbnail 
          avatar={avatar} 
          name={name} 
          phone={phone} />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue
  }
});