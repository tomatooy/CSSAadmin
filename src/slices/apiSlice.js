import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
const url = import.meta.env.VITE_REACT_APP_SERVER_URL;
const baseQuery = fetchBaseQuery({ baseUrl: url });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});
