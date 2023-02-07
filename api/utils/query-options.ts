import { Prisma } from '@prisma/client';

type QueryParams = {
  _start?: string;
  _end?: string;
  _sort?: string;
  _order?: 'ASC' | 'DESC';
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

const getEventsSortOptions = (params: QueryParams, defaultSort: string): any => {
  const { _sort, _order } = params;
  const relationProperties: string[] = ['theme', 'format'];

  if (!_sort || !_order) {
    return DEFAULT_SORT_OPTIONS(defaultSort);
  }

  if (relationProperties.includes(_sort)) {
    return {
      orderBy: {
        [_sort]: {
          name: _order.toLowerCase(),
        },
      },
    };
  }

  return getSortOptions(params, defaultSort);
};

type FilterAttributes = {
  id?: string | string[];
  companyId?: string | string[];
  formatId?: string | string[];
  themeId?: string | string[];
  q?: string;
};

const getEventsWhereOptions = (queryParams: FilterAttributes) => {
  const where: Prisma.EventWhereInput = {};
  const { id, companyId, themeId, formatId, q } = queryParams;

  if (id) {
    where.id = { in: convertQueryParamToNumArr(id) };
  }
  if (companyId) {
    where.companyId = Number(companyId);
  }
  if (formatId) {
    where.formatId = Number(formatId);
  }
  if (themeId) {
    where.themeId = Number(themeId);
  }
  if (q) {
    where.name = { contains: q };
  }

  return where;
};

const convertQueryParamToNumArr = (param: string | string[]): number[] => {
  return Array.isArray(param) ? param.map((item) => Number(item)) : [Number(param)];
};

export { getPageOptions, getSortOptions, getEventsSortOptions, getEventsWhereOptions };
