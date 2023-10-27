let resetNow = false;
let firstNumber = null;
let secondNumber = null;
let sign = "";

let nummberSelect = document.querySelectorAll(".number");
let operatorSelect = document.querySelectorAll(".op");
let currentScreen = document.getElementById("show");
let preSecreen = document.getElementById("pre");
let clear = document.getElementById("cler");
let numberDelete = document.getElementById("del");
let result = document.getElementById("equal");
let point = document.getElementById("point");

window.addEventListener("keydown", setKey);
point.addEventListener("click", setPoint);
clear.addEventListener("click", clearScreen);
numberDelete.addEventListener("click", deletenNumber);
result.addEventListener("click", answar);

nummberSelect.forEach((btn) => {
  btn.addEventListener("click", () => setNumberToScreen(btn.textContent));
  btn.addEventListener("keydown", () => setNumberToScreen(btn.textContent));
});
operatorSelect.forEach((op) => {
  op.addEventListener("click", () => setOperator(op.textContent));
});

function setNumberToScreen(toadd) {
  if (currentScreen.textContent === "0" || resetNow) resetScreen();
  currentScreen.textContent += toadd;
}

function resetScreen() {
  currentScreen.textContent = "";
  resetNow = false;
}

function setOperator(op) {
  if (firstNumber !== null) answar();
  firstNumber = currentScreen.textContent;
  sign = op;
  preSecreen.textContent = firstNumber + op;
  resetNow = true;
}
function answar() {
  if (firstNumber === null || resetNow) return;
  if (sign === "÷" && currentScreen.textContent === "0") {
    alert("you can not divid by 0");
    return;
  }
  secondNumber = currentScreen.textContent;
  currentScreen.textContent = setNumber(
    firstNumber,
    sign,
    currentScreen.textContent
  );
  preSecreen.textContent = `${firstNumber} ${sign} ${secondNumber} =`;
  firstNumber = null;
}

function setPoint() {
  if (resetNow) return;
  if (currentScreen.textContent === "") currentScreen.textContent = "0";
  if (currentScreen.textContent.includes(".")) return;
  currentScreen.textContent += ".";
}

function clearScreen() {
  firstNumber = null;
  secondNumber = null;
  resetNow = false;
  currentScreen.textContent = "0";
  preSecreen.textContent = "";
}
function deletenNumber() {
  currentScreen.textContent = currentScreen.textContent.slice(0, -1);
}

function setNumber(num1, operator, num2) {
  a = Number(num1);
  b = Number(num2);
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return sub(num1, num2);
    case "÷":
      return div(num1, num2);

    case "×":
      return mul(num1, num2);
  }
}

function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}
function div(a, b) {
  return a / b;
}
function mul(a, b) {
  return a * b;
}

function setKey(e) {
  if (e.key >= 0 && e.key <= 9) setNumberToScreen(e.key);
  if (e.key === ".") setPoint(e.key);
  if (e.key === "+" || e.key === "/" || e.key === "*" || e.key === "-")
    setOperator(convertOperator(e.key));
  if (e.key === "Escape") clearScreen();
  if (e.key === "Backspace") deletenNumber();
  if (e.key === "Enter" || e.key === "=") answar();
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === "/") return "÷";
  if (keyboardOperator === "*") return "×";
  if (keyboardOperator === "-") return "-";
  if (keyboardOperator === "+") return "+";
}
