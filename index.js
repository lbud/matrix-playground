// use strict;

const regl = require('regl')();
const { mat4 } = require('gl-matrix');

const draw = regl({
  frag: `
  precision mediump float;
  uniform vec4 color;
  varying vec3 pos;
  void main () {
    // gl_FragColor = color;
    gl_FragColor = vec4(pos / 4.0 + 0.75, 1.0);
  }`,

  vert: `
  precision mediump float;
  attribute vec3 position;
  uniform mat4 matrix;
  varying vec3 pos;
  void main () {
    gl_Position = matrix * vec4(position, 1);
    pos = position.xyz;
  }`,

  attributes: {
    position: [
      [-1, -1, -1],
      [-1, 0, -1],
      [-1, 1, -1],
      [0, -1, -1],
      [0, 0, -1],
      [0, 1, -1],
      [1, -1, -1],
      [1, 0, -1],
      [1, 1, -1],
      [-1, -1, 0],
      [-1, 0, 0],
      [-1, 1, 0],
      [0, -1, 0],
      [0, 0, 0],
      [0, 1, 0],
      [1, -1, 0],
      [1, 0, 0],
      [1, 1, 0],
      [-1, -1, 1],
      [-1, 0, 1],
      [-1, 1, 1],
      [0, -1, 1],
      [0, 0, 1],
      [0, 1, 1],
      [1, -1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ],
  },

  elements: [
    [0, 1],
    [1, 2],
    [3, 4],
    [4, 5],
    [6, 7],
    [7, 8],
    [0, 3],
    [1, 4],
    [2, 5],
    [3, 6],
    [4, 7],
    [5, 8],

    [9, 10],
    [10, 11],
    [12, 13],
    [13, 14],
    [15, 16],
    [16, 17],
    [9, 12],
    [10, 13],
    [11, 14],
    [12, 15],
    [13, 16],
    [14, 17],

    [18, 19],
    [19, 20],
    [21, 22],
    [22, 23],
    [24, 25],
    [25, 26],
    [18, 21],
    [19, 22],
    [20, 23],
    [21, 24],
    [22, 25],
    [23, 26],

    [0, 9],
    [1, 10],
    [2, 11],
    [3, 12],
    [4, 13],
    [5, 14],
    [6, 15],
    [7, 16],
    [8, 17],

    [9, 18],
    [10, 19],
    [11, 20],
    [12, 21],
    [13, 22],
    [14, 23],
    [15, 24],
    [16, 25],
    [17, 26],
  ],

  primitive: 'lines',

  uniforms: {
    color: [1, 0, 0, 1],
    matrix: regl.prop('matrix'),
  },
});

function getValue(id) {
  return document.getElementById(id).value || 0;
}

regl.frame(() => {
  const mat = mat4.create();

  const persp = mat4.create();
  mat4.perspective(persp, Math.PI / 4, 1, -1, 1);
  mat4.multiply(mat, mat, persp);

  mat4.translate(mat, mat, [
    getValue('translateX'),
    getValue('translateY'),
    getValue('translateZ'),
  ]);

  mat4.rotate(
    mat, mat,
    getValue('rotateAngle'), [
      getValue('rotateX'),
      getValue('rotateY'),
      getValue('rotateZ'),
    ],
  );

  regl.clear({
    color: [0, 0, 0, 1],
    depth: 1,
  });

  draw({
    matrix: mat,
  });
});
