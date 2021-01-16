import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import { UserContext } from '../../contexts/UserContext';

import {
  Container,
  InputArea,
  SignMessageButton,
  CustomButton,
  CustomButtonText,
  SignMessageButtonText,
  SignMessageButtonTextBold,
} from './styles';

import Api from '../../service/Api';

import SignInput from '../../components/SignInput';

import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {
  const { dispatch: userDispatch } = useContext(UserContext);
  const navigation = useNavigation();

  const [emailField, setEmailField] = useState('');
  const [passwordFild, setPasswordFild] = useState('');

  const handleMessageButtonClick = () => {
    navigation.reset({
      routes: [{ name: 'SignUp' }],
    });
  };

  const handleSignClick = async () => {
    if (emailField && passwordFild) {
      let json = await Api.signIn(emailField, passwordFild);

      if (json.token) {
        await AsyncStorage.setItem('token', json.token);
        userDispatch({
          type: 'setAvatar',
          payload: {
            avatar: json.data.avatar,
          },
        });
        navigation.reset({
          routes: [{ name: 'MainTab' }],
        });
      } else {
        alert('Email ou senha errados!');
      }
    } else {
      alert('Preencha os campos!');
    }
  };

  return (
    <Container>
      <BarberLogo width="100%" height="160" />
      <InputArea>
        <SignInput
          IconSvg={EmailIcon}
          placeholder="Digite seu e-mail"
          value={emailField}
          onChangeText={(t) => setEmailField(t)}
        />
        <SignInput
          IconSvg={LockIcon}
          placeholder="Digite sua senha"
          password={true}
          value={passwordFild}
          onChangeText={(t) => setPasswordFild(t)}
        />
        <CustomButton onPress={handleSignClick}>
          <CustomButtonText>Login</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageButtonText>
          Ainda não possui uma conta?
        </SignMessageButtonText>
        <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  );
};
