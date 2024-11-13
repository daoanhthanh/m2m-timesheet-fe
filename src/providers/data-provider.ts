import {
  BaseRecord,
  type CrudFilters,
  CustomParams,
  CustomResponse,
  DataProvider,
} from "@refinedev/core";
import { API_URL } from "@/providers/endpoints";
import { generateSort, mapOperator } from "@refinedev/simple-rest";
import { stringify } from "query-string";
import { httpClient } from "@/providers/http/request";
import { joinHostAndApi } from "@/providers/utils";

const generateFilter = (filters?: CrudFilters) => {
  const queryFilters: { [key: string]: string } = {};

  if (filters) {
    filters.map((filter) => {
      if (filter.operator === "or" || filter.operator === "and") {
        throw new Error(
          `[@refinedev/simple-rest]: \`operator: ${filter.operator}\` is not supported. You can create custom data provider. https://refine.dev/docs/api-reference/core/providers/data-provider/#creating-a-data-provider`,
        );
      }

      if ("field" in filter) {
        const { field, operator, value } = filter;

        if (field === "q") {
          queryFilters[field] = value;
          return;
        }

        const mappedOperator = mapOperator(operator);

        queryFilters[`${field}${mappedOperator}`] = value;
      }
    });
  }

  return queryFilters;
};

const dataProvider: DataProvider = {
  // required methods
  getList: async ({ resource, pagination, sorters, filters, meta }) => {
    const url = `${API_URL}/${resource}`;

    const { current = 1, pageSize = 10, mode = "server" } = pagination ?? {};

    const { headers: headersFromMeta } = meta ?? {};

    const queryFilters = generateFilter(filters);

    const query: {
      _page?: number;
      _pageSize?: number;
      _sort?: string;
      _order?: string;
    } = {};

    if (mode === "server") {
      query._page = current;
      query._pageSize = pageSize;
    }

    const generatedSort = generateSort(sorters);
    if (generatedSort) {
      const { _sort, _order } = generatedSort;
      query._sort = _sort.join(",");
      query._order = _order.join(",");
    }

    const combinedQuery = { ...query, ...queryFilters };
    const urlWithQuery = Object.keys(combinedQuery).length
      ? `${url}?${stringify(combinedQuery)}`
      : url;

    const response = await httpClient.get<any>(urlWithQuery, {
      headers: headersFromMeta,
    });

    return response.data();
  },

  create: async ({ resource, variables, meta }) => {
    const url = `${API_URL}/${resource}`;

    const { headers } = meta ?? {};

    const response = await httpClient.post<unknown, any>(url, variables, {
      headers,
    });

    return response.data();
  },

  update: async ({ resource, id, variables, meta }) => {
    const url = `${API_URL}/${resource}/${id}`;

    const { headers } = meta ?? {};

    const response = await httpClient.put<unknown, any>(url, variables, {
      headers,
    });

    return response.data();
  },

  deleteOne: async ({ resource, id, meta }) => {
    const url = `${API_URL}/${resource}/${id}`;

    const { headers } = meta ?? {};

    const { data } = await httpClient.delete<any>(url, {
      headers,
    });

    return data();
  },

  getOne: async ({ resource, id, meta }) => {
    const url = `${API_URL}/${resource}/${id}`;
    const { headers } = meta ?? {};

    const { data } = await httpClient.get<any>(url, {
      headers,
    });

    return data();
  },
  getApiUrl: () => API_URL,

  // optional methods
  // getMany: ({ resource, ids, meta }) => Promise,
  // createMany: ({ resource, variables, meta }) => Promise,
  // deleteMany: ({ resource, ids, variables, meta }) => Promise,
  // updateMany: ({ resource, ids, variables, meta }) => Promise,
  custom: async <
    TData extends BaseRecord = BaseRecord,
    TQuery = unknown,
    TPayload = unknown,
  >({
    meta,
    method,
    url,
    query,
    payload,
    filters,
    sorters,
    headers,
  }: CustomParams<TQuery, TPayload>): Promise<CustomResponse<TData>> => {
    const queryFilters = generateFilter(filters);
    // const generatedSort = generateSort(sorters);
    const combinedQuery = { ...query, ...queryFilters };

    const api = joinHostAndApi(API_URL, url);

    const urlWithQuery = Object.keys(combinedQuery).length
      ? `${api}?${stringify(combinedQuery)}`
      : api;

    const response = await fetch(urlWithQuery, {
      method,
      credentials: "include",
      body: payload as BodyInit | null,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: TData = await response.json();
    return { data };
  },
};

export default dataProvider;
