import request from "../config"

export interface postCategory{
    parent_category_id:number,
    name: string, 
}

export interface UpdateCategory {
    updateData : postCategory
    id:number;
}

export interface GetCategory{
    search?: string,
    limit?:number;
    page?:number;
    id?:number;
}




interface SubCategory{
    updateSubCatigory : (data:UpdateCategory)=> any,
    postSubCatigory : (data:postCategory)=> any,
    getSubCatigory : (data:GetCategory)=> any,
    deleteSubCatigory : (id:number)=> any,
}

export interface StoreSubCategory {
    isLoader:boolean;
    dataSubCatigory:any[];
    totlCount:number;
    updateDataSubCatigory: (data:UpdateCategory)=> Promise <any>;
    postDataSubCatigory: (data:postCategory)=> Promise <any>;
    getDataSubCatigory: (data:GetCategory)=> Promise <any>;
    deleteDataSubCatigory: (id:number)=> Promise <any>;
}




export const subCategory:SubCategory = {
    getSubCatigory: (data)=> request.get(`/sub-category/search/${data?.id}?search=${data?.search}&limit=${data?.limit}&page=${data?.page}`),
    updateSubCatigory: (data)=> request.patch(`/sub-category/update/${data.id}`, data.updateData),
    deleteSubCatigory: (id)=> request.delete(`/sub-category/delete/${id}`),
    postSubCatigory: (data)=> request.post("/sub-category/create" , data),
}