/**
 * Component for adding a deal to favorites.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.product - The name of the product.
 * @param {DealFormatted} props.deal - The deal object.
 * @param {boolean | undefined} isDealDetails - Determines whether this component is in DealDetails screen or not
 * @returns {JSX.Element} - The rendered component.
 */
import React, { ReactElement, useContext } from 'react';

import { Button, Icon, IconProps, IconElement } from '@ui-kitten/components';
import { DealFormatted } from '@/constants/Interfaces';
import { toggleFavourite } from '@/utils/favoritesHook';
import { DataContext } from '@/data/context/DataContext';

function AddToFavorites(props: {
  product: string;
  deal: DealFormatted;
  isDealDetails?: boolean;
}): ReactElement {
  const { product, deal, isDealDetails } = props;
  const { contextFavs, setContextFavs } = useContext(DataContext) || {};

  const idStr = String(deal.id);

  // Gets and updates favorite status of the deal between screens
  const isAsFavourite = Object.hasOwnProperty.call(contextFavs, idStr);

  /**
   * Icon component for the save icon.
   *
   * @param {IconProps} props - The icon props.
   * @returns {IconElement} - The rendered icon component.
   */
  const SaveIcon = (props: IconProps): IconElement => {
    return (
      <Icon
        name="heart-outline"
        {...props}
        fill={isDealDetails ? 'black' : 'gray'}
      />
    );
  };

  /**
   * Icon component for the filled save icon.
   *
   * @param {IconProps} props - The icon props.
   * @returns {IconElement} - The rendered icon component.
   */
  const SaveIconFilled = (props: IconProps): IconElement => {
    return <Icon name="heart" {...props} fill="red" />;
  };

  const label = isAsFavourite
    ? `Remove ${product} from favourites`
    : `Add ${product} to favourites`;

  return (
    <Button
      accessibilityLabel={label}
      accessible={true}
      appearance={isDealDetails ? 'outline' : 'ghost'}
      status="primary"
      className={
        isDealDetails
          ? 'p-0 m-0 w-1 h-1 bg-transparent '
          : 'p-0 m-0 w-1 h-1 absolute top-1 right-1 z-10'
      }
      accessoryRight={(props) => {
        return isAsFavourite ? (
          <SaveIconFilled {...props} />
        ) : (
          <SaveIcon {...props} />
        );
      }}
      size="medium"
      style={isDealDetails ? { borderWidth: 2, borderColor: 'black' } : {}}
      onPress={toggleFavourite(deal, isAsFavourite, setContextFavs)}
    />
  );
}

export default AddToFavorites;
