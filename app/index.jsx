import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');
// Match the exact padding and layout from the image
const KEYPAD_PADDING = 20;
const BUTTON_GAP = 12;
const BUTTON_WIDTH = (width - (KEYPAD_PADDING * 2) - (3 * BUTTON_GAP)) / 4;

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0');

  const handlePress = (value) => {
    if (value === '=') {
      try {
        if (!expression) return;
        // Basic calculation logic
        const evalResult = eval(expression.replace(/x/g, '*').replace(/÷/g, '/'));
        setResult(evalResult.toLocaleString());
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setExpression('');
      setResult('0');
    } else if (value === '()') {
      const openCount = (expression.match(/\(/g) || []).length;
      const closeCount = (expression.match(/\)/g) || []).length;
      if (openCount > closeCount && !isNaN(expression.slice(-1)) && expression.slice(-1) !== '') {
        setExpression(expression + ')');
      } else {
        setExpression(expression + '(');
      }
    } else {
      setExpression(expression + value);
    }
  };

  const renderButton = (label, type = 'number') => {
    let buttonStyle = [styles.button];
    let textStyle = [styles.buttonText];

    if (type === 'operator') {
      buttonStyle.push(styles.operatorButton);
      textStyle.push(styles.operatorText);
    } else if (type === 'clear') {
      textStyle.push(styles.clearText);
    } else if (type === 'equal') {
      buttonStyle.push(styles.equalButton);
      textStyle.push(styles.equalText);
    }

    return (
      <TouchableOpacity 
        style={buttonStyle} 
        onPress={() => handlePress(label)}
        activeOpacity={0.7}
      >
        <Text style={textStyle}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Calculator</Text>
      </View>

      <View style={styles.displayContainer}>
        <Text style={styles.expression}>{expression}</Text>
        <Text style={styles.result}>{result}</Text>
      </View>

      <View style={styles.keypad}>
        <View style={styles.row}>
          {renderButton('C', 'clear')}
          {renderButton('()', 'operator')}
          {renderButton('%', 'operator')}
          {renderButton('÷', 'operator')}
        </View>
        <View style={styles.row}>
          {renderButton('1')}
          {renderButton('2')}
          {renderButton('3')}
          {renderButton('x', 'operator')}
        </View>
        <View style={styles.row}>
          {renderButton('4')}
          {renderButton('5')}
          {renderButton('6')}
          {renderButton('+', 'operator')}
        </View>
        <View style={styles.row}>
          {renderButton('7')}
          {renderButton('8')}
          {renderButton('9')}
          {renderButton('-', 'operator')}
        </View>
        <View style={styles.row}>
          {renderButton('.')}
          {renderButton('0')}
          {renderButton('000')}
          {renderButton('=', 'equal')}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071624', // Exact background from image
  },
  header: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 0 : 20,
    marginBottom: 40,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.9,
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  expression: {
    color: '#94A3B8',
    fontSize: 22,
    marginBottom: 8,
    textAlign: 'right',
  },
  result: {
    color: '#FFFFFF',
    fontSize: 52,
    fontWeight: '500',
    textAlign: 'right',
  },
  keypad: {
    paddingHorizontal: KEYPAD_PADDING,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    paddingTop: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: BUTTON_GAP,
  },
  button: {
    width: BUTTON_WIDTH,
    height: BUTTON_WIDTH,
    borderRadius: 24, // Exact rounded style from image
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '400',
  },
  operatorButton: {
    // Standard operators are transparent in the image style
  },
  operatorText: {
    color: '#38BDF8', // Cyan/Blue for operators
  },
  clearText: {
    color: '#F87171', // Redish for C
  },
  equalButton: {
    backgroundColor: '#3DD8C4', // Specific green/teal for = button
    borderRadius: 24,
  },
  equalText: {
    color: '#071624',
    fontSize: 32,
    fontWeight: '600',
  },
});

export default Calculator;
