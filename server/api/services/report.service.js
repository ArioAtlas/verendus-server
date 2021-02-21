import { VehicleModel } from "../models";
class ReportService {
  async inspectioAndChassis() {
    let vehicles = await VehicleModel.find({})
      .sort({ "_inspection.nextInspectionDate": -1 })
      .select("chassisNumber _inspection -_id");
    return vehicles;
  }

  async getNewVehicleCountFrom(daysAgo) {
    return VehicleModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(
              new Date().valueOf() - 1000 * 60 * 60 * 24 * daysAgo
            ),
          },
        },
      },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
    ]);
  }
}

export default new ReportService();
