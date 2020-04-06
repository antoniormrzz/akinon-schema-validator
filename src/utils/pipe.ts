const pipe = (f, g) => (...args) => g(f(...args));
function reduce(...fns) {
  return fns.reduce(pipe);
}

export default reduce;
