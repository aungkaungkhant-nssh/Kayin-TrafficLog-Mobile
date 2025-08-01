import { client } from "./client";

export const addOffenseCases = async (data: any) => {
    try {
        await client.post(`/offense-case`, {
            data
        });
        return { success: true }
    } catch (error) {
        console.log(error)
        return { success: false }
    }
}


export const getOffenseCases = async (startDate: string, endDate: string) => {
    try {
        const response = await client.get(`/offense-case?startDate=${startDate}&endDate=${endDate}`);

        const data = response.data;
        return { success: true, data }
    } catch (error) {
        console.log(error)
        return { success: false }
    }
}