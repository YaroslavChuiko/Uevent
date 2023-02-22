import { Prisma } from '@prisma/client';

type QueryParams = {
  _start?: string;
  _end?: string;
  _sort?: string;
  _order?: 'ASC' | 'DESC';
  q?: string;
};

const DEFAULT_PAGE_OPTIONS = {
  skip: 0,
  take: 10,
};

const DEFAULT_SORT_OPTIONS = (sort: string) => ({
  orderBy: {
    [sort]: Prisma.SortOrder.asc,
  },
});

const getPageOptions = (params: QueryParams) => {
  if (!params) {
    return DEFAULT_PAGE_OPTIONS;
  }
  const { _start, _end } = params;
  if (!_start || !_end) {
    return DEFAULT_PAGE_OPTIONS;
  }
  const skip = Number(_start);
  const take = Number(_end) - skip;

  return { skip, take };
};

const getSortOptions = (params: QueryParams, defaultSort: string) => {
  if (!params) {
    return DEFAULT_SORT_OPTIONS(defaultSort);
  }
  const { _sort, _order } = params;
  if (!_sort || !_order) {
    return DEFAULT_SORT_OPTIONS(defaultSort);
  }

  return {
    orderBy: {
      [_sort]: _order.toLowerCase(),
    },
  };
};

export { getPageOptions, getSortOptions, QueryParams, DEFAULT_SORT_OPTIONS };
