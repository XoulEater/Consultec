export type School = {
    id: number;
    name: string;
    cathedras: Cathedra[];
};
export type Cathedra = {
    id: number;
    name: string;
};

export type Schedule = {
    id: string;

    type: "consultation" | "class" | "telecommuting" | "other";
    subject: string;
    day: number;
    starth: number;
    startm: number;
    duration: number;
};

export type ScheduleDetail = {
    _id: string;
    type: "consultation" | "class" | "telecommuting" | "other";
    curso: string;
    horaInicio: string;
    horaFin: string;
    dia: number;
    enlaceLugar: string | null;
    place: string | null;
    modalidad: string;
    escuela: string;
};

export class FilterList {
    filters: FilterType[] = [];
    constructor() {}
    setFilters(filters: FilterType[]) {
        this.filters = filters;
    }

    addFilter(filter: FilterType) {
        if (!this.filters.some((f) => f.name === filter.name)) {
            this.filters.push(filter);
        }
    }

    removeFilter(index: number) {
        this.filters.splice(index, 1);
        return this.filters;
    }

    getFilters() {
        return this.filters;
    }

    getURL() {
        const urlParams = new URLSearchParams();
        this.filters.forEach((filter) => {
            urlParams.append(filter.name, filter.value);
        });
        return urlParams.toString();
    }
}

export type FilterType = {
    name: string;
    value: string;
    label: string;
};

export interface Teacher {
    _id: string;
    name: string;
    school: string;
    campus: string;
    cathedra: string;
    oficina: string;
    correo: string;
    telefono: string;
    userID: string;
    type: Type;
}

export enum Type {
    Profesor = "profesor",
    Tutor = "tutor",
}

export interface TeachersTable {
    teacher: string;
    school: string;
    availability: number[];
    id: string;
    lastUpdate: Date;
}
