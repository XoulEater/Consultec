import { Schedule, ScheduleDetail } from "@/lib/types";
import axios from "axios";
import { ReadonlyURLSearchParams } from "next/navigation";

const API_URL = "/api/schedules"; // Use relative path for proxy

export const getScheduleByTeacherId = async (id: string) => {
    try {
        const response = await axios.get<Schedule[]>(
            `${API_URL}/byteacher/${id}`
        );
        return response.data;
    } catch (error) {
        console.error(`Error fetching teacher with id ${id}:`, error);
        throw error;
    }
};

export const getScheduleById = async (id: string) => {
    try {
        const response = await axios.get<ScheduleDetail>(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching schedule with id ${id}:`, error);
        throw error;
    }
};
