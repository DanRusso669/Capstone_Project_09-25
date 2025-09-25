import type { ProfileResponse } from "./User";

export interface ArticleState {
  data: { list: Article[]; single: Article | null };
  requestStatus: string;
  errorMessage: string;
  filters: Filter;
}

export interface Filter {
  page: number;
  size: number;
  sortBy: string;
  sortByDirection: string;
  lastPage: boolean;
}

export interface ArticleBody {
  title: string;
  content: string;
  articleImg: string;
}

export interface Article extends ArticleBody {
  id: number;
  publicationDate: Date;
  author: ProfileResponse;
}

export interface ArticleResponse {
  content: Article[];
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
  unpaged: boolean;
  paged: boolean;
}

export interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}
