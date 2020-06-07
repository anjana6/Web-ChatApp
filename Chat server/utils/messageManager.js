const createMessage = (sender, text) => {
  const msg = {
    message: text,
    sender: sender,
  };
  return msg;
};

module.exports = {createMessage}