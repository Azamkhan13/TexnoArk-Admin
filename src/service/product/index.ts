
import request from "../config"

export interface postData{
    price: number| string;
    name: string;
    category_id:number;
    brand_id:number;
    brand_category_id:number;
}

export interface getProduct{
    page?:number;
    search?: string;
    limit?:number;
}

export interface UpdateData{
    putData: postData;
    id:number|undefined;
}



export interface ProductsId {
    [index :string] :unknown |any
}


export interface UpdateProductDetels{
    putDataDetels: ProductDetels;
    id:number|undefined;
}

export interface ProductDetels{
    quantity: number| string;
    description:string;
    colors:number;
    product_id: number;
    discount: number| string;
}





interface Product{
    get : (data:getProduct)=> any,
    post : (data:any)=> any,
    delete : (id:number)=> any,
    update : (data:UpdateData)=> any,
    getId : (id:number)=> any,

    deleteProducDetels : (id:number)=> any,
    updateProductDetels : (data:UpdateProductDetels)=> any,

    getProductsBrandId:(id:number)=>any
}

export interface StoreProduct{
    isLoader:boolean;
    dataProduct:any[];
    dataProductsBrandId:any[];
    totlCount:number;
    productsId: ProductsId | null
    updateProductDetels : (data:UpdateProductDetels)=> Promise <any>;
    deleteProductDetels: (id:number)=> Promise <any>;
    updateProduct: (data:UpdateData)=> Promise <any>;
    getProduct: (data:getProduct)=> Promise <any>;
    deleteProduct: (id:number)=> Promise <any>;
    getProductId: (id:number)=> Promise <any>;
    postProduct: (data:any)=> Promise <any>;


    getProductsBrandId: (id:number)=> Promise <any>;

}




export const product:Product = {
    get: (data)=> request.get(`/products/search?search=${data?.search}&limit=${data?.limit}&page=${data?.page}`),
    updateProductDetels : (data)=> request.patch(`/product-detail/update/${data.id}`, data.putDataDetels),
    deleteProducDetels: (id)=> request.delete(`/product-detail/delete/${id}`),
    update: (data)=> request.patch(`/products/update/${data.id}`, data.putData),
    delete: (id)=> request.delete(`/products/delete/${id}`),
    post: (data)=> request.post("/products/create" , data),
    getId: (id)=> request.get(`/products/${id}`),

    getProductsBrandId:(id)=> request.get(`/products/brand/${id}`)
}