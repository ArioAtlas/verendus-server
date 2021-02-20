import { ReportService } from "../services";

class ReportController {
  async getInspectionWithChassisReport(req, res) {
    const report = await ReportService.inspectioAndChassis();
    res.send(report);
  }
}

export default new ReportController();
