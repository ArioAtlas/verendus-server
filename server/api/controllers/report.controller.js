import { ReportService } from "../services";

class ReportController {
  async getInspectionWithChassisReport(req, res) {
    const report = await ReportService.inspectioAndChassis();
    res.send(report);
  }

  async getNewVehicleCount(req, res) {
    const report = await ReportService.getNewVehicleCountFrom(req.params.days);
    res.send(report);
  }
}

export default new ReportController();
