import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [currentOperand, setCurrentOperand] = useState('');
  const [previousOperand, setPreviousOperand] = useState('');
  const [operation, setOperation] = useState(null);

  const appendNumber = (number) => {
    if (number === '.' && currentOperand.includes('.')) return;
    setCurrentOperand(currentOperand + number);
  };

  const chooseOperation = (operation) => {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
      compute();
    }
    setOperation(operation);
    setPreviousOperand(currentOperand);
    setCurrentOperand('');
  };

  const compute = () => {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }
    setCurrentOperand(computation.toString());
    setOperation(null);
    setPreviousOperand('');
  };

  const clear = () => {
    setCurrentOperand('');
    setPreviousOperand('');
    setOperation(null);
  };

  const deleteLast = () => {
    setCurrentOperand(currentOperand.slice(0, -1));
  };

  const createButton = (text, onPress, style = {}) => (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.output}>
        <Text style={styles.previousOperand}>
          {previousOperand} {operation}
        </Text>
        <Text style={styles.currentOperand}>{currentOperand}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          {createButton('AC', clear, { backgroundColor: '#f44336' })}
          {createButton('DEL', deleteLast, { backgroundColor: '#f44336' })}
          {createButton('÷', () => chooseOperation('÷'))}
        </View>
        <View style={styles.row}>
          {createButton('7', () => appendNumber('7'))}
          {createButton('8', () => appendNumber('8'))}
          {createButton('9', () => appendNumber('9'))}
          {createButton('*', () => chooseOperation('*'))}
        </View>
        <View style={styles.row}>
          {createButton('4', () => appendNumber('4'))}
          {createButton('5', () => appendNumber('5'))}
          {createButton('6', () => appendNumber('6'))}
          {createButton('-', () => chooseOperation('-'))}
        </View>
        <View style={styles.row}>
          {createButton('1', () => appendNumber('1'))}
          {createButton('2', () => appendNumber('2'))}
          {createButton('3', () => appendNumber('3'))}
          {createButton('+', () => chooseOperation('+'))}
        </View>
        <View style={styles.row}>
          {createButton('0', () => appendNumber('0'), { flex: 2 })}
          {createButton('.', () => appendNumber('.'))}
          {createButton('=', compute, { backgroundColor: 'green' })}
        </View>
      </View>
      <Text style={styles.footer}>Calc by Tejas Rathod</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    justifyContent: 'flex-end',
  },
  output: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#222',
    padding: 20,
  },
  previousOperand: {
    color: '#888',
    fontSize: 20,
  },
  currentOperand: {
    color: '#fff',
    fontSize: 40,
  },
  buttonContainer: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
    color: '#555',
  },
});
