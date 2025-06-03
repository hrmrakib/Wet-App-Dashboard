import { create } from "domain";
import baseApi from "../api/baseAPI";

const authAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    viewAllItems: builder.query<any, any>({
      query: (id) => ({
        url: `/api-apps/ViewAllItems/?service_id=${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "GET",
      }),
    }),
  }),
});

export const { useViewAllItemsQuery } = authAPI;
