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
    type: "consultation" | "class" | "telecommuting" | "other";
    subject: string;
    day: number;
    starth: number;
    startm: number;
    duration: number;
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
