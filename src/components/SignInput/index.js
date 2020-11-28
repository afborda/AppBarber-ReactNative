import React from 'react';

import {InputArea, Input} from './styled';

export default ({IconSvg, placeholder, password, value, onChangeText}) => {
  return (
    <InputArea>
      <IconSvg width="24" height="24" fill="#268596" />
      <Input
        placeholder={placeholder}
        secureTextEntry={password}
        value={value}
        onChangeText={onChangeText}
      />
    </InputArea>
  );
};
