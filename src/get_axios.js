const axios = require('axios');

let axiosSingleton = axios;

const setAxiosToken = (token) => {
  console.log('Setting Axios to Use: ', token);

  axiosSingleton = axios.create({
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
}

const getAxios = () => {
  return axiosSingleton;
};

module.exports = {
  setAxiosToken,
  getAxios,
};
