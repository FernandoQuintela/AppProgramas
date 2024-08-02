// src/services/shopServices.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../database/realtimeDataBase";

export const shopApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `categories.json`,
    }),
    getProductsByCategory: builder.query({
      query: () => `products.json`,
      transformResponse: (res) => Object.values(res),
    }),
    getProductById: builder.query({
      query: (productId) => `products/${productId}.json`,
      transformResponse: (res) => {
        return res;
      },
    }),
  }),
});

export const { useGetCategoriesQuery, useGetProductsByCategoryQuery, useGetProductByIdQuery } = shopApi;
