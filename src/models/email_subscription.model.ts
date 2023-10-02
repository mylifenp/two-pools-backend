import { Schema, model } from "mongoose";

export interface EmailSubscription {
  id: string;
  email: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

const emailSubscriptionSchema = new Schema(
  {
    email: String,
    active: Boolean,
  },
  { timestamps: true }
);

const EmailSubscription = model<EmailSubscription>(
  "EmailSubscription",
  emailSubscriptionSchema
);
export default EmailSubscription;
