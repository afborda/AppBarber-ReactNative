import React from 'react';
import { Text, Button } from 'react-native';
import { Container } from './styled';
import { useNavigation } from '@react-navigation/native';
import Api from '../../service/Api';

export default () => {
  const navigation = useNavigation();

  const handleLogoutClick = async () => {
    await Api.logout();
    navigation.reset({ routes: [{ name: 'SignIn' }] });
  };

  return (
    <Container>
      <Text>Profile dos guri </Text>
      <Button title="Sair" onPress={handleLogoutClick} />
    </Container>
  );
};
