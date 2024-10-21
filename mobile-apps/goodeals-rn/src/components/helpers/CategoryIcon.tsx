import React from 'react';
import { cssInterop } from 'nativewind';
import { SvgProps } from 'react-native-svg';

import HealthIcon from '@/assets/categories/health.svg';
import ApparelIcon from '@/assets/categories/apparel.svg';
import HomeIcon from '@/assets/categories/home.svg';
import FoodIcon from '@/assets/categories/food.svg';
import ArtsIcon from '@/assets/categories/arts.svg';
import BabyIcon from '@/assets/categories/baby.svg';
import ElectronicsIcon from '@/assets/categories/electronics.svg';
import FurnitureIcon from '@/assets/categories/furniture.svg';
import OfficeIcon from '@/assets/categories/office.svg';
import ToysIcon from '@/assets/categories/toys.svg';
import Hardware from '@/assets/categories/hardware.svg';
import Media from '@/assets/categories/media.svg';
import Pets from '@/assets/categories/pets.svg';
import Camera from '@/assets/categories/camera.svg';
import Software from '@/assets/categories/software.svg';
import Sports from '@/assets/categories/sports.svg';
import Industrial from '@/assets/categories/industrial.svg';
import Vehicles from '@/assets/categories/vehicles.svg';
import OtherIcon from '@/assets/categories/other.svg';

/**
 * Object mapping category names to their corresponding AvatarProps.
 */
const TheIcons = {
  0: (props: SvgProps) => <OtherIcon {...props} />,
  2: (props: SvgProps) => <HealthIcon {...props} />,
  3: (props: SvgProps) => <ApparelIcon {...props} />,
  4: (props: SvgProps) => <HomeIcon {...props} />,
  1: (props: SvgProps) => <FoodIcon {...props} />,
  5: (props: SvgProps) => <ArtsIcon {...props} />,
  6: (props: SvgProps) => <BabyIcon {...props} />,
  7: (props: SvgProps) => <ElectronicsIcon {...props} />,
  8: (props: SvgProps) => <FurnitureIcon {...props} />,
  9: (props: SvgProps) => <OfficeIcon {...props} />,
  10: (props: SvgProps) => <ToysIcon {...props} />,
  11: (props: SvgProps) => <Hardware {...props} />,
  13: (props: SvgProps) => <Industrial {...props} />,
  17: (props: SvgProps) => <Vehicles {...props} />,
  24: (props: SvgProps) => <Sports {...props} />,
  25: (props: SvgProps) => <Media {...props} />,
  26: (props: SvgProps) => <Camera {...props} />,
  27: (props: SvgProps) => <Software {...props} />,
  28: (props: SvgProps) => <Pets {...props} />,
};

export const CatIcons: { [key: string]: (props: SvgProps) => JSX.Element } = {};

Object.entries(TheIcons).map(([categoryId, IconComponent]) => {
  cssInterop(IconComponent, {
    className: {
      target: 'style',
      nativeStyleToProp: { width: true, height: true },
    },
  });

  CatIcons[String(categoryId)] = IconComponent;
});
