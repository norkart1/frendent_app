import { StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1A2F',
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    marginRight: 40,
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 40,
  },
  expression: {
    color: '#64748B',
    fontSize: 24,
    marginBottom: 8,
  },
  result: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '700',
  },
  keypad: {
    flex: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '500',
  },
  operatorButton: {
    backgroundColor: '#334155',
  },
  operatorText: {
    color: '#38BDF8',
  },
  clearText: {
    color: '#EF4444',
  },
  equalButton: {
    backgroundColor: '#2DD4BF',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  equalText: {
    color: '#0A1A2F',
    fontSize: 32,
    fontWeight: '700',
  },
  zeroButton: {
    width: 70,
  },
});
