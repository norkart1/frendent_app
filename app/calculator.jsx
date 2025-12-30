import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import styles from '../assets/styles/calculator.styles';

const Calculator = () => {
  const router = useRouter();
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0');

  const handlePress = (value) => {
    if (value === '=') {
      try {
        const evalResult = eval(expression.replace('x', '*').replace('÷', '/'));
        setResult(evalResult.toString());
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setExpression('');
      setResult('0');
    } else if (value === '()') {
      // Basic parenthesis logic
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

  const renderButton = (label, style = {}, textStyle = {}) => (
    <TouchableOpacity 
      style={[styles.button, style]} 
      onPress={() => handlePress(label)}
    >
      <Text style={[styles.buttonText, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Calculator</Text>
      </View>

      <View style={styles.displayContainer}>
        <Text style={styles.expression}>{expression || '0'}</Text>
        <Text style={styles.result}>{result}</Text>
      </View>

      <View style={styles.keypad}>
        <View style={styles.row}>
          {renderButton('C', {}, styles.clearText)}
          {renderButton('()', styles.operatorButton, styles.operatorText)}
          {renderButton('%', styles.operatorButton, styles.operatorText)}
          {renderButton('÷', styles.operatorButton, styles.operatorText)}
        </View>
        <View style={styles.row}>
          {renderButton('1')}
          {renderButton('2')}
          {renderButton('3')}
          {renderButton('x', styles.operatorButton, styles.operatorText)}
        </View>
        <View style={styles.row}>
          {renderButton('4')}
          {renderButton('5')}
          {renderButton('6')}
          {renderButton('+', styles.operatorButton, styles.operatorText)}
        </View>
        <View style={styles.row}>
          {renderButton('7')}
          {renderButton('8')}
          {renderButton('9')}
          {renderButton('-', styles.operatorButton, styles.operatorText)}
        </View>
        <View style={styles.row}>
          {renderButton('.')}
          {renderButton('0')}
          {renderButton('000')}
          <TouchableOpacity 
            style={styles.equalButton} 
            onPress={() => handlePress('=')}
          >
            <Text style={styles.equalText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Calculator;
