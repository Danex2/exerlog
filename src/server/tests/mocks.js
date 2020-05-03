const mockedRequest = (body) => {
  return {
    body,
  };
};

const mockedResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.end = jest.fn().mockReturnValue(res);
  return res;
};

module.exports = {
  mockedRequest,
  mockedResponse,
};
