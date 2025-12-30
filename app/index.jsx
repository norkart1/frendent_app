import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const BUTTON_WIDTH = (width - 60) / 4;

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0');

  const handlePress = (value) => {
    if (value === '=') {
      try {
        const evalResult = eval(expression.replace('x', '*').replace('÷', '/'));
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
        <Text style={styles.expression}>{expression || '0'}</Text>
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
    backgroundColor: '#0A1A2F',
  },
  header: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
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
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  expression: {
    color: '#64748B',
    fontSize: 22,
    marginBottom: 10,
  },
  result: {
    color: '#FFFFFF',
    fontSize: 56,
    fontWeight: '600',
  },
  keypad: {
    backgroundColor: '#0D2137',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    width: BUTTON_WIDTH,
    height: BUTTON_WIDTH,
    borderRadius: 20,
    backgroundColor: '#162A43',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '500',
  },
  operatorButton: {
    backgroundColor: '#1E3A5F',
  },
  operatorText: {
    color: '#38BDF8',
  },
  clearText: {
    color: '#EF4444',
  },
  equalButton: {
    backgroundColor: '#2DD4BF',
  },
  equalText: {
    color: '#0A1A2F',
    fontSize: 32,
    fontWeight: '700',
  },
});

export default Calculator;
