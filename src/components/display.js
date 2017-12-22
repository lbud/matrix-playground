import React, { Component } from 'react';
import instantiateRegl from 'regl';
import { mat4 } from 'gl-matrix';
import data from '../data/geometry.json';

let regl;

class Display extends Component {
  componentDidMount() {
    regl = instantiateRegl(this.node);
    this.startDraw();
  }

  startDraw() {
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
        position: data.position,
      },

      elements: data.elements,

      primitive: 'lines',

      uniforms: {
        color: [1, 0, 0, 1],
        matrix: regl.prop('matrix'),
      }
    });

    regl.frame(() => {
      const {transforms} = this.props;
      const mat = mat4.create();

      this.applyTransform({type: 'perspective', fovy: Math.PI / 4, aspect: 1, near: -1, far: 1}, mat);

      for (const transform of transforms.values()) this.applyTransform(transform.toJSON(), mat);

      regl.clear({
        color: [0, 0, 0, 1],
        depth: 1,
      });

      draw({
        matrix: mat,
      });
    });
  }

  applyTransform(transform, mat) {
    switch (transform.type) {
      case 'translate':
        mat4.translate(mat, mat, [transform.x, transform.y, transform.z]);
        break;
      case 'rotate':
        mat4.rotate(mat, mat, transform.angle, [transform.x, transform.y, transform.z]);
        break;
      case 'scale':
        mat4.scale(mat, mat, [transform.x, transform.y, transform.z]);
        break;
      case 'perspective':
        mat4.perspective(mat, transform.fovy, transform.aspect, transform.near, transform.far);
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div ref={_node => this.node = _node} className='display'>
      </div>
    );
  }
}



export default Display;
