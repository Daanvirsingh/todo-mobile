import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ListItem = ({ item, onDelete, onEdit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        {item.description ? (
          <Text style={styles.description}>{item.description}</Text>
        ) : null}
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={onEdit}>
        <Text style={styles.editButtonText}>EDIT</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(item.id)}
      >
        <Text style={styles.deleteButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  editButton: {
    padding: 10,
    marginRight: 10,
  },
  editButtonText: {
    color: '#0000ff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 10,
  },
  deleteButtonText: {
    color: '#ff0000',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
