import { client } from "./client";

export const addOffenseCase = async (data: any) => {
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