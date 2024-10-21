import React, { useEffect } from 'react';
import { View, Text, Layout, Drawer, DrawerItem } from '@AppComponents';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';

import { HeaderButton } from '@components/HeaderButton';
import { Drawer as Navigator } from 'expo-router/drawer';
import { IndexPath } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Auth from 'src/auth/Auth';
import { Button } from '@components/Button';

const { Screen } = Navigator;

const Header = () => {
  return (
    <Layout className="mx-5">
      <Text>Header</Text>
    </Layout>
  );
};

const Footer = () => {
  const [isAuth, setIsAuth] = React.useState(false);

  useEffect(() => {
    const CheckAuth = async () => {
      const auth = await Auth.isUserSignedIn();
      setIsAuth(auth);
    };

    CheckAuth();
  }, []);

  return (
    <View className="mx-5">
      {isAuth ? (
        <Button
          onPress={() => {
            Auth.signOut();
            setIsAuth(false);
          }}
          className="bg-red-500 bg-white"
          apperance="ghost"
          status="info"
        >
          Log Out
        </Button>
      ) : (
        <></>
      )}
    </View>
  );
};

const drawerContent = ({ navigation, state }) => {
  const insets = useSafeAreaInsets();
  return (
    <Layout
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      className="flex-1"
    >
      <Drawer
        selectedIndex={new IndexPath(state.index)}
        header={Header}
        footer={Footer}
        onSelect={(index) => navigation.navigate(state.routeNames[index.row])}
        style={{ paddingTop: insets.top }}
      >
        <DrawerItem title="Users" />
        <DrawerItem title="Orders" />
      </Drawer>
    </Layout>
  );
};

const DrawerLayout = () => {
  return (
    <Navigator drawerContent={drawerContent}>
      <Screen
        name="index"
        options={{
          headerTitle: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="(tabs)"
        options={{
          headerTitle: 'Tabs',
          drawerLabel: 'Tabs',
          drawerIcon: ({ size, color }) => (
            <MaterialIcons name="border-bottom" size={size} color={color} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <HeaderButton />
            </Link>
          ),
        }}
      />
    </Navigator>
  );
};

export default DrawerLayout;
