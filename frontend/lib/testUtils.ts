import casual from "casual";
import { PAGINATION_QUERY } from "../components/Pagination";

// seed it so we get consistent results
casual.seed(777);

const fakeItem = () => ({
  __typename: "Item",
  id: "abc123",
  price: 5000,
  user: null,
  photo: {
    __typename: "Photo",
    id: "abc123",
    altText: "dogs are best",
    image: {
      __typename: "Image",
      publicUrlTransformed: "dog.jpg",
    },
  },
  name: "dogs are best",
  description: "dogs",
});

const fakeUser = (overrides?: Object) => ({
  __typename: "User",
  id: "4234",
  name: casual.name,
  email: casual.email,
  permissions: ["ADMIN"],
  orders: [],
  cart: [],
  role: {
    canManageCart: true,
    canManageUsers: true,
    canManageProducts: true,
  },
  ...overrides,
});

const fakeOrderItem = () => ({
  __typename: "OrderItem",
  id: casual.uuid,
  image: {
    image: `${casual.word}.jpg`,
  },
  name: casual.words(),
  price: 4234,
  quantity: 1,
  description: casual.words(),
});

const fakeOrder = () => ({
  __typename: "Order",
  id: "ord123",
  charge: "ch_123",
  total: 40000,
  items: [fakeOrderItem(), fakeOrderItem()],
  createdAt: "2022-12-11T20:16:13.797Z",
  user: fakeUser(),
});

const fakeCartItem = (overrides?: Object) => ({
  __typename: "CartItem",
  id: "omg123",
  quantity: 3,
  product: fakeItem(),
  user: fakeUser(),
  ...overrides,
});

function makePaginationMocksFor(length) {
  return [
    {
      request: { query: PAGINATION_QUERY },
      result: {
        data: {
          _allProductsMeta: {
            count: length,
          },
          itemsConnection: {
            __typename: "aggregate",
            aggregate: {
              count: length,
              __typename: "count",
            },
          },
        },
      },
    },
  ];
}

export {
  makePaginationMocksFor,
  fakeItem,
  fakeUser,
  fakeCartItem,
  fakeOrder,
  fakeOrderItem,
};
