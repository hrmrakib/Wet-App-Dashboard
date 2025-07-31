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

    viewSingleItem: builder.query<any, string>({
      query: (id) => ({
        url: `/api-apps/ViewSingleItem/?item_id=${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "GET",
      }),
    }),

    createItem: builder.mutation<any, any>({
      query: (data) => ({
        url: `/api-apps/AddNewItem/`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    updateItem: builder.mutation<any, any>({
      query: (data) => ({
        url: `/api-apps/UpdateItem/`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: data,
      }),
    }),

    deleteItem: builder.mutation<any, any>({
      query: (id) => ({
        url: `/api-apps/DeleteItem/?item_id=${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),
  }),
});

export const {
  useViewAllItemsQuery,
  useViewSingleItemQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = authAPI;
