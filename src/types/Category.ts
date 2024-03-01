export interface Results {
  meta: Meta;
  links: Links;
  data: Category[];
}

export interface Result {
  meta: Meta;
  links: Links;
  data: Category;
}

export interface Category {
  id: string;
  name: string;
  deletedAt: null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  description: null | string;
}

export interface Links {
  prev: null;
  last: string;
  next: string;
  first: string;
}

export interface Meta {
  to: number;
  from: number;
  path: string;
  total: number;
  perPage: number;
  lastPage: number;
  currentPage: number;
}

export interface CategoryParams {
  page?: number;
  search?: string;
  perPage?: number;
  isActive?: boolean;
}
