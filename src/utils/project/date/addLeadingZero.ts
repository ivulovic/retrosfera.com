const addLeadingZero = (str: string | number) => {
  return `00${str}`.slice(-2);
};

export default addLeadingZero;
