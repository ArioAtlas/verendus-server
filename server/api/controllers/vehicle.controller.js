import { VehicleService } from "../services";

class VehicleController {
  async parse(req, res) {
    try {
      if (!req.files) {
        res.send({
          status: false,
          message: "No file uploaded",
        });
      } else {
        let startTime = new Date().getMilliseconds();

        //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
        let result = await VehicleService.parseFile(req.files.reportFile);

        // append extra properties
        result.processTime = new Date().getMilliseconds() - startTime;

        //send response
        res.send(result);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }

  async findByIdentityNumber(req, res) {
    const vehicle = await VehicleService.findByIdentityNo(req.params.identity);

    if (!vehicle) res.status(404).send();
    else res.send(vehicle);
  }

  async findByChassisNumber(req, res) {
    const vehicle = await VehicleService.findByChassisNo(
      req.params.chassisNumber
    );

    if (!vehicle) res.status(404).send();
    else res.send(vehicle);
  }

  async list(req, res) {
    const vehicles = await VehicleService.all();
    res.send(vehicles);
  }
}

export default new VehicleController();
