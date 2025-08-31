import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import type { Address, User } from "../../app/models/user";
import type { LoginSchema } from "../../lib/schemas/loginSchema";
import { router } from "../../app/routes/Routes";
import { toast } from "react-toastify";

export const accountApi = createApi({
    reducerPath: 'accountApi',
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ['UserInfo'],
    endpoints: (builder) => ({
        login: builder.mutation<void, LoginSchema>({
            query: (creds) => {
                return {
                    url: 'login?useCookies=true',
                    method: 'POST',
                    body: creds
                }
            },
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(accountApi.util.invalidateTags(['UserInfo']))
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        register: builder.mutation<void, object>({
            query: (creds) => {
                return {
                    url: 'account/register',
                    method: 'POST',
                    body: creds
                }
            },
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                    toast.success('Registration is successful - you can now sign in!')
                    router.navigate('/login');
                } catch (error) {
                    console.log(error);
                    throw error;
                }
            }
        }),
        userInfo: builder.query<User, void>({
            query: () => 'account/user-info',
            providesTags: ['UserInfo']
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'account/logout',
                method: 'POST'
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                // Optimistically update the cache
                // const patchResult = dispatch(
                //     accountApi.util.updateQueryData('userInfo', undefined, () => undefined)
                // );
                try {
                    await queryFulfilled;
                    dispatch(accountApi.util.invalidateTags(['UserInfo']))
                    router.navigate('/catalog');
                } catch (error) {
                    console.log(error);
                    //patchResult.undo();
                }
            }
        }),
        fetchAdress: builder.query<Address, void>({
            query: () => ({
                url: 'account/address'
            })
        }),
        updateAddress: builder.mutation<Address, Address>({
            query: (address) => ({
                url: 'account/address',
                method: 'POST',
                body: address
            }),
            async onQueryStarted(address, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    accountApi.util.updateQueryData('fetchAdress', undefined, (draft) => {
                        Object.assign(draft, { ...address });
                    })
                );

                try {
                    await queryFulfilled;
                } catch (error) {
                    patchResult.undo();
                    console.log(error);
                }
            }
        })
    })
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useUserInfoQuery, useLazyUserInfoQuery, useFetchAdressQuery, useUpdateAddressMutation } = accountApi;