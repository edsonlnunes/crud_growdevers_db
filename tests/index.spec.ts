describe("Primeiro teste", () => {
  test("Deve somar 2 e 2 e retornar 4", () => {
    console.log("LOG DENTRO DO PRIMEIRO TESTE");
    expect(2 + 3).toBe(5);
  });

  test("Deve mostrar a mensagem Bora pro café", () => {
    const message = "Bora pro café";
    console.log("LOG DENTRO DO SEGUNDO TESTE");
    expect(message).toBe("Bora pro café");
  });
});
