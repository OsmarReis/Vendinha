export interface NavLinksI {
  icon: string;
  urlPath: string;
  displayName: string;
}

export interface DBSchema {
  accounts: AccountI;
  products: ProductI;
  transactions: TransactionI;
}

export interface ProductI {
  id: number;
  name: string;
  quantity: number;
  buyPrice: number;
  sellPrice: number;
  imgUrl?: string;
}

export interface ProductsBoughtI {
  id: number;
  name: string;
  quantity: number;
  sellPrice: number;
  totalAmount: number;
};

export interface TransactionI {
  id: number;
  accountId?: number;
  timestamp: Date;
  productsTx: ProductsBoughtI[];
  totalAmount: number;
}

export interface AccountI {
  id: number;
  name: string;
  initalAmount: number;
  productsBought: ProductsBoughtI[];
}