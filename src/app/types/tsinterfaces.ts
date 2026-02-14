export interface NavLinksI {
  icon: string;
  urlPath: string;
  displayName: string;
}

export interface ProductI {
  id: number;
  name: string;
  quantity: number;
  buyPrice: number;
  sellPrice: number;
}

export interface AccountI {
  id: number;
  name: string;
  initalAmount: number;
  productsBought: {
    id: number;
    name: string;
    quantity: number;
  }[];
}