/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateStockInput = {
  id?: string | null,
  imdbID: string,
};

export type ModelStockConditionInput = {
  imdbID?: ModelStringInput | null,
  and?: Array< ModelStockConditionInput | null > | null,
  or?: Array< ModelStockConditionInput | null > | null,
  not?: ModelStockConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateStockInput = {
  id: string,
  imdbID?: string | null,
};

export type DeleteStockInput = {
  id?: string | null,
};

export type ModelStockFilterInput = {
  id?: ModelIDInput | null,
  imdbID?: ModelStringInput | null,
  and?: Array< ModelStockFilterInput | null > | null,
  or?: Array< ModelStockFilterInput | null > | null,
  not?: ModelStockFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type CreateStockMutationVariables = {
  input: CreateStockInput,
  condition?: ModelStockConditionInput | null,
};

export type CreateStockMutation = {
  createStock:  {
    __typename: "Stock",
    id: string,
    imdbID: string,
    owner: string | null,
  } | null,
};

export type UpdateStockMutationVariables = {
  input: UpdateStockInput,
  condition?: ModelStockConditionInput | null,
};

export type UpdateStockMutation = {
  updateStock:  {
    __typename: "Stock",
    id: string,
    imdbID: string,
    owner: string | null,
  } | null,
};

export type DeleteStockMutationVariables = {
  input: DeleteStockInput,
  condition?: ModelStockConditionInput | null,
};

export type DeleteStockMutation = {
  deleteStock:  {
    __typename: "Stock",
    id: string,
    imdbID: string,
    owner: string | null,
  } | null,
};

export type GetStockQueryVariables = {
  id: string,
};

export type GetStockQuery = {
  getStock:  {
    __typename: "Stock",
    id: string,
    imdbID: string,
    owner: string | null,
  } | null,
};

export type ListStocksQueryVariables = {
  filter?: ModelStockFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStocksQuery = {
  listStocks:  {
    __typename: "ModelStockConnection",
    items:  Array< {
      __typename: "Stock",
      id: string,
      imdbID: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type StocksByImdbIdQueryVariables = {
  imdbID?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelStockFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type StocksByImdbIdQuery = {
  stocksByImdbID:  {
    __typename: "ModelStockConnection",
    items:  Array< {
      __typename: "Stock",
      id: string,
      imdbID: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateStockSubscriptionVariables = {
  owner: string,
};

export type OnCreateStockSubscription = {
  onCreateStock:  {
    __typename: "Stock",
    id: string,
    imdbID: string,
    owner: string | null,
  } | null,
};

export type OnUpdateStockSubscriptionVariables = {
  owner: string,
};

export type OnUpdateStockSubscription = {
  onUpdateStock:  {
    __typename: "Stock",
    id: string,
    imdbID: string,
    owner: string | null,
  } | null,
};

export type OnDeleteStockSubscriptionVariables = {
  owner: string,
};

export type OnDeleteStockSubscription = {
  onDeleteStock:  {
    __typename: "Stock",
    id: string,
    imdbID: string,
    owner: string | null,
  } | null,
};
