import request from "../config"

export interface postData{
    name: string;
    description: string;
    category_id?:any;
    categoryId?:any;
    file?:any;
}



export interface getBrand{
    search?: string;
    page?:number;
    limit?:number;
}

interface Brand{
    get : (data:getBrand)=> any,
    post : (data:any)=> any,
    delete : (id:number)=> any,
    update : (data:UpdateData)=> any,
    getCategoryId:(data:GetCategoryId)=> any,
}

export interface UpdateData{
    id:number|undefined;
    putData: postData;
}

export interface GetCategoryId{
    id:number;
    limit?:number;
    page?:number;
}



export interface StoreBrand {
    isLoader:boolean;
    dataBrands:any[];
    dataBrandsId:any[];
    totlCount:number;
    getBrand: (data:getBrand)=> Promise <any>;
    postBrand: (data:any)=> Promise <any>;
    deleteBrand: (id:number)=> Promise <any>;
    updateBrand: (data:UpdateData)=> Promise <any>;
    getCategoryId: (data:GetCategoryId)=> Promise <any>;

}




export const brand:Brand = {
    delete: (id)=> request.delete(`/brand/delete/${id}`),
    get: (data)=> request.get(`/brand/search?search=${data?.search}&limit=${data?.limit}&page=${data?.page}`),
    post: (data)=> request.post("/brand/create" , data),
    getCategoryId: (data)=> request.get(`/brand/category/${data?.id}?limit=${data?.limit}&page=${data?.page}`),
    update: (data)=> request.patch(`/brand/update/${data.id}`, data.putData),
    
}