// getCustomer(1, (customer) => {
//   console.log("Customer: ", customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log("Top movies: ", movies);
//       sendEmail(customer.email, movies, () => {
//         console.log("Email sent...");
//       });
//     });
//   }
// });

async function notifyCustomer() {
  const user = await getCustomer(1);
  console.log("Customer: ", user);
  if (user.isGold) {
    const movies = await getTopMovies();
    console.log("Top movies: ", movies);
    await sendEmail(user.email, movies);
    console.log("Email sent...");
  }
}
notifyCustomer();

function getCustomer(id) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res({
        id: 1,
        name: "Mosh Hamedani",
        isGold: true,
        email: "email",
      });
    }, 2000);
  });
}

function getTopMovies() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(["movie1", "movie2"]);
    }, 2000);
  });
}

function sendEmail(email, movies) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(["rafael.batistoti@kyndryl.com"]);
    }, 2000);
  });
}
