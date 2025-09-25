export interface Animal {
  id?: number | null;
  name: string;
  age: string;
  gender: string;
  species: string;
  breed: string;
  description: string;
  clinicalCondition: string;
  status: string;
  imageUrl?: string;
  entryDate?: Date | null;
  releaseDate?: Date | null;
  city: string;
  province: string;
  region: string;
  foundBy?: FoundBy | null;
  deathDate?: Date | null;
  deathCause?: string | null;
  adoptable?: boolean;
}

export interface NewAnimal extends FoundBy {
  name: string;
  age: string;
  gender: string;
  species: string;
  breed: string;
  description: string;
  clinicalCondition: string;
  status: string;
  imageUrl?: string;
  city: string;
  province: string;
  region: string;
}

export interface FoundBy {
  id?: number;
  userName: string;
  userSurname: string;
  userEmail: string;
  userPhoneNumber: string;
}

export interface FilterState {
  page: number;
  lastPage: boolean;
  size: number;
  sortBy: string;
  sortByDirection: string;
  gender: string;
  status: string;
  species: string;
  breed: string;
  province: string;
}

export interface AnimalState {
  data: { list: Animal[]; single: Animal | null };
  requestStatus: "succeeded" | "failed" | "pending";
  errorMessage: string;
  filters: FilterState;
}

export interface AllAnimalResponse {
  content: Animal[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
