import request from "../config"

export interface postCategory{
    parent_category_id?:number ;
    name: string,
}

export interface GetCategory{
    page?:number;
    search?: string,
    limit?:number;
}


export interface UpdateCategory {
    updateData : postCategory
    id:number;
}





interface Category{
    getCatigory : (data:GetCategory)=> any,
    postCatigory : (data:postCategory)=> any,
    deleteCategory : (id:number)=> any,
    updateCategory : (data:UpdateCategory)=> any,
}

export interface StoreCategory {
    dataCategory:any[];
    isLoader:boolean;
    totlCount:number;
    deleteDataCategory: (id:number)=> Promise <any>;
    getDataCategory: (data:GetCategory)=> Promise <any>;
    updateDataCategory: (data:UpdateCategory)=> Promise <any>;
    postDatacategory: (data:postCategory)=> Promise <any>;
}




export const category:Category = {
    deleteCategory: (id)=> request.delete(`/category/delete/${id}`),
    getCatigory: (data)=> request.get(`/category/search?search=${data?.search}&limit=${data?.limit}&page=${data?.page}`),
    updateCategory: (data)=> request.patch(`/category/update/${data.id}`, data.updateData),
    postCatigory: (data)=> request.post("/category/create" , data),
}