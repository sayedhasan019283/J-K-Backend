import mongoose from "mongoose";

export type TPart = {
    image: string; // Array of image URLs
    title: string;
    subTitle: string;
    description: string;
    stockItemId : mongoose.Types.ObjectId
    price: number;
  }