const logIf = (condition: boolean, message: () => string): void => {
  if (condition) {
    console.log(message());
  }
};

export default logIf;
