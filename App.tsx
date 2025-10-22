import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// defines how the MenuItem will appear
interface MenuItem {
  id: number;
  dishName: string;
  description: string;
  course: string;
  price: string;
}

export default function App() {

  // States to store input values 
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Starters');
  const [price, setPrice] = useState('');

  // Stores all added menu items 
  const [menu, setMenu] = useState<MenuItem[]>([]);
  
   // Adds a new dish to the menu 
  const handleAddItem = () => {

    // ensures no field is left empty 
    if (!dishName || !description || !price) {
      Alert.alert('Error', 'Please fill in all fields before adding the dish.');
      return;
    }

    // Creates new menu item 
    const newItem: MenuItem = {
      id: Date.now(),
      dishName,
      description,
      course,
      price,
    };
    // adds menu to existing list 
    setMenu([...menu, newItem]);

    // Clears the input fields after adding 
    setDishName('');
    setDescription('');
    setCourse('Starters');
    setPrice('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Christoffel’s Cooking Menu</Text>

      <Text style={styles.subtitle}>Add a new menu item:</Text>
       
        // input for dish name 
      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={dishName}
        onChangeText={setDishName}
      />
       
       // input for discription 
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      
       // dropdown to select course 
      <Text style={styles.label}>Select Course:</Text>
      <Picker
        selectedValue={course}
        onValueChange={(itemValue) => setCourse(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Starters" value="Starters" />
        <Picker.Item label="Mains" value="Mains" />
        <Picker.Item label="Dessert" value="Dessert" />
      </Picker>
       
       // input for price 
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />
       // Enables add menu button
      <Button title="Add to Menu" onPress={handleAddItem} />
       
       // Displays total number of items 
      <Text style={styles.menuHeader}>Menu ({menu.length} items)</Text>
       
       // List of menu items
      <FlatList
        data={menu}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.itemName}>{item.dishName}</Text>
            <Text style={styles.itemDetails}>{item.course} - R{item.price}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}

// Stylling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'pink',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: 'pink',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  label: {
    marginBottom: 5,
    color: 'brown',
  },
  picker: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10,
  },
  menuHeader: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  menuItem: {
    backgroundColor: 'light black',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  itemDetails: {
    fontSize: 14,
    color: 'black',
  },
  itemDescription: {
    fontSize: 13,
    color: 'black',
  },
});

// References: 

// reactnative.dev. (n.d.). Using List Views · React Native. [online] Available at: https://reactnative.dev/docs/using-a-listview.>[Accessed 21 October 2025].
// W3schools.com. (2025). W3Schools.com. [online] Available at: https://www.w3schools.com/react/react_forms_select.asp.> [Accessed 22 Oct. 2025].
// The Independent Institute of Education (IIE), 2025. Mobile App Scripting [MAST5112/p/w Module Outline]. The Independent Institute of Education: Unpublished. 
// 



