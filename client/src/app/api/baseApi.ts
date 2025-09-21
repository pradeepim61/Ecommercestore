import { fetchBaseQuery, type BaseQueryApi, type FetchArgs } from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../layout/uiSlice";
import { toast } from "react-toastify";
import { router } from "../routes/Routes";

const customBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
});

type ErrorResponse = | string | { title: string } | { errors: string[] };

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

export const baseQueryWithErrorHandling = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    api.dispatch(startLoading());
     if(import.meta.env.DEV) await sleep(); // Simulate network delay
    const result = await customBaseQuery(args, api, extraOptions);

    api.dispatch(stopLoading());


    if (result.error) {
        // Handle error here, e.g., log it or show a notification
        console.log('API Error:', result.error);
    
        const originalStatus = result.error.status === 'PARSING_ERROR' && result.error.originalStatus ?
            result.error.originalStatus : result.error.status;

        const reponseData = result.error.data as ErrorResponse;
        toast.error(reponseData as string);

        switch (originalStatus) {
            case 400:
                if(typeof reponseData === 'string') toast.error(reponseData);
                else if('errors' in reponseData) {
                    throw Object.values(reponseData.errors).flat().join(', ');
                    toast.error('validation error');
                }
                else toast.error(reponseData.title);
                break;
            case 401:
                  // Clear user data on unauthorized
                //api.dispatch(accountApi.util.updateQueryData('userInfo', undefined, () => undefined));
                if (typeof reponseData === 'object' && 'title' in reponseData)
                    toast.error(reponseData.title);
                else toast.error('unauthorized');
                break;
            case 404:
                if (typeof reponseData === 'object' && 'title' in reponseData)
                    toast.error(reponseData.title);
                else router.navigate('/not-found');
                break;
            case 500:
                if (typeof reponseData === 'object')
                    router.navigate('/server-error', { state: { error: reponseData } });
                break;       
            default:
                break;

        }
        return result;
    }
    return result;
}