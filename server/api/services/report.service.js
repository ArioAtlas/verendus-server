import { VehicleService } from "./";
import { VehicleModel } from "../models";
import flatten from "flat";

class ReportService {
  async inspectioAndChassis() {
    let vehicles = await VehicleModel.find({}).select(
      "chassisNumber _inspection -_id"
    );
    return vehicles;
  }
}

export default new ReportService();
