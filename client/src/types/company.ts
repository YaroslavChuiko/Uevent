export type Company = {
  id: number;
  name: string;
  email: string;
  picturePath: string;
  latitude: number;
  longitude: number;
  userId: number;
};

export type CompaniesResponse = {
  companies: Company[];
  totalCount: number;
};

export type CompaniesParam = {
  _start: number;
  _end: number;
  _sort?: string;
  _order?: 'ASC' | 'DESC';
  id?: number;
  creatorId?: number;
  subscriberId?: number;
  q?: string;
};
