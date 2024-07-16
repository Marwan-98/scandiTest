import { gql } from "graphql-request";

export const PRODUCTS_LIST = gql`
  query Query {
    products {
      id
      name
      prices {
        amount
        currency {
          label
          symbol
        }
      }
    }
  }
`;

export const CATEGORIES_LIST = gql`
  query Query {
    categories {
      id
      name
    }
  }
`;

export const PRODUCT_BY_CATEGORY = (id) => gql`
  query Query {
    products(categoryId: "${id}") {
      id
      name
      prices {
        amount
        currency {
          label
          symbol
        }
      }
    }
  }
`;
