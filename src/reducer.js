import { List, Map, fromJS } from 'immutable';
import transforms from './data/init.json';

const TransformConfig = fromJS(require('./data/transform_config.json'));

const initialState = Map({
  transforms: fromJS(transforms),
});

export default function reducer(rootState = initialState, action) {
  switch (action.type) {
    case 'ADD_TRANSFORM':
      return rootState
        .updateIn(
          ['transforms'],
          list => list.push(TransformConfig.get(action.payload)),
        );
    case 'MUTATE_TRANSFORM':
      return rootState
        .setIn(
          ['transforms'].concat(action.payload.which),
          action.payload.value,
        );
    case 'REORDER':
      return rootState
        .set('transforms', List(action.payload));
    case 'RESET':
      return rootState
        .set('transforms', fromJS(transforms));
    default:
      return rootState;
  }
}

