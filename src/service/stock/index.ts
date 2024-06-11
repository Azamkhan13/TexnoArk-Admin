
import request from "../config"

export interface postData{
    brand_id:number;
    quantity: number| string;
    product_id:number;
    category_id:number;
}

export interface getStock{
    limit ?: number;
    page ?: number;
}

export interface UpdateData{
    id:number|undefined;
    putData: postData;
}

export interface ProductsId {
    [index :string] :unknown |any
}


interface Stock{
    post : (data:any)=> any,
    get : (data:getStock)=> any,
    update : (data:UpdateData)=> any,
    delete : (id:number)=> any,
    grtBrandIdStock :(id:number)=> any,
}

export interface StoreStock{
    isLoader:boolean;
    dataStock:any[];
    dataBrandIdStock:any[];
    totlCount:number;
    updateStock: (data:UpdateData)=> Promise <any>;
    grtBrandIdStock :(id:number)=> Promise <any>;
    getStock: (dat:getStock)=> Promise <any>;
    deleteStock: (id:number)=> Promise <any>;
    postStock: (data:any)=> Promise <any>;
}

export const stock:Stock = {
    get: (data)=> request.get(`/stock?limit=${data?.limit}&page=${data?.page}`),
    update: (data)=> request.patch(`/stock/update/${data.id}`, data.putData),
    grtBrandIdStock: (id)=> request.get(`/stock/brand/${id}`),
    delete: (id)=> request.delete(`/stock/delete/${id}`),
    post: (data)=> request.post("/stock/create" , data)
}