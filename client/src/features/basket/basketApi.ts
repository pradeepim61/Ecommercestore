import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { Item, type Basket } from "../../app/models/basket";
import type { Product } from "../../app/models/product";
import Cookies from "js-cookie";

function isBasketItem(product: Product | Item): product is Item {
    return (product as Item).productId !== undefined;
}

export const basketApi = createApi({
    reducerPath: 'basketApi',
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ['Basket'],
    endpoints: (builder) => ({
        fetchBasket: builder.query<Basket, void>({
            query: () => 'basket',
            providesTags: ['Basket']
        }),
        addBasketItem: builder.mutation<Basket, { product: Product | Item, quantity: number }>({
            query: ({ product, quantity }) => {
                const productId = isBasketItem(product) ? product.productId : product.id;

                return {
                    url: `basket?productId=${productId}&quantity=${quantity}`,
                    method: 'POST'
                }
            },
            // Optimistic updates with proper handling for empty baskets
            onQueryStarted: async ({ product, quantity }, { dispatch, queryFulfilled }) => {
                const patchresult = dispatch(
                    basketApi.util.updateQueryData('fetchBasket', undefined, (draftBasket) => {
                        const productId = isBasketItem(product) ? product.productId : product.id;

                        // Handle case where basket might be empty or undefined
                        if (!draftBasket || !draftBasket.items) {
                            // Create a new basket structure if it doesn't exist
                            const newBasket: Basket = {
                                basketId: '', // This will be set by the server response
                                items: [isBasketItem(product) ? product : { 
                                    ...product, 
                                    productId: product.id, 
                                    quantity 
                                }]
                            };
                            return newBasket;
                        }

                        const existingItem = draftBasket.items.find(item => item.productId === productId);
                        if (existingItem) {
                            existingItem.quantity += quantity;
                        } else {
                            draftBasket.items.push(isBasketItem(product) ? product : { 
                                ...product, 
                                productId: product.id, 
                                quantity 
                            });
                        }
                    })
                )
                try {
                    await queryFulfilled;
                    // Always invalidate to ensure sync with server
                    dispatch(basketApi.util.invalidateTags(['Basket']));
                }
                catch (error) {
                    console.error("Error adding item to basket:", error);
                    patchresult.undo();
                }
            }
        }),
        removeBasketItem: builder.mutation<Basket, { productId: number, quantity: number }>({
            query: ({ productId, quantity }) => ({
                url: `basket?productId=${productId}&quantity=${quantity}`,
                method: 'DELETE'
            }),
            onQueryStarted: async ({ productId, quantity }, { dispatch, queryFulfilled }) => {
                const patchresult = dispatch(
                    basketApi.util.updateQueryData('fetchBasket', undefined, (draftBasket) => {
                        // Handle case where basket might be empty
                        if (!draftBasket || !draftBasket.items) return;
                        
                        const itemIndex = draftBasket.items.findIndex(item => item.productId === productId);
                        if (itemIndex !== -1) {
                            const existingItem = draftBasket.items[itemIndex];
                            if (existingItem.quantity > quantity) {
                                existingItem.quantity -= quantity;
                            } else {
                                draftBasket.items.splice(itemIndex, 1);
                            }
                        }
                    })
                )
                try {
                    await queryFulfilled;
                    // Invalidate to ensure sync with server
                    dispatch(basketApi.util.invalidateTags(['Basket']));
                }
                catch (error) {
                    console.error("Error deleting item from basket:", error);
                    patchresult.undo();
                }
            }
        }),
        clearBasket: builder.mutation<void, void>({
            queryFn: () => ({ data: undefined }),
            onQueryStarted: async (_, { dispatch }) => {
                dispatch(basketApi.util.updateQueryData('fetchBasket', undefined, (draft) => {
                    if (draft) {
                        draft.items = [];
                        draft.basketId = '';
                    }
                }));
                Cookies.remove('basketId');
                
                // Invalidate the basket query to force refetch
                dispatch(basketApi.util.invalidateTags(['Basket']));
            }
        })
    })
});

export const { useFetchBasketQuery, useAddBasketItemMutation, useRemoveBasketItemMutation, useLazyFetchBasketQuery, useClearBasketMutation } = basketApi;