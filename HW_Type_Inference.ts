enum GridFilterTypeEnum {
    MATCH,
    RANGE,
    VALUE_SET
}

type GridFilterMatch<T> = {
    type: GridFilterTypeEnum.MATCH;
    filter: Extract<T, string | number>;
};

type GridFilterRange<T> = {
    type: GridFilterTypeEnum.RANGE;
    filter: Extract<T, string | number>;
    filterTo: Extract<T, string | number>;
};

type GridFilterValueSet<T> = {
    type: GridFilterTypeEnum.VALUE_SET;
    values: T[];
};

type GridFilterValue<T> = GridFilterMatch<T> | GridFilterRange<T> | GridFilterValueSet<T>;

interface Movie {
    title: string;
    releaseYear: number;
    rating: number;
    awards: string[];
}

class MovieList {
    private movies: Movie[];
    private filters: {
        title: GridFilterValue<string>[];
        releaseYear: GridFilterValue<number>[];
        rating: GridFilterValue<number>[];
        awards: GridFilterValue<string>[];
    };

    constructor(movies: Movie[]) {
        this.movies = movies;
        this.filters = {
            title: [],
            releaseYear: [],
            rating: [],
            awards: []
        };
    }

    applySearchValue<K extends keyof Movie>(field: K, value: Movie[K]): void {
        this.filters[field] = [{ type: GridFilterTypeEnum.MATCH, filter: value as any }];
    }

    applyFiltersValue<K extends keyof Movie>(field: K, filter: GridFilterValue<Movie[K]>): void {
        this.filters[field].push(filter as any);
    }

    getFilters(): typeof this.filters {
        return this.filters;
    }
}

// Друга сутність - список категорій
interface Category {
    name: string;
    movies: Movie[];
}

class CategoryList {
    private categories: Category[];
    private filters: {
        name: GridFilterValue<string>[];
    };

    constructor(categories: Category[]) {
        this.categories = categories;
        this.filters = {
            name: []
        };
    }

    applySearchValue(value: string): void {
        this.filters.name = [{ type: GridFilterTypeEnum.MATCH, filter: value }];
    }

    applyFiltersValue(filter: GridFilterValue<string>): void {
        this.filters.name.push(filter);
    }

    getFilters(): typeof this.filters {
        return this.filters;
    }
}