function greetingsPool(name) {
  let greetings = [
    `Hola 👋🏻 *${name}*! un placer verte de nuevo por aquí`,
    `Que bueno verte de nuevo *${name}*! 😄`,
    `Por aquí *Ada* 👩‍🚀! Lista para ayudarte con lo que necesites *${name}*!`,
  ];

  return greetings[Math.floor(Math.random() * greetings.length)];
}

module.exports = {
  greetingsPool,
};
