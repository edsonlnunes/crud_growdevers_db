interface String {
  clearSpecialCharacteres(): string;
}

String.prototype.clearSpecialCharacteres = function () {
  return this.replace(/\W/g, "");
};
