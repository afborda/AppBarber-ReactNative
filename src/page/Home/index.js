import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Platform} from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
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
  const [locationText, setLocationText] = useState('');
  const [coords, setCoords] = useState(null);
  const navigation = useNavigation();

  const handleLocationFinder = async () => {
    setCoords(null);
    let result = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );

    if (result === 'granted') {
      Geolocation.getCurrentPosition((info) => {
        console.log(info);
      });
    }
  };

  return (
    <Container>
      <Scroller>
        <HeaderArea>
          <HeaderTitle numberOfLines={2}>
            Encontre o seu Barbeiro Favorito
          </HeaderTitle>
          <SearchButton onPress={() => navigation.navigate('Search')}>
            <SearchIcon width="26" height="26" fill="#fff" />
          </SearchButton>
        </HeaderArea>
        <LocationArea>
          <LocationInput
            placeholder="Onde você esta?"
            placeholderTextColor="#FFF"
            value={locationText}
            onChangeText={(t) => setLocationText(t)}
          />
          <LocationFinder onPress={handleLocationFinder}>
            <MyLocationIcon width="24" height="24" fill="#fff" />
          </LocationFinder>
        </LocationArea>
      </Scroller>
    </Container>
  );
};
