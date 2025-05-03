import { Teacher, TeachersTable } from "@/lib/types";
import axios from "axios";
import { ReadonlyURLSearchParams } from "next/navigation";

const API_URL = "/api/teachers"; // Use relative path for proxy

export const getTeachers = async (params: string): Promise<TeachersTable[]> => {
    try {
        const response = await axios.get<TeachersTable[]>(`${API_URL}/filter`, {
            params: Object.fromEntries(new URLSearchParams(params)),
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching teachers:", error);
        throw error;
    }
};

export const getTeacherById = async (id: string) => {
    try {
        const response = await axios.get<Teacher>(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching teacher with id ${id}:`, error);
        throw error;
    }
};

export const createTeacher = async (teacherData: any) => {
    try {
        const response = await axios.post(API_URL, teacherData);
        return response.data;
    } catch (error) {
        console.error("Error creating teacher:", error);
        throw error;
    }
};

export const updateTeacher = async (id: string, teacherData: any) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, teacherData);
        return response.data;
    } catch (error) {
        console.error(`Error updating teacher with id ${id}:`, error);
        throw error;
    }
};

export const deleteTeacher = async (id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting teacher with id ${id}:`, error);
        throw error;
    }
};
