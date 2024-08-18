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

export const PRODUCT_DETAILS = gql`
  query Query($productId: String!) {
    product(id: $productId) {
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

export const CATEGORY_BY_ID = gql`
  query Query($categoryName: String!) {
    category(categoryName: $categoryName) {
      id
      name
    }
  }
`;

export const PRODUCT_BY_CATEGORY = gql`
  query Query($categoryName: String!) {
    products(categoryName: $categoryName) {
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
  mutation Mutation($order: Order!) {
    createOrder(cartData: $order)
  }
`;
