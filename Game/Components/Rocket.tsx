import React from 'react';
import { Image } from 'react-native';
import {array, object, string} from 'prop-types';
import Matter from 'matter-js';
import FastImage from 'react-native-fast-image';

const rocket = require('../Assets/rocket.png');

const Rocket = props => {
  const width = props.size[0];
  const height = props.size[1];
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;

  return (
    <FastImage
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: width - 10,
        height: height + 30,
      }}
      source={rocket}
      resizeMode={FastImage.resizeMode.stretch}
    />
  );
};

export default (world, pos, size) => {
  const initialRocket = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { isStatic: true },
  );

  Matter.World.add(world, [initialRocket]);

  return {
    body: initialRocket,
    size: [size.width, size.height],
    renderer: <Rocket />,
  };
};
