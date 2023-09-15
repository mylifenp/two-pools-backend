import mongoose from "mongoose";

const trusteeSchema = new mongoose.Schema(
  {
    name: String,
    contacts: {
      emails: [String],
      phones: [String],
    },
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
      houseNumber: String,
    },
    bankDetails: [
      {
        bankName: String,
        iban: String,
        bic: String,
      },
    ],
    notes: String,
    cemeteries: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cemetery" }],
  },
  { timestamps: true }
);

const Trustee = mongoose.model("Trustee", trusteeSchema);
export default Trustee;
