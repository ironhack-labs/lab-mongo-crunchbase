function mainMenu () {
  clear();
  printMenu();
  rl.question('Type an option: ', (option) => {
    switch (option) {
    case '1':
      db.collection('companies').find({}, {name: 1, _id: 0}).toArray((error, result) => {
        if (error) {
          console.log(error);
          rl.question(`\nType enter to continue: `, (answer) => { mainMenu(); });
        } else {
          console.log(result);
          rl.question(`\nType enter to continue: `, (answer) => { mainMenu(); });
        }
      });
      break;
      case '2':
      db.collection('companies').count((error, result) => {
        if (error) {
          console.log(error);
          rl.question(`\nType enter to continue: `, (answer) => { mainMenu(); });
        } else {
          console.log(result);
          rl.question(`\nType enter to continue: `, (answer) => { mainMenu(); });
        }
      });
      break;
      case '3':
      db.collection('companies').count({founded_year:2004}, (error, result) => {
        if (error) {
          console.log(error);
          rl.question(`\nType enter to continue: `, (answer) => { mainMenu(); });
        } else {
          console.log(result);
          rl.question(`\nType enter to continue: `, (answer) => { mainMenu(); });
        }
      });
      break;
      case '4':
          db.collection('companies').find({founded_year:2004, founded_month:4-6}, {name: 1, _id: 0}).toArray((error, result) => {
            if (error) {
              console.log(error);
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu(); });
            } else {
              console.log(result);
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu(); });
            }
          });
          break;
          case '4':
          db.collection('companies').find({founded_year: 2004, founded_month: 2}, {name: 1, _id: 0}).toArray((error, result) => {
            if (error) {
              console.log(error);
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu(); });
            } else {
              console.log(result);
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu(); });
            }
          });
          break;
    case '0':
      console.log(`👋👋👋👋 😞 \n`);
      db.close((error) => { process.exit(0); });
      break;
    default:
      mainMenu();
      break;
    }
  });
}

mainMenu();
}
});
