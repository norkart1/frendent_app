import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
      if (openCount > closeCount && !isNaN(expression.slice(-1))) {
        setExpression(expression + ')');
      } else {
        setExpression(expression + '(');
      }
    } else {
      setExpression(expression + value);
    }
  };

  const renderButton = (label, isOperator = false, isClear = false) => (
    <TouchableOpacity 
      style={[
        styles.button, 
        isOperator && styles.operatorButton,
        label === '=' && styles.equalButton
      ]} 
      onPress={() => handlePress(label)}
    >
      <Text style={[
        styles.buttonText, 
        isOperator && styles.operatorText,
        isClear && styles.clearText,
        label === '=' && styles.equalText
      ]}>{label}</Text>
    </TouchableOpacity>
  );

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
          {renderButton('C', false, true)}
          {renderButton('()', true)}
          {renderButton('%', true)}
          {renderButton('÷', true)}
        </View>
        <View style={styles.row}>
          {renderButton('1')}
          {renderButton('2')}
          {renderButton('3')}
          {renderButton('x', true)}
        </View>
        <View style={styles.row}>
          {renderButton('4')}
          {renderButton('5')}
          {renderButton('6')}
          {renderButton('+', true)}
        </View>
        <View style={styles.row}>
          {renderButton('7')}
          {renderButton('8')}
          {renderButton('9')}
          {renderButton('-', true)}
        </View>
        <View style={styles.row}>
          {renderButton('.')}
          {renderButton('0')}
          {renderButton('000')}
          {renderButton('=')}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1A2F',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  expression: {
    color: '#64748B',
    fontSize: 24,
    marginBottom: 8,
  },
  result: {
    color: '#FFFFFF',
    fontSize: 64,
    fontWeight: '700',
  },
  keypad: {
    flex: 2,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    width: 75,
    height: 75,
    borderRadius: 20,
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
  clearText: {
    color: '#EF4444',
  },
  equalButton: {
    backgroundColor: '#2DD4BF',
  },
  equalText: {
    color: '#0A1A2F',
    fontSize: 36,
    fontWeight: '700',
  },
});

export default Calculator;
