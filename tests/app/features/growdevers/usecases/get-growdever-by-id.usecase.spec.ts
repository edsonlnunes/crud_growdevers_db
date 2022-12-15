import { GrowdeverRepository } from "../../../../../src/app/features/growdevers/repositories/growdever.repository";
import { GetGrowdeverById } from "../../../../../src/app/features/growdevers/usecases/get-growdever-by-id.usecase";
import { Growdever } from "../../../../../src/app/models/growdever";

interface SutTypes {
  sut: GetGrowdeverById;
  repository: GrowdeverRepository;
}

const makeSut = (): SutTypes => {
  const repository = new GrowdeverRepository();
  const sut = new GetGrowdeverById(repository);
  return { sut, repository };
};

describe("GetGrowdeverById Usecase", () => {
  test("Deve retornar um growdever quando ele é encontrado", async () => {
    const { sut, repository } = makeSut();

    jest
      .spyOn(repository, "findByIDGrowdever")
      .mockResolvedValue(
        Growdever.create(
          "any_id",
          "any_name",
          "00011122233",
          new Date(),
          "CANCALLED",
          []
        )
      );

    const result = await sut.execute("any_id");

    expect(result?.id).toBe("any_id");
  });

  test("Deve retornar um undefined quando o growdever nao é encontrado", async () => {
    const { sut, repository } = makeSut();

    jest.spyOn(repository, "findByIDGrowdever").mockResolvedValue(undefined);

    const result = await sut.execute("any_id");

    // expect(result).toBeUndefined();
    expect(result).toBeFalsy();
  });
});
