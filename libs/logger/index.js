module.exports = {
  log: (message = '', type = 'log') => {
    if (console[type]) {
      console[type](message);
    } else {
      console.log(message);
    }
  },
};
