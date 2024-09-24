import { Schema, model } from "mongoose";
export interface Pork{
    id:string;
    name:string;
    price:number;
    tags: string[];
    favorite:boolean;
    stars: number;
    imageUrl: string;
    kilo: string;
}

export const PorkSchema = new Schema<Pork>(
    {
        name: {type: String, required:true},
        price: {type: Number, required:true},
        tags: {type: [String]},
        favorite: {type: Boolean, default:false},
        imageUrl: {type: String, required:true},
        kilo: {type: String, required:true}
    },{
        toJSON:{
            virtuals: true
        },
        toObject:{
            virtuals: true
        },
        timestamps:true
    }
);

export const PorkModel = model<Pork>('pork', PorkSchema);