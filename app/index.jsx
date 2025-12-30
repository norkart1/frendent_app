import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, StyleSheet, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const KEYPAD_PADDING = 20;
const BUTTON_GAP = 12;
const BUTTON_WIDTH = (width - (KEYPAD_PADDING * 2) - (3 * BUTTON_GAP)) / 4;

const Calculator = () => {
  const router = useRouter();
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0');
  const [isCalculated, setIsCalculated] = useState(false);

  const handlePress = (value) => {
    if (value === '=') {
      try {
        if (!expression) return;
        const sanitized = expression
          .replace(/x/g, '*')
          .replace(/÷/g, '/')
          .replace(/%/g, '/100');
        
        const evalResult = new Function(`return ${sanitized}`)();
        
        if (isNaN(evalResult) || !isFinite(evalResult)) {
          setResult('Error');
        } else {
          const formattedResult = Number(evalResult.toFixed(8)).toLocaleString('en-US', {
            maximumFractionDigits: 8,
            useGrouping: true
          });
          setResult(formattedResult);
          setIsCalculated(true);
        }
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setExpression('');
      setResult('0');
      setIsCalculated(false);
    } else if (value === '()') {
      const openCount = (expression.match(/\(/g) || []).length;
      const closeCount = (expression.match(/\)/g) || []).length;
      let newExpr = expression;
      if (isCalculated) {
        newExpr = result.replace(/,/g, '');
        setIsCalculated(false);
      }
      if (openCount > closeCount && !isNaN(newExpr.slice(-1)) && newExpr.slice(-1) !== '') {
        setExpression(newExpr + ')');
      } else {
        setExpression(newExpr + '(');
      }
    } else {
      const operators = ['+', '-', 'x', '÷', '%'];
      let currentExpr = expression;
      
      if (isCalculated) {
        if (operators.includes(value)) {
          currentExpr = result.replace(/,/g, '');
        } else {
          currentExpr = '';
        }
        setIsCalculated(false);
      }

      if (operators.includes(value) && operators.includes(currentExpr.slice(-1))) {
        setExpression(currentExpr.slice(0, -1) + value);
      } else {
        const nextExpr = currentExpr + value;
        setExpression(nextExpr);
        
        try {
          if (nextExpr && !operators.includes(value)) {
             const san = nextExpr
              .replace(/x/g, '*')
              .replace(/÷/g, '/')
              .replace(/%/g, '/100');
             const res = new Function(`return ${san}`)();
             if (!isNaN(res) && isFinite(res)) {
               setResult(Number(res.toFixed(8)).toLocaleString('en-US', {
                 maximumFractionDigits: 8,
                 useGrouping: true
               }));
             }
          }
        } catch(e) {}
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
        <TouchableOpacity 
          style={styles.burgerButton} 
          onPress={() => router.push('/about')}
        >
          <Ionicons name="menu" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Calculator</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <View style={styles.displayArea}>
        <View style={styles.displayContent}>
          <Text style={styles.expressionText} numberOfLines={1}>{expression}</Text>
          <Text style={styles.resultText} numberOfLines={1} adjustsFontSizeToFit>{result}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  burgerButton: {
    padding: 5,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  headerPlaceholder: {
    width: 38,
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
    fontSize: 28,
    marginBottom: 5,
    textAlign: 'right',
  },
  resultText: {
    color: '#FFFFFF',
    fontSize: 84,
    fontWeight: '500',
    textAlign: 'right',
    includeFontPadding: false,
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
    fontSize: 28,
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
