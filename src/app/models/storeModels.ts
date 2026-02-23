export interface BaseStoreSchema {
    id: number;
    updatedAt: number; //controla versão
}

export interface DBSchema {
  accounts: AccountStoreSchema;
  products: ProductStoreSchema;
  transactions: TransactionStoreSchema;
}

export interface SalesMadeI {
    id: number;
    name: string;
    sellingPrice: number;
    quantity: number;
    totalSellingPrice: number;
}

//stores
export interface AccountStoreSchema extends BaseStoreSchema {
    name: string;
    depositedAmount: number;
    totalExpenses: number;
    productsBought: SalesMadeI[];
}

export interface ProductStoreSchema extends BaseStoreSchema {
    name: string;
    sellingPrice: number;
    imgURL?: string;
    buyingPrice?: number;
    quantity?: number;
}

export interface TransactionStoreSchema extends BaseStoreSchema {
    timestamp: Date;
    totalAmountSellingPrice: number;
    productsSold: SalesMadeI[];
}