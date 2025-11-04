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
    _id: string;
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

export type SednableSchedule = {
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

export const codeToName: Record<string, string> = {
    EM1600: "Tecnologías digitales aplicadas a la matemática educativa I",
    EM1606: "Fundamentos de matemática II",
    EM1607: "Didáctica de la geometría",
    EM1613: "Tecnologías digitales aplicadas a la matemática educativa III",
    EM1614: "Estadística inferencial",
    EM2408: "Aprendizaje y didáctica de la matemática",
    EM2603: "Cálculo y análisis I",
    EM2604: "Geometría I",
    EM2607: "Cálculo y análisis II",
    EM2608: "Elementos de análisis de datos y probabilidad",
    EM3048: "Atención a la diversidad en la enseñanza y el aprendizaje de la matemática",
    EM3409: "Práctica docente",
    EM3608: "Cálculo y análisis III",
    EM4010: "Programación lineal",
    EM4612: "Métodos numéricos",
    MA0101: "Matemática general",
    MA1102: "Cálculo diferencial e integral",
    MA1103: "Cálculo y álgebra lineal",
    MA1303: "Matemática básica para administración",
    MA1304: "Cálculo para administración",
    MA1403: "Matemática discreta",
    MA2104: "Cálculo superior",
    MA2105: "Ecuaciones diferenciales",
    MA2117: "Cálculo y geometría analítica",
    MA2404: "Probabilidades",
    MA3106: "Métodos numéricos",
    MA3405: "Estadística",
};


