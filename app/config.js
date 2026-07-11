import { Platform } from 'react-native';

// Dynamically sets backend API URL based on Platform
// Android emulator uses 10.0.2.2 to access host localhost
// iOS simulator and Web use localhost directly
export const API_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:5000/api'
  : 'http://localhost:5000/api';
