import React, {useContext} from 'react';
import {TabArea, TabItem, TabItemCenter, AvatarIcon} from './styled';

import HomeIcon from '../../assets/home.svg';
import SearchIcon from '../../assets/search.svg';
import TodayIcon from '../../assets/today.svg';
import FavoriteIcon from '../../assets/favorite.svg';
import AccountIcon from '../../assets/account.svg';

import {UserContext} from '../../contexts/UserContext';

export default ({state, navigation}) => {
  const {state: user} = useContext(UserContext);
  const gotTo = (pageName) => {
    navigation.navigate(pageName);
  };

  return (
    <TabArea>
      <TabItem onPress={() => gotTo('Home')}>
        <HomeIcon
          style={{opacity: state.index === 0 ? 1 : 0.6}}
          width="24"
          height="24"
          fill="#fff"
        />
      </TabItem>
      <TabItem onPress={() => gotTo('Search')}>
        <SearchIcon
          style={{opacity: state.index === 1 ? 1 : 0.6}}
          width="24"
          height="24"
          fill="#fff"
        />
      </TabItem>
      <TabItemCenter activeOpacity={1} onPress={() => gotTo('Appointments')}>
        <TodayIcon width="32" height="32" fill="#4EADBE" />
      </TabItemCenter>
      <TabItem onPress={() => gotTo('Favorites')}>
        <FavoriteIcon
          style={{opacity: state.index === 3 ? 1 : 0.6}}
          width="24"
          height="24"
          fill="#fff"
        />
      </TabItem>
      <TabItem onPress={() => gotTo('Profile')}>
        {user.avatar ? (
          <AvatarIcon source={{uri: user.avatar}} />
        ) : (
          <AccountIcon
            style={{opacity: state.index === 4 ? 1 : 0.6}}
            width="24"
            height="24"
            fill="#fff"
          />
        )}
      </TabItem>
    </TabArea>
  );
};
