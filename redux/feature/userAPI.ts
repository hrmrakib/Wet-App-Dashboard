import baseApi from "../api/baseAPI";

const authAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<any, any>({
      query: () => ({
        url: "/api-auth/all_user_list/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "GET",
      }),
    }),

    getUserById: builder.query<any, string>({
      query: (id) => ({
        url: `/api-auth/single_user/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "GET",
      }),
    }),

    updateUserProfile: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/api-auth/single_user/${id}/`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserProfileMutation,
} = authAPI;
