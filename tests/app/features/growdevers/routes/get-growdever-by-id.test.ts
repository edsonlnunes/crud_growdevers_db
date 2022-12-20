import supertest from "supertest";
import crypto from "crypto";
import { pgHelper } from "../../../../../src/app/shared/database/pg-helper";
import app from "../../../../../src/main/config/app";
import { GrowdeverEntity } from "../../../../../src/app/shared/database/entities/growdever.entity";

describe("GET - /growdevers/:id", () => {
  beforeAll(async () => {
    await pgHelper.connect();
  });

  afterAll(async () => {
    await pgHelper.disconnect();
  });

  test("Deve retornar 404 quando o growdever nao for encontrado", async () => {
    const response = await supertest(app).get(
      `/growdevers/${crypto.randomUUID()}`
    );
    expect(response.status).toBe(404);
  });

  test("Deve retornar 200 quando o growdever for encontrado", async () => {
    const growdeverEntity = pgHelper.client.manager.create(GrowdeverEntity, {
      id: crypto.randomUUID(),
      name: "any_name",
      cpf: "00011122233",
      status: "STUDYNG",
      birth: new Date(),
    });

    await pgHelper.client.manager.save(growdeverEntity);

    const response = await supertest(app).get(
      `/growdevers/${growdeverEntity.id}`
    );

    expect(response.status).toBe(200);

    await pgHelper.client.manager.remove(growdeverEntity);
  });
});
