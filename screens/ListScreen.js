import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListItem from '../components/ListItem';

const ListScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const savedItems = await AsyncStorage.getItem('items');
        console.log('Loaded items:', savedItems); // Debugging log
        if (savedItems) {
          setItems(JSON.parse(savedItems));
        } else {
          setItems([]); // Ensure state is cleared if no items
        }
      } catch (error) {
        console.error('Error loading items:', error);
      }
    };

    loadItems(); // Initial load

    // Refresh list when returning from AddItem or EditItem screen
    const unsubscribe = navigation.addListener('focus', loadItems);

    return unsubscribe;
  }, [navigation]);

  const deleteItem = async (id) => {
    try {
      const updatedItems = items.filter(item => item.id !== id);
      await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
      setItems(updatedItems);
    } catch (error) {
      console.error('Error deleting item:', error);
      Alert.alert('Error', 'Failed to delete item');
    }
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No items added</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>TODO</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            onDelete={deleteItem}
            onEdit={() => navigation.navigate('EditItem', { item })}
          />
        )}
        ListEmptyComponent={renderEmptyComponent}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddItem')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    backgroundColor: '#2196F3',
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    padding: 10,
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
});
