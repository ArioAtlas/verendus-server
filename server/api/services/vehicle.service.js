import { VehicleModel } from "../models";
import Parser from "../utils/parser";

const parser = Parser();

class VehicleService {
  async findByIdentityNo(identityNo) {
    return VehicleModel.findOne({ identity: identityNo });
  }

  async findByChassisNo(chassisNo) {
    return VehicleModel.findOne({ chassisNumber: chassisNo });
  }

  async findById(id) {
    return VehicleModel.findOne({ _id: id });
  }

  async all() {
    return VehicleModel.find({});
  }

  create(data) {
    return new VehicleModel(data);
  }

  async update(id, data) {
    const vehicle = await this.findById(id);

    if (!vehicle) throw new Error(`Could not find vehicle id  ${id}`);

    Object.keys(data).forEach((key) => {
      vehicle[key] = data[key];
    });

    return vehicle.save();
  }

  async save(vehicle) {
    if (vehicle instanceof VehicleModel) return vehicle.save();
    throw new Error(
      "Could not save given object, object is not instance of Vehicle Model"
    );
  }

  async remove(query) {
    const resp = await VehicleModel.remove(query);
    return resp.result.n;
  }

  async parseFile(file) {
    let newVehicles = [];
    let updatedVehicles = [];
    let errors = [];
    let i = 0;

    let buffer = file.data.toString();
    buffer = buffer.split("\n");

    for (let element of buffer) {
      try {
        parser.validate(element);
        let v = parser.parse(element).toVehicle();

        // check for object in db
        let vehicle = await this.findByIdentityNo(v.identity);
        if (!vehicle) {
          // new vehicle
          this.create(v);
          newVehicles.push(v);
        } else {
          // update vehicle
          Object.keys(v).forEach((key) => {
            vehicle[key] = v[key];
          });
          this.save(vehicle);
          updatedVehicles.push({ old: vehicle, new: v });
        }
      } catch (error) {
        console.log(error);
        errors.push({ line: i, element });
      }
      i++;
    }

    return {
      newVehicle: newVehicles,
      updatedVehicle: updatedVehicles,
      errors: errors,
    };
  }
}

export default new VehicleService();
