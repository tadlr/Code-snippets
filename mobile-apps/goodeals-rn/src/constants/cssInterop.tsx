import { cssInterop } from 'nativewind';
import {
  Button,
  Radio,
  Toggle,
  Input,
  Select,
  CheckBox,
  Text,
  Card,
  List,
  ListItem,
  TopNavigation,
  BottomNavigation,
  Menu,
  MenuItem,
  Divider,
  Layout,
  TabView,
  Tab,
  ViewPager,
  Avatar,
  Tooltip,
  Popover,
  Autocomplete,
  RangeDatepicker,
  Calendar,
  Datepicker,
  Modal,
  OverflowMenu,
} from '@ui-kitten/components';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import MapView from 'react-native-maps';
import Markdown from 'react-native-markdown-display';
/**
 * Initializes the styles for various components.
 */
function InitStyles() {
  cssInterop(Button, { className: 'style' });
  cssInterop(Radio, { className: 'style' });
  cssInterop(Toggle, { className: 'style' });
  cssInterop(Input, { className: 'style' });
  cssInterop(Select, { className: 'style' });
  cssInterop(CheckBox, { className: 'style' });
  cssInterop(Text, { className: 'style' });
  cssInterop(Card, { className: 'style' });
  cssInterop(List, { className: 'style' });
  cssInterop(ListItem, { className: 'style' });
  cssInterop(TopNavigation, { className: 'style' });
  cssInterop(BottomNavigation, { className: 'style' });
  cssInterop(Menu, { className: 'style' });
  cssInterop(MenuItem, { className: 'style' });
  cssInterop(Divider, { className: 'style' });
  cssInterop(Layout, { className: 'style' });
  cssInterop(TabView, { className: 'style' });
  cssInterop(Tab, { className: 'style' });
  cssInterop(ViewPager, { className: 'style' });
  cssInterop(Avatar, { className: 'style' });
  cssInterop(Tooltip, { className: 'style' });
  cssInterop(Popover, { className: 'style' });
  cssInterop(Autocomplete, { className: 'style' });
  cssInterop(RangeDatepicker, { className: 'style' });
  cssInterop(Calendar, { className: 'style' });
  cssInterop(Datepicker, { className: 'style' });
  cssInterop(Modal, { className: 'style' });
  cssInterop(OverflowMenu, { className: 'style' });
  cssInterop(Image, { className: 'style' });
  cssInterop(LottieView, { className: 'style' });
  cssInterop(MapView, { className: 'style' });
  cssInterop(Markdown, { className: 'style' });
  cssInterop(SafeAreaView, { className: 'style' });
}

export default InitStyles;
