import { Schedule, ScheduleDetail } from "@/lib/types";
import axios from "axios";

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

export const getExcelByTeacherId = async (id: string) => {
    try {
        const response = await axios.get<ArrayBuffer>(
            `/api/schedule-excel/${id}`,
            {
                responseType: "arraybuffer",
            }
        );
        const blob = new Blob([response.data], {
            type: "application/vnd.ms-excel",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `horario-${id}.xlsx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error(
            `Error downloading Excel for teacher with id ${id}:`,
            error
        );
        throw error;
    }
};
