import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Platform, RefreshControl } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';
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
  ListLoading,
  ListArea,
} from './styled';

import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';
import BarberItem from '../../components/BarberItem';

import Api from '../../service/Api';

export default () => {
  const [locationText, setLocationText] = useState('');
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const getBarBers = async () => {
    try {
      setLoading(true);
      setList([]);

      let lat = null;
      let lng = null;

      if (coords) {
        lat = coords.latitude;
        lng = coords.longitude;
      }

      const res = await Api.getBarbers(lat, lng, locationText);

      if (res) {
        setList(res.data);
        setLocationText(res.loc);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLocationFinder = async () => {
    setCoords(null);

    const result = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );

    if (result === 'granted') {
      Geolocation.getCurrentPosition((info) => {
        setLoading(true);
        setLocationText('');
        setList([]);
        setCoords(info.coords);
        getBarBers();
      });
    }
  };

  useEffect(() => {
    getBarBers();
  }, []);

  const onRefresh = () => {
    setRefreshing(false);
    getBarBers();
  };

  const handleLocationSearch = () => {
    setCoords({});
    getBarBers();
  };

  return (
    <Container>
      <Scroller
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
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
            onEndEditing={handleLocationSearch}
          />
          <LocationFinder onPress={handleLocationFinder}>
            <MyLocationIcon width="24" height="24" fill="#fff" />
          </LocationFinder>
        </LocationArea>
        {loading && <ListLoading size="large" color="#fff" />}
        <ListArea>
          {list.map((item, k) => (
            <BarberItem key={k} data={item} />
          ))}
        </ListArea>
      </Scroller>
    </Container>
  );
};
