import { Payload } from '../types/payload';

export function chain(...fns) {
  fns.forEach((e) => {
    e();
  });
  return true;
}
