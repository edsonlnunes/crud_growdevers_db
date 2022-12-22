import supertest from "supertest";
import crypto from "crypto";
import { pgHelper } from "../../../../../src/app/shared/database/pg-helper";
import app from "../../../../../src/main/config/app";
import { GrowdeverEntity } from "../../../../../src/app/shared/database/entities/growdever.entity";
import { redisHelper } from "../../../../../src/app/shared/database/redis-helper";
import { Growdever } from "../../../../../src/app/models/growdever";

jest.mock("ioredis", () => require("ioredis-mock"));

describe("GET - /growdevers/:id", () => {
  beforeAll(async () => {
    await pgHelper.connect();
    redisHelper.connect();
  });

  afterAll(async () => {
    await pgHelper.disconnect();
    redisHelper.disconnect();
  });

  test("Deve retornar 200 quando o growdever for encontrado no cache", async () => {
    const growdever = new Growdever("any_name", new Date(), "00011122233");

    await redisHelper.client.set(
      `growdever:${growdever.id}`,
      JSON.stringify(growdever)
    );

    const response = await supertest(app).get(`/growdevers/${growdever.id}`); //uuid

    expect(response.status).toBe(200);

    await redisHelper.client.del(`growdever:${growdever.id}`);
  });

  test("Deve retornar 404 quando o growdever nao for encontrado no cache e no banco de dados", async () => {
    const response = await supertest(app).get(
      `/growdevers/${crypto.randomUUID()}`
    );
    expect(response.status).toBe(404);
  });

  test("Deve retornar 200 quando o growdever for encontrado no banco de dados", async () => {
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

    const growdeverCache = await redisHelper.client.get(
      `growdever:${growdeverEntity.id}`
    );

    expect(response.status).toBe(200);
    expect(growdeverCache).toBeTruthy();

    await pgHelper.client.manager.remove(growdeverEntity);
    await redisHelper.client.del(`growdever:${growdeverEntity.id}`);
  });
});
