import chai from "chai";
import request from "supertest";
import Server from "../server";

const expect = chai.expect;

describe("Report", () => {
  it("should retrieve a list of chassis and inspection dates", () =>
    request(Server)
      .get("/api/v1/report")
      .expect("Content-Type", /json/)
      .then((r) => {
        expect(r.status).to.be.eq(200);
        expect(r.body).to.be.an.an("array");
        expect(r.body.length).to.greaterThan(0);
        expect(r.body[0]).to.has.property("chassisNumber");
        expect(r.body[0]).has.property("inspection");
        expect(r.body[0].inspection).has.property("nextInspectionDate");
        expect(r.body[0].inspection).has.property("latestInspectionDate");
      }));
});
