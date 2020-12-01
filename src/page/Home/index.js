import React from 'react';
import {Text} from 'react-native';
import {
  Container,
  Scroller,
  HeaderArea,
  HeaderTitle,
  LocationInput,
  SearchButton,
  LocationArea,
  LocationFinder,
} from './styled';

import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';

export default () => {
  return (
    <Container>
      <Scroller>
        <HeaderArea>
          <HeaderTitle numberOfLines={2}>
            Encontre o seu Barbeiro Favorito
          </HeaderTitle>
          <SearchButton>
            <SearchIcon width="26" height="26" fill="#fff" />
          </SearchButton>
        </HeaderArea>
        <LocationArea>
          <LocationInput />
          <LocationFinder>
            <MyLocationIcon width="24" height="24" fill="#fff" />
          </LocationFinder>
        </LocationArea>
      </Scroller>
    </Container>
  );
};
