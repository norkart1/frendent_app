import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');
// Calculate spacing carefully
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
        // Sanitizing expression for safer eval
        const sanitized = expression
          .replace(/x/g, '*')
          .replace(/÷/g, '/')
          .replace(/%/g, '/100');
        
        // Use Function instead of eval for slightly better safety/scoping
        const evalResult = new Function(`return ${sanitized}`)();
        
        if (isNaN(evalResult) || !isFinite(evalResult)) {
          setResult('Error');
        } else {
          // Format result with commas and reasonable decimal places
          const formattedResult = Number(evalResult.toFixed(8)).toLocaleString('en-US', {
            maximumFractionDigits: 8,
            useGrouping: true
          });
          setResult(formattedResult);
        }
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setExpression('');
      setResult('0');
    } else if (value === '()') {
      const openCount = (expression.match(/\(/g) || []).length;
      const closeCount = (expression.match(/\)/g) || []).length;
      // Smarter parenthesis logic
      if (openCount > closeCount && !isNaN(expression.slice(-1)) && expression.slice(-1) !== '') {
        setExpression(expression + ')');
      } else {
        setExpression(expression + '(');
      }
    } else {
      // Prevent multiple operators in a row
      const operators = ['+', '-', 'x', '÷', '%'];
      if (operators.includes(value) && operators.includes(expression.slice(-1))) {
        setExpression(expression.slice(0, -1) + value);
      } else {
        setExpression(expression + value);
      }
    }
  };

  const renderButton = (label, type = 'number') => {
    let buttonStyle = [styles.button];
    let textStyle = [styles.buttonText];

    if (type === 'operator') {
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

      <View style={styles.displayArea}>
        <View style={styles.displayContent}>
          <Text style={styles.expressionText} numberOfLines={1}>{expression}</Text>
          <Text style={styles.resultText} numberOfLines={1}>{result}</Text>
        </View>
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
    backgroundColor: '#071624',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  displayArea: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  displayContent: {
    alignItems: 'flex-end',
    width: '100%',
  },
  expressionText: {
    color: '#94A3B8',
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'right',
  },
  resultText: {
    color: '#FFFFFF',
    fontSize: 64,
    fontWeight: '500',
    textAlign: 'right',
    includeFontPadding: false,
    lineHeight: 74,
  },
  keypad: {
    paddingHorizontal: KEYPAD_PADDING,
    paddingBottom: Platform.OS === 'ios' ? 40 : 30,
    paddingTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: BUTTON_GAP,
  },
  button: {
    width: BUTTON_WIDTH,
    height: BUTTON_WIDTH,
    borderRadius: 24,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '400',
  },
  operatorText: {
    color: '#38BDF8',
  },
  clearText: {
    color: '#F87171',
  },
  equalButton: {
    backgroundColor: '#3DD8C4',
    borderRadius: 24,
  },
  equalText: {
    color: '#071624',
    fontSize: 34,
    fontWeight: '600',
  },
});

export default Calculator;
