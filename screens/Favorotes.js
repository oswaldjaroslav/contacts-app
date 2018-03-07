import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';

import store from '../store';

import { fetchContacts } from '../utils/api';
import ContactThumbnail from '../components/ContactThumbnail';

export default class Favorites extends React.Component {

  static navigationOptions = {
    title: 'Favorites'
  }

  constructor(props) {
    super(props);
    this.state = {
      contacts: store.getState().contacts,
      loading: store.getState().isFetchingContacts,
      error: store.getState().error
    }
  }

  async componentDidMount() {

    const { contacts } = this.state;

    this.unsubscribe = store.onChange(() => {
      this.setState({
        contacts: store.getState().contacts,
        loading: store.getState().isFetchingContacts,
        error: store.getState().error
      });
    });

    if (contacts.length > 0) {
      const fetchedContacts = await fetchContacts();
      store.setState({
        contacts: fetchedContacts,
        isFetchingContacts: false
      })
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  renderFavoriteThumbail = ({item}) => {
    const { navigation: { navigate } } = this.props;
    const { avatar } = item;

    return (
      <ContactThumbnail 
      avatar={avatar} 
      onPress={() => { navigate('Profile', { contact: item }) }} />
    )
  }

  render() {
    const { contacts, loading, error } = this.state;
    const favoritesContacts = contacts.filter(i => i.favorite);

    return (
      <View style={styles.container} >
        {loading && <ActivityIndicator size="large" />}
        {error && <Text>Error...</Text>}
        {!loading && !error && (
          <FlatList 
          data={favoritesContacts} 
          keyExtractor={({phone}) => phone} 
          numColumns={3} 
          contentContainerStyle={styles.list} 
          renderItem={this.renderFavoriteThumbail} />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1
  },
  list: {
    alignItems: 'center'
  }
});