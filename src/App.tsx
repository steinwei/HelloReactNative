/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useRef, type PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview'
import { WebViewSource, WebViewSourceUri } from 'react-native-webview/lib/WebViewTypes';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
  };

type ReactNativeEvent = any

const App = () => {
  const webvienRef = useRef(null)
  const isDarkMode = useColorScheme() === 'dark';
  const isWebview = true; // debug webview mode

  const injectedJavascript = `document.body.style.backgroundColor = 'red'`

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  function handleMessage(evt: ReactNativeEvent): void {
    const data = evt?.nativeEvent?.data 
    console.log(data)
    let params = null
    try {
      params = JSON.parse(data)
    } catch (e) {
      
    }
    getFunctionName(params)
  }

  function getFunctionName(params) {
    const {
      name = 'default'
    } = params
    switch (name) {
      case "popup":
        showPopup();
        break;
      case "toast":
        showToast();
      default:
        break;
    }
  }

  function showPopup() {
    console.log("popup")
  }

  function showToast() {
    console.log("toast")
  }

  if (isWebview) {
    return (
      <View style={{flex: 1}}>
       <WebView ref={webvienRef.current} source={{ uri: "https://www.baidu.com/index.html" }}
          injectedJavascript={injectedJavascript} OnMessage={handleMessage} javaScriptEnabled />
      </View>
    )
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
