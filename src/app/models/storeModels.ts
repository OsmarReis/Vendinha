export interface BaseStoreSchema {
    id: number;
    updatedAt: number; //controla versão
}

export interface DBSchema {
  accounts: AccountStoreSchema;
  products: ProductStoreSchema;
  purschases: PurschaseStoreSchema;
  sales: SaleStoreSchema;
}

export interface SaleMadeI {
    product: ProductStoreSchema;
    quantity: number;
    cartTotal: number;
}

//stores
export interface AccountStoreSchema extends BaseStoreSchema {
    name: string;
    depositedAmount: number;
    totalExpenses: number;
    productsBought: SaleMadeI[];
}

export interface ProductStoreSchema extends BaseStoreSchema {
    name: string;
    currentSalePrice: number;
}

export interface TransactionStoreSchema extends BaseStoreSchema {
    timestamp: Date;
    totalAmountSellingPrice: number;
    productsSold: SaleMadeI[];
}

export interface PurschaseStoreSchema extends BaseStoreSchema{
    productId: number;
    quantity: number;
    remainingQuantity: number;
    unitCost: number;
    createdAt: Date;
}

export interface SaleStoreSchema extends BaseStoreSchema {
    createdAt: Date;
    totalSalePrice: number;
    products: SaleMadeI[];
}