import { api as index} from '..'

const api = index.injectEndpoints({
  endpoints: (builder ) => ({
    getForm: builder.query<TODO.GetResponse, TODO.GetRequest>({
      query: () => ({
        url: '',
        method: "GET",
      }),
      providesTags: ["crud"]
    }),
    postFrom: builder.mutation<TODO.PostResponse, TODO.PostRequest>({
      query: (newUser) => ({
        url: 'wedding_v1',
        method: "POST",
        body: newUser,
        headers: {
          Accept: "application/json, text/plain, */*",
          'Content-Type': "application/json"
        },
      }),
      invalidatesTags: ["crud"],
    }),
  }),
});

export const {useGetFormQuery, usePostFromMutation} = api