import React, {useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage';
import {UserContext} from '../../contexts/UserContext';

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
import PerfilUser from '../../assets/person.svg';

export default () => {
  const {dispatch: userDispatch} = useContext(UserContext);
  const navigation = useNavigation();

  const [emailField, setEmailField] = useState('');
  const [nameField, setNameField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const handleMessageButtonClick = () => {
    navigation.reset({
      routes: [{name: 'SignIn'}],
    });
  };

  const resetInput = () => {
    setEmailField('');
    setNameField('');
    setPasswordField('');
  };

  const handleSignClick = async () => {
    if (nameField && emailField && passwordField) {
      let res = await Api.signUp(nameField, emailField, passwordField);

      console.log(res);

      if (res.token) {
        await AsyncStorage.setItem('token', res.token);
        userDispatch({
          type: 'setAvatar',
          payload: {
            avatar: res.data.avatar,
          },
        });
        navigation.reset({
          routes: [{name: 'MainTab'}],
        });
      } else {
        alert('Erro! ', res.error);
      }
      resetInput();
    } else {
      alert('Preencha os campos');
    }
  };

  return (
    <Container>
      <BarberLogo width="100%" height="160" />
      <InputArea>
        <SignInput
          IconSvg={PerfilUser}
          placeholder="Digite seu Nome"
          value={nameField}
          onChangeText={(t) => setNameField(t)}
        />

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
          value={passwordField}
          onChangeText={(t) => setPasswordField(t)}
        />
        <CustomButton onPress={handleSignClick}>
          <CustomButtonText>Cadastrar</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageButtonText>Já possue uma conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  );
};
