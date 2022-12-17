export interface IPhoto {
  id: string;
  image: {
    publicUrlTransformed: string;
    __typename: string;
  };
}

export interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  photo: IPhoto;
  __typename: string;
}
