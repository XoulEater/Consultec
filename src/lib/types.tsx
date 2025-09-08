// Navigation item type for navbar
export type NavItemProps = {
    title: string;
    icon: string;
    href: string;
    children?: NavItemProps[];
};
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
    type: "consultation" | "class" | "telecommuting" | "extern";
    subject: string;
    name?: string;
    day: number;
    start: number;
    duration: number;
    disabled?: boolean;
    temp?: boolean;
    link?: string;
    location?: string;
    modality?: string;
};

export type ScheduleDetail = {
    _id: string;
    type: "consultation" | "class" | "telecommuting" | "extern";
    curso: string | null;
    horaInicio: string;
    horaFin: string;
    dia: number;
    enlace: string | null;
    lugar: string | null;
    modalidad: string | null;
    escuela: string | null;
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
    role: string;
    subject: string;
    email: string;
    office: string;
    location: string;
    officePhone: string;
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

export interface paginationResponse {
    teachers: TeachersTable[];
    pagination: {
        total_pages: number;
        actual_page: number;
    };
}
export interface TeachersTable {
    teacher: string;
    school: string;
    availability: number[];
    id: string;
    lastUpdate: Date;
}
