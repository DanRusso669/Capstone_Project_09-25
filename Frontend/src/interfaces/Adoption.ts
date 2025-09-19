import type { Animal } from "./Animal";
import type { ProfileResponse } from "./User";

export interface Adoption {
  id?: number | null;
  requestDate: Date | null;
  startDate?: Date | null;
  endDate?: Date | null;
  status: string;
  user: ProfileResponse | null;
  animal: Animal | null;
}

export interface Filter {
  page: number;
  size: number;
  sortBy: string;
  sortByDirection: string;
  lastPage: boolean;
  status: string;
}

export interface AdoptionState {
  data: { list: Adoption[]; single: Adoption | null };
  requestStatus: string;
  errorMessage: string;
  filters: Filter;
}

export interface AdoptionResponse {
  content: Adoption[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
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

export interface UpdateAdoptionBody {
  status: string;
  startDate?: Date;
}
