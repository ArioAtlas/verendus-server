import { Router } from "express";
import { VehicleController, ReportController } from "../../controllers";

const router = new Router();

// vehicle routes
router.get("/vehicle", VehicleController.list);
router.post("/vehicle", VehicleController.parse);
router.get(
  "/vehicle/identity/:identity",
  VehicleController.findByIdentityNumber
);
router.get(
  "/vehicle/chassis/:chassisNumber",
  VehicleController.findByChassisNumber
);

// Report routes
router.get("/report", ReportController.getInspectionWithChassisReport);

export default router;
