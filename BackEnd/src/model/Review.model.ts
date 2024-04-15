import mongoose, { Document, Model, Schema } from "mongoose";
export interface ReviewDocument extends Document {
  rating: number;
  probret: string;
  comments: string;
  user: Object;
  createAt: Date;
}

export interface ReviewModel extends Model<ReviewDocument> {}

const ReviewSchema = new Schema<ReviewDocument, ReviewModel>({
  rating: { type: Number, select: true, required: true },
  comments: { type: String, select: true, required: false },
  probret: { type: String, select: true, required: true },
  user: { type: Object, required: true },
  createAt: { type: Date, default: Date.now },
});

export default mongoose.model<ReviewDocument, ReviewModel>(
  "Review",
  ReviewSchema
);