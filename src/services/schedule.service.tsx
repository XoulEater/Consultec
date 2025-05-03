import axios from "axios";
import { ReadonlyURLSearchParams } from "next/navigation";

const API_URL = "/api/schedules/byteacher"; // Use relative path for proxy


export const getScheduleByTeacherId = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching teacher with id ${id}:`, error);
        throw error;
    }
};