import { GrowdeverRepository } from "../../../../../src/app/features/growdevers/repositories/growdever.repository";
import { UpdateGrowdever } from "../../../../../src/app/features/growdevers/usecases/update-growdever.usecase";
describe("Update Growdever Usecase", () => {
  test("Deve retornar um erro quando não encontrar o Growdever", async () => {
    const repository = new GrowdeverRepository();
    const sut = new UpdateGrowdever(repository);

    jest.spyOn(repository, "findByIDGrowdever").mockResolvedValue(undefined);
    const spyUpdateGrowdever = jest
      .spyOn(repository, "updateGrowdever")
      .mockResolvedValue();

    const promise = sut.execute({
      id: "any_id",
      name: "any_name",
      birth: new Date(),
      status: "any_status",
      address: {
        street: "any_street",
        city: "any_city",
        uf: "any_uf",
      },
    });

    await expect(promise).rejects.toThrow("Growdever não encontrado");
    expect(spyUpdateGrowdever).not.toHaveBeenCalled();
  });
});
