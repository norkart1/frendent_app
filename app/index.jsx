import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
// Calculate button size based on screen width to ensure it fits mobile screens
const BUTTON_GAP = 12;
const BUTTON_WIDTH = (width - (5 * BUTTON_GAP)) / 4;

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0');

  const handlePress = (value) => {
    if (value === '=') {
      try {
        if (!expression) return;
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
      textStyle.push(styles.clearButton);
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
        <Text style={styles.expression} numberOfLines={1} adjustsFontSizeToFit>{expression}</Text>
        <Text style={styles.result} numberOfLines={1} adjustsFontSizeToFit>{result}</Text>
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
    backgroundColor: '#0A1A2F',
  },
  header: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 0 : 20,
    paddingBottom: 10,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 25,
    paddingBottom: 25,
  },
  expression: {
    color: '#64748B',
    fontSize: 24,
    marginBottom: 5,
    textAlign: 'right',
  },
  result: {
    color: '#FFFFFF',
    fontSize: 64,
    fontWeight: '600',
    textAlign: 'right',
  },
  keypad: {
    backgroundColor: '#0D2137',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: BUTTON_GAP,
    paddingTop: 30,
    paddingBottom: Platform.OS === 'ios' ? 40 : 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: BUTTON_GAP,
  },
  button: {
    width: BUTTON_WIDTH,
    height: BUTTON_WIDTH,
    borderRadius: 22,
    backgroundColor: '#162A43',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '500',
  },
  operatorButton: {
    backgroundColor: '#1E3A5F',
  },
  operatorText: {
    color: '#38BDF8',
  },
  clearButton: {
    // Keep standard button background for consistency with screenshot
  },
  clearText: {
    color: '#EF4444',
  },
  equalButton: {
    backgroundColor: '#2DD4BF',
  },
  equalText: {
    color: '#0A1A2F',
    fontSize: 34,
    fontWeight: '700',
  },
});

export default Calculator;
