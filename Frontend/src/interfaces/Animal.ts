export interface Animal {
  id: number | null;
  name: string;
  age: number | null;
  gender: string;
  species: string;
  breed: string;
  description: string;
  clinicalCondition: string;
  status: string;
  imageUrl: string;
  entryDate: Date | null;
  releaseDate: Date | null;
  city: string;
  province: string;
  region: string;
  foundBy: FoundBy | null;
  deathDate: Date | null;
  deathCause: string | null;
  adoptable: boolean;
}

export interface FoundBy {
  id: number;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
}

export interface AnimalState {
  data: Animal[];
  status: "succeeded" | "failed" | "pending";
  errorMessage: string;
  page: number;
  size: number;
  sortBy: string;
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
