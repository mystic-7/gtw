function greetingsPool(name) {
  let greetings = [
    `Hola 👋🏻 *${name}*! un placer verte de nuevo por aquí`,
    `Que bueno verte de nuevo *${name}* 😄! Cuentame, ¿Como puedo ayudarte hoy?`,
    `Aqui estoy! Listo para ayudarte con lo que necesites *${name}*!`,
    `¡Bienvenido *${name}*! ¿En qué puedo ayudarte hoy? 👩‍🚀`,
    `¡Hola *${name}*! Estoy emocionado de verte de nuevo. 😄`,
    `Saludos *${name}*! ¿Cómo ha sido tu día hasta ahora?`,
    `¡Hola *${name}*! Espero que tengas un día maravilloso. Dime, ¿Como te ayudo? 🙌🏼`,
    `¡Qué alegría verte *${name}*! ¿Cómo puedo asistirte hoy?`,
    `Hola *${name}*! ¿Listo para comenzar? ✅`,
    `¡Hola *${name}*! Aquí estoy para ayudarte. 🚀`,
    `¡Saludos *${name}*! ¿Qué necesitas de mi hoy? 👩‍🚀 `,
    `¡Hola *${name}*! ¿Cómo puedo hacer tu día mejor? 😁`,
    `¡Hola *${name}*! Estoy aquí para ayudarte en lo que necesites.`,
    `¡Bienvenido *${name}*! ¿En qué puedo colaborar contigo hoy?`,
    `¡Hola *${name}*! Espero que tu día esté yendo de maravilla. 😊`,
    `¡Saludos *${name}*! ¿Hay algo en lo que pueda ayudarte hoy?`,
  ];

  return greetings[Math.floor(Math.random() * greetings.length)];
}

module.exports = {
  greetingsPool,
};
