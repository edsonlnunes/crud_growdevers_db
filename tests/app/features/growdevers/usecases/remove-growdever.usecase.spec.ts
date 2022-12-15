import { GrowdeverRepository } from "../../../../../src/app/features/growdevers/repositories/growdever.repository";
import { RemoveGrowdever } from "../../../../../src/app/features/growdevers/usecases/remove-growdever.usecase";

describe("Remove Growdever Usecase", () => {
  test("Deve chamar o método remove do repository ", async () => {
    const repository = new GrowdeverRepository();
    const sut = new RemoveGrowdever(repository);

    const spyRemoveGrowdev = jest
      .spyOn(repository, "removeGrowdev")
      .mockResolvedValue();

    await sut.execute("any_id");

    expect(spyRemoveGrowdev).toHaveBeenCalledTimes(1);
    expect(spyRemoveGrowdev).toHaveBeenCalledWith("any_id");
  });
});
