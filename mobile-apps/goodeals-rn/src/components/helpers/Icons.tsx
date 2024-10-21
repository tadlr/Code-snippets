import React from 'react';
import { Icon, IconProps, IconElement } from '@ui-kitten/components';
import { IconName } from '@/constants/Types';

/**
 * Creates an icon element with the specified name and props.
 * @param name - The name of the icon.
 * @param props - The props to be passed to the icon element.
 * @returns The created icon element.
 */
function createIcon(name: IconName, props: IconProps): IconElement {
  return <Icon {...props} name={name} />;
}

/**
 * Represents the Home icon.
 * @param props - The props to be passed to the icon element.
 * @returns The Home icon element.
 */
const HomeIcon = (props: IconProps): IconElement =>
  createIcon('home-outline', props);

/**
 * Represents the Favourite icon.
 * @param props - The props to be passed to the icon element.
 * @returns The Favourite icon element.
 */
const FavIcon = (props: IconProps): IconElement =>
  createIcon('heart-outline', props);

/**
 * Represents the Stores icon.
 * @param props - The props to be passed to the icon element.
 * @returns The Stores icon element.
 */
const StoresIcon = (props: IconProps): IconElement =>
  createIcon('pin-outline', props);

/**
 * Represents the Settings icon.
 * @param props - The props to be passed to the icon element.
 * @returns The Settings icon element.
 */
const SettingsIcon = (props: IconProps): IconElement =>
  createIcon('settings-2-outline', props);

/**
 * Represents the Save icon.
 * @param props - The props to be passed to the icon element.
 * @returns The Save icon element.
 */
const SaveIcon = (props: IconProps): IconElement =>
  createIcon('save-outline', props);

export { HomeIcon, FavIcon, StoresIcon, SettingsIcon, createIcon, SaveIcon };
