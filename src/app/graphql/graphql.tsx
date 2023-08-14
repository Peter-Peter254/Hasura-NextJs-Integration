// graphqlApi.js

import axios from 'axios';

const queryConfig = {
  endpoint: 'https://muvhihkgovbodcwtonev.hasura.eu-central-1.nhost.run/v1/graphql',
  headers: {
    'x-hasura-admin-secret': '(+!AIbQYS:eP@P_X!@^KR)Sm,Kk_D-4&',
    // Other headers if needed
  },
};

export const fetchData = async (query:any) => {
  try {
    const response = await axios.post(queryConfig.endpoint, { query }, { headers: queryConfig.headers });
    return response.data.data;
  } catch (err) {
    throw new Error('An error occurred while fetching data.');
  }
};
