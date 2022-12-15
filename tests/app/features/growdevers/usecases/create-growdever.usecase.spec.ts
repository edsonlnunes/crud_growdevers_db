import { GrowdeverRepository } from "../../../../../src/app/features/growdevers/repositories/growdever.repository";
import { CreateGrowdever } from "../../../../../src/app/features/growdevers/usecases/create-growdever.usecase";

const makeRequestData = (birth: Date, includeAddress: boolean = false) => {
  return {
    name: "any_name",
    birth,
    cpf: "00011122233",
    skills: [],
    address: includeAddress
      ? {
          street: "any_street",
          city: "any_city",
          uf: "rs",
        }
      : undefined,
  };
};

interface SutTypes {
  sut: CreateGrowdever;
  repository: GrowdeverRepository;
}

const makeSut = (): SutTypes => {
  const repository = new GrowdeverRepository();
  const sut = new CreateGrowdever(repository);
  return { sut, repository };
};

describe("Create Growdever Usecase", () => {
  test("Deve salvar o growdever sem endereco", async () => {
    // criacao e definicao do que é preciso para testar
    const { sut, repository } = makeSut();

    // Resolvida = quando da certo
    // Rejeitada = quando aconece um erro
    jest.spyOn(repository, "saveGrowdever").mockResolvedValue();

    const today = new Date();

    // chamada do método que queremos testar
    const result = await sut.execute(makeRequestData(today));

    // asserts
    expect(result.id).toBeTruthy();
    expect(result.name).toBe("any_name");
    expect(result.birth).toBe(today);
    expect(result.cpf).toBe("00011122233");
    expect(result.status).toBe("STUDYING");
    expect(result.skills).toEqual([]);
    expect(result.assessments).toEqual([]);
    expect(result.address).toBeFalsy();
  });

  test("Deve salvar o growdever com endereco", async () => {
    const { sut, repository } = makeSut();

    jest.spyOn(repository, "saveGrowdever").mockResolvedValue();

    const today = new Date();

    const result = await sut.execute(makeRequestData(today, true));

    expect(result.id).toBeTruthy();
    expect(result.name).toBe("any_name");
    expect(result.birth).toBe(today);
    expect(result.cpf).toBe("00011122233");
    expect(result.status).toBe("STUDYING");
    expect(result.skills).toEqual([]);
    expect(result.assessments).toEqual([]);

    expect(result.address).toBeTruthy();
    expect(result.address?.id).toBeTruthy();
    expect(result.address?.street).toBe("any_street");
    expect(result.address?.city).toBe("any_city");
    expect(result.address?.uf).toBe("rs");
  });
});
