import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ru.tabrisov',
  appName: 'wisla-mobile',
  webDir: 'dist/ng-ios',
  server: {
    androidScheme: 'https'
  }
};

export default config;
