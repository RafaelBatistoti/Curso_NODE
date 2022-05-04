const inquirer = require("inquirer");
const colors = require("colors");
const fs = require("fs");

console.log("inicio");
operation();

function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "\n o que deseja fazer \n \n",
        choices: [
          "Criar conta",
          "Consultar Saldo",
          "Depositar",
          "Sacar",
          "Sair \n \n",
        ],
      },
    ])
    .then((res) => {
      const action = res["action"];
      if (action === "Criar conta") {
        createAccount();
        buildAccount();
      } else if (action === "Depositar") {
        deposit();
      } else if (action === "Consultar Saldo") {
        getAccountBalance();
      } else if (action === "Sacar") {
        sacar();
      } else if (action === "Sair") {
        console.log("Obrigado por usar nosso banco".bgWhite.black);
        process.exit();
      }
    })
    .catch((err) => console.log("messsagem de erro".bgRed.black));
}

function createAccount() {
  console.log("Parabéns por usar nosso banco".green);
  console.log("Defina as opções da conta a seguir".blue);
}

buildAccount = () => {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite o nome da sua conta".bgGreen.black,
      },
    ])
    .then((res) => {
      const accountName = res["accountName"];
      console.info(accountName);

      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log("Essa conta ja existe. Escolha outro nome!!".bgRed.black);

        buildAccount();
        return;
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance": 0}',
        function (err) {
          console.log(err);
        }
      );

      console.log("Sua conta foi criada ");
      operation();
    })
    .catch((err) => console.log("messsagem de erro".bgRed.black));
};

function deposit() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual nome da conta",
      },
    ])
    .then((res) => {
      const accountName = res["accountName"];
      if (!checkAccount(accountName)) {
        return deposit();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: "Quanto você deseja depositar?",
          },
        ])
        .then((res) => {
          const amount = res["amount"];
          addAmount(accountName, amount);
          operation();
        })
        .catch((err) => console.log("messsagem de erro".bgRed.black));
    })
    .catch((err) => console.log("messsagem de erro".bgRed.black));
}

checkAccount = (accountName) => {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log("Essa conta não existe. Escolha outro nome!!".bgRed.black);
    return false;
  }

  return true;
};

addAmount = (accountName, amount) => {
  const accountData = getAccount(accountName);
  if (!amount) {
    console.log(".ocorreu um erro".bgRed.black);
    return deposit();
  }
  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err);
    }
  );
  console.log(`Foi depositado o valor de: R$${amount} na sua conta`.green);
};

getAccount = (accountName) => {
  const accountJson = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: "utf-8",
    flag: "r",
  });
  return JSON.parse(accountJson);
};

function getAccountBalance() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta",
      },
    ])
    .then((res) => {
      const accountName = res["accountName"];

      if (!checkAccount(accountName)) {
        return getAccountBalance();
      }

      const accountData = getAccount(accountName);
      console.log(`O seu saldo é de:  R$${accountData.balance}`.bgGreen.black);
      operation();
    })
    .catch((err) => console.log("messsagem de erro".bgRed.black));
}

function sacar() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta",
      },
    ])
    .then((res) => {
      const accountName = res["accountName"];

      if (!checkAccount(accountName)) {
        return saque();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: "Quanto você deseja sacar",
          },
        ])
        .then((res) => {
          const amount = res["amount"];
          removeAmount(accountName, amount);
        })
        .catch((err) => console.log("messsagem de erro".bgRed.black));
    })
    .catch((err) => console.log("messsagem de erro".bgRed.black));
}

function removeAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log("Ocorreu um erro".bgRed.black);
    return sacar();
  }

  if (accountData.balance < amount) {
    console.log("Valor indisponivel".bgRed.black);
    return sacar();
  }
  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);
  console.log(accountData.balance);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err);
    }
  );

  console.log(`Saque realizado no valor de: R$${amount}`.bgGreen.black);
  operation();
}
