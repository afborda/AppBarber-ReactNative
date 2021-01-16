import React from 'react';

import styled from 'styled-components';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

export const Scroller = styled.ScrollView`
  flex: 1;
`;

export const SwipeDot = styled.View`
  width: 10px;
  height: 10px;
  background-color: #fff;
  border-radius: 5px;
  margin: 3px;
`;

export const SwipeDotActive = styled.View`
  width: 10px;
  height: 10px;
  background-color: #000;
  border-radius: 5px;
  margin: 3px;
`;

export const SwipeItem = styled.View`
  flex: 1;
  background-color: #63c2d1;
`;

export const SwipeImage = styled.Image`
  width: 100%;
  height: 240px;
`;

export const FakeSwiper = styled.View`
  height: 30px;
  background-color: aliceblue;
`;

export const PageBody = styled.View`
  height: 30px;
  background-color: aqua;
`;

export const UserInfoArea = styled.View`
  height: 30px;
  background-color: aquamarine;
`;

export const ServiceArea = styled.View`
  height: 30px;
  background-color: antiquewhite;
`;

export const TestimonialArea = styled.View`
  height: 30px;
  background-color: blueviolet;
`;
