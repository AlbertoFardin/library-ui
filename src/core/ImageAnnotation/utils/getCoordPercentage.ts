/* eslint-disable no-mixed-operators */
// mouse position over the annotation componente, in %
export default (event) => ({
  x: (event.nativeEvent.offsetX / event.currentTarget.offsetWidth) * 100,
  y: (event.nativeEvent.offsetY / event.currentTarget.offsetHeight) * 100,
});
