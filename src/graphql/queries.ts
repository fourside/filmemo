// tslint:disable
// eslint-disable
// this is an auto generated file. This will be overwritten

export const getStock = /* GraphQL */ `
  query GetStock($id: ID!) {
    getStock(id: $id) {
      id
      imdbID
      owner
    }
  }
`;
export const listStocks = /* GraphQL */ `
  query ListStocks(
    $filter: ModelStockFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStocks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        imdbID
        owner
      }
      nextToken
    }
  }
`;
export const stocksByImdbId = /* GraphQL */ `
  query StocksByImdbId(
    $imdbID: String
    $sortDirection: ModelSortDirection
    $filter: ModelStockFilterInput
    $limit: Int
    $nextToken: String
  ) {
    stocksByImdbID(
      imdbID: $imdbID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        imdbID
        owner
      }
      nextToken
    }
  }
`;
