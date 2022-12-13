import { Address } from "../../../src/app/models/address";
import { Assessment } from "../../../src/app/models/assessment";
import { Growdever } from "../../../src/app/models/growdever";

describe("Growdever model", () => {
  test("Deve instanciar somente com as informacoes obrigatórias", () => {
    const today = new Date();
    const sut = new Growdever("teste", today, "00011122233");

    expect(sut.id).toBeTruthy();
    expect(sut.name).toBe("teste");
    expect(sut.birth).toBe(today);
    expect(sut.cpf).toBe("00011122233");
    expect(sut.address).toBeFalsy();
    expect(sut.assessments).toHaveLength(0);
    expect(sut.skills).toHaveLength(0);
    expect(sut.status).toBe("STUDYING");
  });

  test("Deve instanciar passando as informacoes opcionais", () => {
    const today = new Date();
    const sut = new Growdever("Teste 2", today, "111.222.333-44", ["JS"]);

    expect(sut.id).toBeTruthy();
    expect(sut.name).toBe("Teste 2");
    expect(sut.address).toBeFalsy();
    expect(sut.assessments).toHaveLength(0);
    expect(sut.birth).toBe(today);
    expect(sut.cpf).toBe("11122233344");
    expect(sut.skills).toHaveLength(1);
    expect(sut.skills).toEqual(["JS"]);
    expect(sut.status).toEqual("STUDYING");
  });

  test("Deve instanciar através do metodo static com as informacoes obrigatórias", () => {
    const today = new Date();
    const sut = Growdever.create(
      "any_id",
      "any_name",
      "00011122233",
      today,
      "CANCELLED",
      ["TS"]
    );

    expect(sut.id).toBe("any_id");
    expect(sut.name).toBe("any_name");
    expect(sut.address).toBeFalsy();
    expect(sut.assessments).toHaveLength(0);
    expect(sut.birth).toBe(today);
    expect(sut.cpf).toBe("00011122233");
    expect(sut.skills).toHaveLength(1);
    expect(sut.skills).toEqual(["TS"]);
    expect(sut.status).toEqual("CANCELLED");
  });

  test("Deve instanciar através do metodo static com as informacoes opcionais", () => {
    const today = new Date();
    const address = new Address("any_street", "any_city", "rs");
    const assessment = new Assessment(10, "BD II");

    const sut = Growdever.create(
      "any_id",
      "any_name",
      "00011122233",
      today,
      "CANCELLED",
      ["TS"],
      address,
      [assessment]
    );

    expect(sut.id).toBe("any_id");
    expect(sut.name).toBe("any_name");
    expect(sut.birth).toBe(today);
    expect(sut.cpf).toBe("00011122233");
    expect(sut.skills).toHaveLength(1);
    expect(sut.skills).toEqual(["TS"]);
    expect(sut.status).toEqual("CANCELLED");

    expect(sut.address!.id).toBe(address.id);
    expect(sut.assessments).toHaveLength(1);
    expect(sut.assessments[0].id).toBe(assessment.id);
  });

  test("Deve adicionar novas skills", () => {
    const sut = new Growdever("any_name", new Date(), "00011122233");

    sut.updateSkills(["JS", "TS"]);

    expect(sut.skills).toHaveLength(2);
    expect(sut.skills).toEqual(["JS", "TS"]);
  });

  test("Deve estourar uma excecao ao passar uma lista vazia na atualizacao de skills", () => {
    const sut = new Growdever("any_name", new Date(), "00011122233");

    expect(() => sut.updateSkills([])).toThrow(
      "Não é possivel adicionar uma lista vazia."
    );
  });
});
