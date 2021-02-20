import mongoose from "mongoose";
import { toJSON, paginate } from "./plugins";

const VehicleSchema = mongoose.Schema(
  {
    identity: {
      type: String,
      required: true,
      index: true,
    },
    chassisNumber: {
      type: String,
      required: true,
    },
    modelYear: {
      type: Number,
      required: true,
    },
    typeApprovalNo: {
      type: Number,
      required: true,
    },
    privatelyImported: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: true,
    },
    _inspection: {
      latestInspectionDate: Number,
      nextInspectionDate: Number,
    },
    _registration: {
      firstRegistration: Number,
      latestRegistration: Number,
      monthlyRegistration: Number,
      dateOfDeregistration: Number,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
VehicleSchema.plugin(toJSON);
VehicleSchema.plugin(paginate);

export default mongoose.model("Vehicle", VehicleSchema);
