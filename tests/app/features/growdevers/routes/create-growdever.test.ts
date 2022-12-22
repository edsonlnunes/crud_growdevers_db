import supertest from "supertest";
import crypto from "crypto";
import { GrowdeverEntity } from "../../../../../src/app/shared/database/entities/growdever.entity";
import { pgHelper } from "../../../../../src/app/shared/database/pg-helper";
import { redisHelper } from "../../../../../src/app/shared/database/redis-helper";
import app from "../../../../../src/main/config/app";

jest.mock("ioredis", () => require("ioredis-mock"));

const makeRequest = (cpf?: string, includeAddres: boolean = false) => {
  return {
    name: "any_name",
    cpf: cpf ?? "55230372060",
    birth: new Date(),
    skills: ["TS"],
    address: includeAddres
      ? {
          street: "any_street",
          city: "any_city",
          uf: "uf",
        }
      : undefined,
  };
};

describe("POST - /growdevers", () => {
  beforeAll(async () => {
    await pgHelper.connect();
    redisHelper.connect();
  });

  afterAll(async () => {
    await pgHelper.disconnect();
    redisHelper.disconnect();
  });

  afterEach(async () => {
    await pgHelper.client.manager.delete(GrowdeverEntity, {});
  });

  test("Deve retornar 400 quando o CPF for inválido", async () => {
    const response = await supertest(app)
      .post("/growdevers")
      .send(makeRequest("00011122233"));

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "CPF inválido" });
  });

  test("Deve retornar 400 quando o CPF já existe", async () => {
    const growdeverEntity = pgHelper.client.manager.create(GrowdeverEntity, {
      id: crypto.randomUUID(),
      name: "any_name",
      cpf: "55230372060",
      status: "STUDYNG",
      birth: new Date(),
    });

    await pgHelper.client.manager.save(growdeverEntity);

    const response = await supertest(app)
      .post("/growdevers")
      .send(makeRequest());

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "CPF já cadastrado" });
  });

  test("Deve retornar 200 com o growdever criado - sem endereco", async () => {
    await redisHelper.client.set("growdevers", "['any_value']");

    const response = await supertest(app)
      .post("/growdevers")
      .send(makeRequest());

    const growdeverEntity = await pgHelper.client.manager.findOne(
      GrowdeverEntity,
      {
        where: { id: response.body.id },
      }
    );

    const cache = await redisHelper.client.get("growdevers");

    expect(response.status).toBe(200);
    expect(growdeverEntity).toBeTruthy();
    expect(growdeverEntity?.addressId).toBeFalsy();
    expect(growdeverEntity?.name).toBe("any_name");
    expect(cache).toBeFalsy();
  });

  test("Deve retornar 200 com o growdever criado - com endereco endereco", async () => {
    const response = await supertest(app)
      .post("/growdevers")
      .send(makeRequest(undefined, true));

    const growdeverEntity = await pgHelper.client.manager.findOne(
      GrowdeverEntity,
      {
        where: { id: response.body.id },
      }
    );

    expect(response.status).toBe(200);
    expect(growdeverEntity).toBeTruthy();
    expect(growdeverEntity?.addressId).toBeTruthy();
  });
});
