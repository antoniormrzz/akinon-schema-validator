import { Payload } from '../types/payload';

export function chain(payload) {
  (...fns) => {
    fns.forEach(e => {
      e(payload);
    });
  };
}
