import { Schedule, ScheduleDetail, SednableSchedule } from "@/lib/types";
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

export const updateSchedule = async (
    id: string,
    scheduleData: SednableSchedule[]
) => {
    try {
        const response = await axios.post(
            `${API_URL}/byteacher/${id}`,
            scheduleData
        );
        return response.data;
    } catch (error) {
        console.error(`Error updating schedule with id ${id}:`, error);
        throw error;
    }
};

export const getExcelByTeacherId = async (id: string, token: string | null) => {
  try {
    const response = await axios.get<ArrayBuffer>(`/api/excel/${id}`, {
      responseType: "arraybuffer",
      headers: { Authorization: `Bearer ${token}` },
    });

    // extraer filename del header Content-Disposition
        const cd = response.headers["content-disposition"];
        const getFilenameFromCD = (cdHeader: string | null | undefined): string | null => {
          if (!cdHeader) return null;
          // soporta filename*=UTF-8''... y filename="..."
          const fnStar = /filename\*=UTF-8''([^;]+)/i.exec(cdHeader);
          if (fnStar) return decodeURIComponent(fnStar[1]);
          const fn = /filename=\"?([^;\"]+)\"?/i.exec(cdHeader);
          if (fn) return fn[1];
          return null;
        };
        const filename = getFilenameFromCD(cd) || `horario-${id}.xlsx`;

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename; // usa el nombre del servidor o fallback
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(`Error downloading Excel for teacher with id ${id}:`, error);
    throw error;
  }
};
