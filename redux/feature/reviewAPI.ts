import baseApi from "../api/baseAPI";

const reviewAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query<any, any>({
      query: () => ({
        url: "/api-apps/send_query/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "GET",
      }),
    }),
  }),
});

export const { useGetReviewsQuery } = reviewAPI;
