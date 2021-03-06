import React from 'react';
import Matter from 'matter-js';
import FastImage from 'react-native-fast-image';

const chestnut = require('../Assets/каштан.png');

const Obstacle = (props: { size: any[], body: { position: { x: number, y: number } } }) => {
  const width = props.size[0];
  const height = props.size[1];
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;
  
  return (
    <FastImage
      style={[
        {
          position: 'absolute',
          left: x,
          top: y,
          width: width,
          height: height,
          borderRadius: 20,
        },
      ]}
      source={chestnut}
      resizeMode={FastImage.resizeMode.stretch}
    />
  );
};

export default (world: Matter.World, pos: { x: number, y: number }, size: { width: number, height: number }) => {
  const initialObstacle = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { isStatic: false, label: 'obstacle' },
  );

  Matter.World.add(world, [initialObstacle]);

  return {
    body: initialObstacle,
    size: [size.width, size.height],
    scored: false,
    // @ts-ignore
    renderer: <Obstacle />,
  };
};
