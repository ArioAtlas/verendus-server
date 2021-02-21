import chai from "chai";
import request from "supertest";
import Server from "../server";

const expect = chai.expect;

describe("Vehicle", () => {
  it("should get all vehicle", () =>
    request(Server)
      .get("/api/v1/vehicle")
      .expect("Content-Type", /json/)
      .then((r) => {
        expect(r.status).to.be.eq(200);
        expect(r.body).to.be.an.an("array").of.length(20);
      }));

  it("should get an vehicle by identity", () =>
    request(Server)
      .get("/api/v1/vehicle/identity/TN14780")
      .expect("Content-Type", /json/)
      .then((r) => {
        expect(r.status).to.be.eq(200);
        expect(r.body)
          .to.be.an.an("object")
          .that.has.property("chassisNumber")
          .equal("JTEGG32M500015704");
      }));

  it("should get an vehicle by chassis number", () =>
    request(Server)
      .get("/api/v1/vehicle/chassis/JTEGG32M500015704")
      .expect("Content-Type", /json/)
      .then((r) => {
        expect(r.status).to.be.eq(200);
        expect(r.body)
          .to.be.an.an("object")
          .that.has.property("identity")
          .equal("TN14780");
      }));
});
