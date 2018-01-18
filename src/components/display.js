import React, { Component } from 'react';
import instantiateRegl from 'regl';
import { Map } from 'immutable';
import diff from 'immutablediff';
import { mat4 } from 'gl-matrix';
import data from '../data/geometry.json';
import lineGenerator from '../data/gridlines';
const gridlines = lineGenerator(500);

import bunny from 'bunny';


const DEFAULT_TRANSITION = 200;

let regl;

class Display extends Component {
  componentDidMount() {
    regl = instantiateRegl(this.node);
    this.startDraw();
    this.state = {transitions: Map({})};
  }

  componentWillReceiveProps(nextProps) {
    const propsDiff = diff(this.props.transforms, nextProps.transforms).toJS();
    const transitions = this.state.transitions;
    if (propsDiff.length && propsDiff[0].op === 'replace') {
      const updated = propsDiff[0].path.split('/')[1];
      this.setState({
        transitions: transitions.set(updated, {
          time: Date.now(),
          transform: this.props.transforms.get(parseInt(updated))
        })
      });
    }
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
        // position: data.position,
        position: bunny.positions,
      },

      // elements: data.elements,
      elements: bunny.cells,

      // primitive: 'lines',
      primitive: 'triangles',

      uniforms: {
        color: [1, 0, 0, 1],
        matrix: regl.prop('matrix'),
      }
    });

    const drawGrid = regl({
      frag: `
      precision mediump float;
      void main() {
        gl_FragColor = vec4(0.4);
      }
      `,
      vert: `
      precision mediump float;
      uniform mat4 matrix;
      attribute vec2 position;
      void main() {
        gl_Position = matrix * vec4(position, 0, 1);
      }
      `,
      attributes: {
        position: gridlines.position,
      },
      elements: gridlines.elements,
      primitive: 'lines',
      uniforms: {
        matrix: regl.prop('matrix'),
      }
    });

    regl.frame(() => {
      const now = Date.now();

      const relevantTransitions = this.state.transitions.filterNot((v, k) => v.time + DEFAULT_TRANSITION < now);

      const transforms = this.props.transforms.map((t, i) => {
        const strI = i.toString();
        if (relevantTransitions.has(strI)) {
          const start = relevantTransitions.get(strI);
          const n = (now - start.time) / DEFAULT_TRANSITION;
          return t.map((v, k) => {
            if (k === 'type' || k === 'forms') return v;
            const s = start.transform.get(k);
            return s + (v - s) * n;
          });
        }
        return t;
      });

      const mat = mat4.create();

      this.applyTransform({type: 'perspective', fovy: Math.PI / 4, aspect: 1, near: -1, far: 1}, mat);
      for (const transform of transforms.reverse().values()) this.applyTransform(transform.toJSON(), mat);

      regl.clear({
        color: [0, 0, 0, 1],
        depth: 1,
      });

      draw({
        matrix: mat,
      });
      drawGrid({
        matrix: mat,
      });

      if (relevantTransitions !== this.state.transitions) this.setState({transitions: relevantTransitions});
    });
  }

  applyTransform(transform, mat) {
    switch (transform.type) {
      case 'translate':
        return mat4.translate(mat, mat, [transform.x, transform.y, transform.z]);
      case 'rotate':
        return mat4.rotate(mat, mat, transform.angle, [transform.x, transform.y, transform.z]);
      case 'scale':
        return mat4.scale(mat, mat, [transform.x, transform.y, transform.z]);
      case 'perspective':
        return mat4.perspective(mat, transform.fovy, transform.aspect, transform.near, transform.far);
      case 'invert':    // currently disabled
        return mat4.invert(mat, mat);
      case 'multiplyScalar':
        return mat4.multiplyScalar(mat, mat, transform.s);
      case 'ortho':     // should disable
        return mat4.ortho(mat, transform.l, transform.r, transform.b, transform.t, transform.n, transform.f);
      default:
        break;
    }
  }

  render() {
    return (
      <div ref={_node => this.node = _node} className='display'></div>
    );
  }
}



export default Display;
