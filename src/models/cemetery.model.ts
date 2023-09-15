import mongoose from "mongoose";

const cemeterySchema = new mongoose.Schema(
  {
    name: String,
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
      houseNumber: String,
    },
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
    notes: String,
    trustee: { type: mongoose.Schema.Types.ObjectId, ref: "Trustee" },
  },
  { timestamps: true }
);

const Cemetery = mongoose.model("Cemetery", cemeterySchema);
export default Cemetery;
