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

export const PRODUCT_DETAILS = (id) => gql`
  query Query {
    product(id: "${id}") {
      id
      name
      gallery
      inStock
      description
      attributes {
        id
        name
        items {
          id
          displayValue
          value
        }
        type
      }
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

export const CATEGORY_BY_ID = (id) => gql`
  query Query {
    category(id: "${id}") {
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
      inStock
      attributes {
        id
        name
        items {
          id
          displayValue
          value
        }
        type
      }
      gallery(first: 1)
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

export const PLACE_ORDER = gql`
  mutation Mutation($input: Order!) {
    createOrder(cartData: $input)
  }
`;
