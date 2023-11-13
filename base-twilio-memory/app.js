const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
} = require('@bot-whatsapp/bot');

const TwilioProvider = require('@bot-whatsapp/provider/twilio');
const MockAdapter = require('@bot-whatsapp/database/mock');
const { EVENTS } = require('@bot-whatsapp/bot');

const flowCcsRespuesta = addKeyword(['1'], { sensitive: true }).addAnswer([
  'Pronto te va a contactar un miembro de esta surcursal 👩‍🚀',
]);

const flowDespedida = addKeyword(['2'], { sensitive: true }).addAnswer([
  'Gracias por contactarnos, desde Prosein siempre buscamos ofrecerle la mejor solución✨',
  'Recuerda que siempre estamos para ti.',
  'Síguenos en nuestras rede sociales',
  'https://www.instagram.com/proseinvenezuela/?hl=es-la',
  'https://www.tiktok.com/@prosein_venezuela',
  'Y no olvides pasarte por nuestra web',
  'https://prosein.com.ve/',
]);

var today = new Date();
var date =
  today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time =
  today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
var dateTime = date + ' ' + time;
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const flowBoleitaNorte = addKeyword(['1'], { sensitive: true })
  .addAnswer(
    'Boleíta Norte: Calle Sanatorio del Ávila, C.C. Ciudad Center nivel 1, Boleíta Norte. Horario de lunes a viernes de 8:30am a 5:30pm y sábado de 9:30am a 5:00pm.'
  )
  .addAnswer(
    [
      '¿Deseas recibir una cotización, conocer nuestras promociones o verificar la disponibilidad de productos en nuestra tienda?',
      '👉 *1* Si',
      '👉 *2* No',
    ],
    null,
    null,
    [flowCcsRespuesta, flowDespedida]
  );

const flowLaCastellana = addKeyword(['2'], { sensitive: true })
  .addAnswer(
    'La Castellana: Av. Principal de la Castellana, calle El Bosque con calle Chaguaramos, Edif. Prosein. Horario de lunes a viernes de 8:30am a 5:30pm y sábado de 9:30am a 5:00pm.'
  )
  .addAnswer(
    [
      '¿Deseas recibir una cotización, conocer nuestras promociones o verificar la disponibilidad de productos en nuestra tienda?',
      '👉 *1* Si',
      '👉 *2* No',
    ],
    null,
    null,
    [flowCcsRespuesta, flowDespedida]
  );

const flowElBosque = addKeyword(['3'], { sensitive: true })
  .addAnswer(
    'El Bosque: Av. Principal El Bosque, entre Av. Libertador y C.C. Chacaito, Edif. Prosein. Horario de lunes a viernes de 8:30am a 5:30pm y sábado de 9:30am a 5:00pm.'
  )
  .addAnswer(
    [
      '¿Deseas recibir una cotización, conocer nuestras promociones o verificar la disponibilidad de productos en nuestra tienda?',
      '👉 *1* Si',
      '👉 *2* No',
    ],
    null,
    null,
    [flowCcsRespuesta, flowDespedida]
  );
const flowLasMercedes = addKeyword(['4'], { sensitive: true })
  .addAnswer(
    'Las Mercedes: Calle París, entre New York y Caroní, Quinta Prosein. Horario de lunes a viernes de 8:30am a 5:30pm y sábado de 9:30am a 5:00pm.'
  )
  .addAnswer(
    [
      '¿Deseas recibir una cotización, conocer nuestras promociones o verificar la disponibilidad de productos en nuestra tienda?',
      '👉 *1* Si',
      '👉 *2* No',
    ],
    null,
    null,
    [flowCcsRespuesta, flowDespedida]
  );
const flowLosNaranjos = addKeyword(['5'], { sensitive: true })
  .addAnswer(
    'Los Naranjos: C.C. Casa Mall, local a1, cruce Av. Principal Los Naranjos con carretera El Cafetal. Horario de lunes a sábado de 10:00am a 6:00pm.'
  )
  .addAnswer(
    [
      '¿Deseas recibir una cotización, conocer nuestras promociones o verificar la disponibilidad de productos en nuestra tienda?',
      '👉 *1* Si',
      '👉 *2* No',
    ],
    null,
    null,
    [flowCcsRespuesta, flowDespedida]
  );
const flowCatia = addKeyword(['6'], { sensitive: true })
  .addAnswer(
    'Catia: Calle Panamericana, entre calle Chile y Bolivia, galpón n°30. Horario de lunes a viernes de 8:00am a 5:00pm y sábado de 9:00am a 2:00pm. \n\n Si deseas contactarte para una cotización, promociones y disponibilidad de productos, este es el contacto de la tienda: https://wa.me/+584242723741'
  )
  .addAnswer(
    [
      '¿Deseas recibir una cotización, conocer nuestras promociones o verificar la disponibilidad de productos en nuestra tienda?',
      '👉 *1* Si',
      '👉 *2* No',
    ],
    null,
    null,
    [flowCcsRespuesta, flowDespedida]
  );

const flowCaracas = addKeyword(['1'], { sensitive: true }).addAnswer(
  [
    'Por favor indica el numero de la sucursal de la cual deseas tener información\n\n',
    '1. Boleíta Norte',
    '2. La Castellana',
    '3. El Bosque',
    '4. Las Mercedes',
    '5. Los Naranjos',
    '6. Catia',
  ],
  { capture: true },
  null,
  [
    flowBoleitaNorte,
    flowLaCastellana,
    flowElBosque,
    flowLasMercedes,
    flowLosNaranjos,
    flowCatia,
  ]
);

const flowMiranda = addKeyword(['2'], { sensitive: true }).addAnswer(
  [
    'Por favor indica el numero de la sucursal de la cual deseas tener información\n\n',
    '1. Los Teques | El Tambor',
    '2. Los Teques | San Antonio',
  ],
  { capture: true },
  (ctx, { fallBack, flowDynamic }) => {
    if (ctx.body == '1') {
      flowDynamic(
        'Los Teques | El Tambor: Av. Williams Torbay, local Nº 21 y 23, Bajada El Tambor, zona industrial El Tambor, Sector La Lomita. Horario de lunes a sábado 8:00am a 2:00pm. \n\n Si deseas contactarte para una cotización, promociones y disponibilidad de productos, este es el contacto de la tienda: https://wa.me/+584242980957'
      );
      const myState = state.getMyState();
      if (myState.motivo === '1') {
        flowDynamic(
          'Si deseas contactarnos para obtener una cotización, conocer nuestras promociones y verificar la disponibilidad de productos, este es el contacto de la tienda'
        );
      } else if (myState.motivo === '3') {
        flowDynamic(
          'Por favor comunicate con esta sucursal para recibir información referente a tu cotización deseada'
        );
      } else if (myState.motivo === '4') {
        flowDynamic(
          'Por favor comunicate con esta sucursal para recibir información referente a promociones'
        );
      } else if (myState.motivo === '5') {
        flowDynamic(
          'Por favor comunicate con esta sucursal para recibir información referente a disponibilidad'
        );
      }
    } else if (ctx.body == '2') {
      flowDynamic(
        'Los Teques | San Antonio: Av. Chaid Torbay, edificio Industrial Campestre, piso 1, local 1, sector ind. Las Minas. San Antonio de los Altos. Al lado de autolavado Twister. Horario de lunes a sábado 8:00am a 2:00pm.'
      );
      const myState = state.getMyState();
      if (myState.motivo === '1') {
        flowDynamic(
          'Si deseas contactarnos para obtener una cotización, conocer nuestras promociones y verificar la disponibilidad de productos, este es el contacto de la tienda'
        );
      } else if (myState.motivo === '3') {
        flowDynamic(
          'Por favor comunicate con esta sucursal para recibir información referente a tu cotización deseada'
        );
      } else if (myState.motivo === '4') {
        flowDynamic(
          'Por favor comunicate con esta sucursal para recibir información referente a promociones'
        );
      } else if (myState.motivo === '5') {
        flowDynamic(
          'Por favor comunicate con esta sucursal para recibir información referente a disponibilidad'
        );
      }
    } else {
      return fallBack();
    }
  }
);

const flowLaguaira = addKeyword(['3'], { sensitive: true })
  .addAnswer([
    'En La guaira estamos ubicados en Av. La Armada, sector la lucha, local Prosein. Frente a Farmatodo, Catia La Mar. Horario de lunes a viernes 8:00am a 5:00pm y sábado 8:00am a 3:00pm. \n\n Si deseas contactarte para una cotización, promociones y disponibilidad de productos, este es el contacto de la tienda: https://wa.me/+584129206276',
  ])
  .addAction((ctx, { fallBack, flowDynamic, state }) => {
    const myState = state.getMyState();
    console.log(myState.motivo);

    if (myState.motivo === '1') {
      flowDynamic(
        'Si deseas contactarnos para obtener una cotización, conocer nuestras promociones y verificar la disponibilidad de productos, este es el contacto de la tienda'
      );
    } else if (myState.motivo === '3') {
      flowDynamic(
        'Por favor comunicate con esta sucursal para recibir información referente a tu cotización deseada'
      );
    } else if (myState.motivo === '4') {
      flowDynamic(
        'Por favor comunicate con esta sucursal para recibir información referente a promociones'
      );
    } else if (myState.motivo === '5') {
      flowDynamic(
        'Por favor comunicate con esta sucursal para recibir información referente a disponibilidad'
      );
    }
  });

const flowAragua = addKeyword(['4'], { sensitive: true }).addAnswer(
  [
    'Por favor indica el numero de la sucursal de la cual deseas tener información\n\n',
    '1. Maracay | La Morita',
    '2. Maracay | Los Cedros',
  ],
  { capture: true },
  (ctx, { fallBack, flowDynamic, state }) => {
    if (ctx.body === '1') {
      flowDynamic(
        'Maracay | La Morita: Av. Intercomunal Turmero - Maracay, C.C.I Metropolitano, edificio Techomat. Horario de lunes a viernes 8:00am a 4:00pm y sábado 8:00am a 2:00pm. \n\n Si deseas contactarte para una cotización, promociones y disponibilidad de productos, este es el contacto de la tienda: https://wa.me/+584243608589'
      );
      const myState = state.getMyState();
      if (myState.motivo === '1') {
        flowDynamic(
          'Si deseas contactarnos para obtener una cotización, conocer nuestras promociones y verificar la disponibilidad de productos, este es el contacto de la tienda'
        );
      } else if (myState.motivo === '3') {
        flowDynamic(
          'Por favor comunicate con esta sucursal para recibir información referente a tu cotización deseada'
        );
      } else if (myState.motivo === '4') {
        flowDynamic(
          'Por favor comunicate con esta sucursal para recibir información referente a promociones'
        );
      } else if (myState.motivo === '5') {
        flowDynamic(
          'Por favor comunicate con esta sucursal para recibir información referente a disponibilidad'
        );
      }
    } else if (ctx.body === '2') {
      flowDynamic(
        'Maracay | Los Cedros: Av. Los Cedros N° 154, entre fuerzas aéreas y Bermúdez, Sector Santa Ana. Horario de lunes a viernes 8:00am a 4:00pm y sábado 8:00am a 2:00pm. \n\n Si deseas contactarte para una cotización, promociones y disponibilidad de productos, este es el contacto de la tienda: https://wa.me/+584243608589'
      );
      const myState = state.getMyState();
      if (myState.motivo === '1') {
        flowDynamic(
          'Si deseas contactarnos para obtener una cotización, conocer nuestras promociones y verificar la disponibilidad de productos, este es el contacto de la tienda'
        );
      } else if (myState.motivo === '3') {
        flowDynamic(
          'Por favor comunicate con esta sucursal para recibir información referente a tu cotización deseada'
        );
      } else if (myState.motivo === '4') {
        flowDynamic(
          'Por favor comunicate con esta sucursal para recibir información referente a promociones'
        );
      } else if (myState.motivo === '5') {
        flowDynamic(
          'Por favor comunicate con esta sucursal para recibir información referente a disponibilidad'
        );
      }
    } else {
      return fallBack();
    }
  }
);

const flowCarabobo = addKeyword(['5'], { sensitive: true })
  .addAnswer([
    'En Carabobo estamos ubicados en Valencia: Av. Monseñor Adams, calle 161, Urbanización El Viñedo, casa 104-61. Horario de lunes a viernes 8:30am a 5:00pm y sábado de 8:30am a 2:00pm. \n\n Si deseas contactarte para una cotización, promociones y disponibilidad de productos, este es el contacto de la tienda: https://wa.me/+584244618284',
  ])
  .addAction((ctx, { fallBack, flowDynamic, state }) => {
    const myState = state.getMyState();
    console.log(myState.motivo);

    if (myState.motivo === '1') {
      flowDynamic(
        'Si deseas contactarnos para obtener una cotización, conocer nuestras promociones y verificar la disponibilidad de productos, este es el contacto de la tienda'
      );
    } else if (myState.motivo === '3') {
      flowDynamic(
        'Por favor comunicate con esta sucursal para recibir información referente a tu cotización deseada'
      );
    } else if (myState.motivo === '4') {
      flowDynamic(
        'Por favor comunicate con esta sucursal para recibir información referente a promociones'
      );
    } else if (myState.motivo === '5') {
      flowDynamic(
        'Por favor comunicate con esta sucursal para recibir información referente a disponibilidad'
      );
    }
  });

const flowLara = addKeyword(['6'], { sensitive: true })
  .addAnswer([
    'En Lara estamos ubicados en Barquisimeto: Urb. Nueva Segovia, calle 6 con carrera 2 y 3. Horario de lunes a viernes de 8:30am a 5:30pm y sábado de 9:30am a 5:00pm. \n\n Si deseas contactarte para una cotización, promociones y disponibilidad de productos, este es el contacto de la tienda: https://wa.me/+584126122439',
  ])
  .addAction((ctx, { fallBack, flowDynamic, state }) => {
    const myState = state.getMyState();
    console.log(myState.motivo);

    if (myState.motivo === '1') {
      flowDynamic(
        'Si deseas contactarnos para obtener una cotización, conocer nuestras promociones y verificar la disponibilidad de productos, este es el contacto de la tienda'
      );
    } else if (myState.motivo === '3') {
      flowDynamic(
        'Por favor comunicate con esta sucursal para recibir información referente a tu cotización deseada'
      );
    } else if (myState.motivo === '4') {
      flowDynamic(
        'Por favor comunicate con esta sucursal para recibir información referente a promociones'
      );
    } else if (myState.motivo === '5') {
      flowDynamic(
        'Por favor comunicate con esta sucursal para recibir información referente a disponibilidad'
      );
    }
  });

const flowPortuguesa = addKeyword(['7'], { sensitive: true })
  .addAnswer([
    'En Portuguesa estamos ubicados en Acarigua: Av. Circunvalación Sur, entre calles 3 y 4, Barrio San Antonio, Local Prosein, zona industrial. Horario de lunes a viernes de 8:00am a 5:00pm y sábado de 8:00am a 1:00pm. \n\n Si deseas contactarte para una cotización, promociones y disponibilidad de productos, este es el contacto de la tienda: https://wa.me/+584126122517',
  ])
  .addAction((ctx, { fallBack, flowDynamic, state }) => {
    const myState = state.getMyState();
    console.log(myState.motivo);

    if (myState.motivo === '1') {
      flowDynamic(
        'Si deseas contactarnos para obtener una cotización, conocer nuestras promociones y verificar la disponibilidad de productos, este es el contacto de la tienda'
      );
    } else if (myState.motivo === '3') {
      flowDynamic(
        'Por favor comunicate con esta sucursal para recibir información referente a tu cotización deseada'
      );
    } else if (myState.motivo === '4') {
      flowDynamic(
        'Por favor comunicate con esta sucursal para recibir información referente a promociones'
      );
    } else if (myState.motivo === '5') {
      flowDynamic(
        'Por favor comunicate con esta sucursal para recibir información referente a disponibilidad'
      );
    }
  });

const flowBarinas = addKeyword(['8'], { sensitive: true }).addAnswer(
  [
    'Por favor indica el numero de la sucursal de la cual deseas tener información:\n\n',
    '1. Av. Libertad',
    '2. Alto Barinas',
  ],
  { capture: true },
  (ctx, { fallBack, flowDynamic, state }) => {
    if (ctx.body === '1') {
      const myState = state.getMyState();
      flowDynamic(
        'Av. Libertad: Av. Libertad entre Av. Br. Elias Cordero y calle Aranjuez, sector San Jose local 16-58. Horario de lunes a viernes 8:00am a 5:00pm y sábado 8:00am a 1:00pm. \n\n Si deseas contactarte para una cotización, promociones y disponibilidad de productos, este es el contacto de la tienda: https://wa.me/+584141584959'
      );
      if (myState.motivo === '1') {
        flowDynamic(
          'Si deseas contactarnos para obtener una cotización, conocer nuestras promociones y verificar la disponibilidad de productos, este es el contacto de la tienda'
        );
      } else if (myState.motivo === '3') {
        flowDynamic(
          'Por favor comunicate con esta sucursal para recibir información referente a tu cotización deseada'
        );
      } else if (myState.motivo === '4') {
        flowDynamic(
          'Por favor comunicate con esta sucursal para recibir información referente a promociones'
        );
      } else if (myState.motivo === '5') {
        flowDynamic(
          'Por favor comunicate con esta sucursal para recibir información referente a disponibilidad'
        );
      }
    } else if (ctx.body === '2') {
      const myState = state.getMyState();
      flowDynamic(
        'Alto Barinas: Av. Tachira, entre Av. Venezuela y calle Suiza, Edif. ADT, piso PB, local N° 1, Urb. Alto Barinas Sur, 5201. Horario de lunes a viernes 8:00am a 5:00pm y sábado 8:00am a 1:00pm. \n\n Si deseas contactarte para una cotización, promociones y disponibilidad de productos, este es el contacto de la tienda: https://wa.me/+584141584959'
      );
      if (myState.motivo === '1') {
        flowDynamic(
          'Si deseas contactarnos para obtener una cotización, conocer nuestras promociones y verificar la disponibilidad de productos, este es el contacto de la tienda'
        );
      } else if (myState.motivo === '3') {
        flowDynamic(
          'Por favor comunicate con esta sucursal para recibir información referente a tu cotización deseada'
        );
      } else if (myState.motivo === '4') {
        flowDynamic(
          'Por favor comunicate con esta sucursal para recibir información referente a promociones'
        );
      } else if (myState.motivo === '5') {
        flowDynamic(
          'Por favor comunicate con esta sucursal para recibir información referente a disponibilidad'
        );
      }
    } else {
      return fallBack();
    }
  }
);

const flowFalcon = addKeyword(['9'], { sensitive: true })
  .addAnswer([
    'En Falcon estamos ubicados en Punto Fijo: Av. Ollarvides entre Av. Táchira y Girardot, sector Parcelamiento El Jardín, local Prosein. Horario de lunes a viernes de 8:00am a 5:00pm. \n\n Si deseas contactarte para una cotización, promociones y disponibilidad de productos, este es el contacto de la tienda: https://wa.me/+584146934026',
  ])
  .addAction((ctx, { fallBack, flowDynamic, state }) => {
    const myState = state.getMyState();
    console.log(myState.motivo);

    if (myState.motivo === '1') {
      flowDynamic(
        'Si deseas contactarnos para obtener una cotización, conocer nuestras promociones y verificar la disponibilidad de productos, este es el contacto de la tienda'
      );
    } else if (myState.motivo === '3') {
      flowDynamic(
        'Por favor comunicate con esta sucursal para recibir información referente a tu cotización deseada'
      );
    } else if (myState.motivo === '4') {
      flowDynamic(
        'Por favor comunicate con esta sucursal para recibir información referente a promociones'
      );
    } else if (myState.motivo === '5') {
      flowDynamic(
        'Por favor comunicate con esta sucursal para recibir información referente a disponibilidad'
      );
    }
  });

const flowZulia = addKeyword(['10'], { sensitive: true }).addAnswer(
  [
    'Por favor indica el numero de la sucursal de la cual deseas tener información\n\n',
    '1. Maracaibo | Calle 70 ',
    '2. Maracaibo | Milagro Norte',
  ],
  { capture: true },
  (ctx, { fallBack, flowDynamic }) => {
    if (ctx.body === '1') {
      flowDynamic(
        'Maracaibo | Calle 70: Calle 70 con Av. 12, C.C. P&P, locales 1 y 2. Horario de lunes a viernes 8:00am a 5:00pm y sábado 8:00am a 12:30pm. \n\n Si deseas contactarte para una cotización, promociones y disponibilidad de productos, este es el contacto de la tienda: https://wa.me/+584123955718'
      );
    } else if (ctx.body === '2') {
      flowDynamic(
        'Maracaibo | Milagro Norte: Av. 22, C.C. Prosein, sector Milagro Norte, vía la Barraca, al lado de la Res. Aguamarina. Horario de lunes a viernes 8:00am a 5:00pm y sábado 8:00am a 12:30pm. \n\n Si deseas contactarte para una cotización, promociones y disponibilidad de productos, este es el contacto de la tienda: https://wa.me/+584123955716'
      );
    } else {
      return fallBack();
    }
  }
);

const flowTrujillo = addKeyword(['11'], { sensitive: true })
  .addAnswer([
    'En Trujillo estamos ubicados en Valera: Av. Bolívar, entre calle 26 y 27, Qta Yraidis, sector Las Acacias. Punto de referencia diagonal a Farmatodo. Horario de lunes a viernes 8:30am a 5:00pm y sábado 8:30am a 1:00pm. \n\n Si deseas contactarte para una cotización, promociones y disponibilidad de productos, este es el contacto de la tienda: https://wa.me/+584147304401',
  ])
  .addAction((ctx, { fallBack, flowDynamic, state }) => {
    const myState = state.getMyState();
    console.log(myState.motivo);

    if (myState.motivo === '1') {
      flowDynamic(
        'Si deseas contactarnos para obtener una cotización, conocer nuestras promociones y verificar la disponibilidad de productos, este es el contacto de la tienda'
      );
    } else if (myState.motivo === '3') {
      flowDynamic(
        'Por favor comunicate con esta sucursal para recibir información referente a tu cotización deseada'
      );
    } else if (myState.motivo === '4') {
      flowDynamic(
        'Por favor comunicate con esta sucursal para recibir información referente a promociones'
      );
    } else if (myState.motivo === '5') {
      flowDynamic(
        'Por favor comunicate con esta sucursal para recibir información referente a disponibilidad'
      );
    }
  });

const flowMerida = addKeyword(['12'], { sensitive: true }).addAnswer(
  [
    'Por favor indica el numero de la sucursal de la cual deseas tener información\n\n',
    '1. Ejido',
    '2. Av. Las Américas',
  ],
  { capture: true },
  (ctx, { fallBack, flowDynamic }) => {
    if (ctx.body === '1') {
      flowDynamic(
        'Ejido: Av. Bolívar, local Nro 219, Sector Montalbán, Ejido Mérida. Horario de lunes a viernes 8:00am a 4:00pm y sábado 9:00am a 12:00 pm. \n\n Si deseas contactarte para una cotización, promociones y disponibilidad de productos, este es el contacto de la tienda: https://wa.me/+58416-055-7759'
      );
    } else if (ctx.body === '2') {
      flowDynamic(
        'Av. Las Américas: Av. Las Américas, CC Terracota nivel PB Local 11B. Horario de lunes a sábado 8:30am a 06:30pm.'
      );
    } else {
      return fallBack();
    }
  }
);

const flowAnzoategui = addKeyword(['13'], { sensitive: true })
  .addAnswer([
    'En Anzoategui estamos ubicados en Lechería: Av. Intercomunal Jorge Rodríguez, Sector Las Garzas, C.C. Las Garzas, Local D |Horario de lunes a viernes 8:00am a 5:00pm y sábado 8:00am a 1:00pm. \n\n Si deseas contactarte para una cotización, promociones y disponibilidad de productos, este es el contacto de la tienda: https://wa.me/+584123641194',
  ])
  .addAction((ctx, { fallBack, flowDynamic, state }) => {
    const myState = state.getMyState();
    console.log(myState.motivo);

    if (myState.motivo === '1') {
      flowDynamic(
        'Si deseas contactarnos para obtener una cotización, conocer nuestras promociones y verificar la disponibilidad de productos, este es el contacto de la tienda'
      );
    } else if (myState.motivo === '3') {
      flowDynamic(
        'Por favor comunicate con esta sucursal para recibir información referente a tu cotización deseada'
      );
    } else if (myState.motivo === '4') {
      flowDynamic(
        'Por favor comunicate con esta sucursal para recibir información referente a promociones'
      );
    } else if (myState.motivo === '5') {
      flowDynamic(
        'Por favor comunicate con esta sucursal para recibir información referente a disponibilidad'
      );
    }
  });

const flowNuevaEsparta = addKeyword(['14'], { sensitive: true })
  .addAnswer([
    'En Nueva Esparta estamos ubicados en Porlamar: Av. Circunvalación José Asunción Rodríguez, a 100 mts del mercado de Conejeros. Horario de lunes a viernes 8:30am a 5:00pm y sábado de 8:30am a 2:00pm. \n\n Si deseas contactarte para una cotización, promociones y disponibilidad de productos, este es el contacto de la tienda: https://wa.me/+584248196999',
  ])
  .addAction((ctx, { fallBack, flowDynamic, state }) => {
    const myState = state.getMyState();
    console.log(myState.motivo);

    if (myState.motivo === '1') {
      flowDynamic(
        'Si deseas contactarnos para obtener una cotización, conocer nuestras promociones y verificar la disponibilidad de productos, este es el contacto de la tienda'
      );
    } else if (myState.motivo === '3') {
      flowDynamic(
        'Por favor comunicate con esta sucursal para recibir información referente a tu cotización deseada'
      );
    } else if (myState.motivo === '4') {
      flowDynamic(
        'Por favor comunicate con esta sucursal para recibir información referente a promociones'
      );
    } else if (myState.motivo === '5') {
      flowDynamic(
        'Por favor comunicate con esta sucursal para recibir información referente a disponibilidad'
      );
    }
  });

const flowBolivar = addKeyword(['15'], { sensitive: true })
  .addAnswer([
    'En Bolivar estamos ubicados en Puerto Ordaz: Av. Las Américas, edif. Otto, mezzanina #06. Horario de lunes a viernes de 8:00am a 4:00pm. \n\n Si deseas contactarte para una cotización, promociones y disponibilidad de productos, este es el contacto de la tienda: https://wa.me/+58424-914-3004',
  ])
  .addAction((ctx, { fallBack, flowDynamic, state }) => {
    const myState = state.getMyState();
    console.log(myState.motivo);

    if (myState.motivo === '1') {
      flowDynamic(
        'Si deseas contactarnos para obtener una cotización, conocer nuestras promociones y verificar la disponibilidad de productos, este es el contacto de la tienda'
      );
    } else if (myState.motivo === '3') {
      flowDynamic(
        'Por favor comunicate con esta sucursal para recibir información referente a tu cotización deseada'
      );
    } else if (myState.motivo === '4') {
      flowDynamic(
        'Por favor comunicate con esta sucursal para recibir información referente a promociones'
      );
    } else if (myState.motivo === '5') {
      flowDynamic(
        'Por favor comunicate con esta sucursal para recibir información referente a disponibilidad'
      );
    }
  });

const flowTiendas = addKeyword(['1', '3', '4', '5'], {
  sensitive: true,
}).addAnswer(
  [
    'Por favor indique el número la ciudad o estado de interes para obtener información de las sucursales disponibles:\n',
    '1. Caracas',
    '2. Miranda',
    '3. La Guaira',
    '4. Aragua',
    '5. Carabobo',
    '6. Lara',
    '7. Portuguesa',
    '8. Barinas',
    '9. Falcón',
    '10. Zulia',
    '11. Trujillo',
    '12. Mérida',
    '13. Anzoátegui',
    '14. Nueva Esparta',
    '15. Bolívar',
  ],
  null,
  null,
  [
    flowCaracas,
    flowMiranda,
    flowLaguaira,
    flowAragua,
    flowCarabobo,
    flowLara,
    flowPortuguesa,
    flowBarinas,
    flowFalcon,
    flowZulia,
    flowTrujillo,
    flowMerida,
    flowAnzoategui,
    flowNuevaEsparta,
    flowBolivar,
  ]
);

const flowCatalogo = addKeyword(['2'], { sensitive: true })
  .addAnswer(
    [
      '¿Qué catálogo desea ver? Escriba el número de la opción:',
      '1. Novedades 2023',
      '2. Novedades Brasil',
      '3. Vinil',
      '4. General',
    ],
    { capture: true },
    async (ctx, { fallBack, flowDynamic }) => {
      if (ctx.body == '1') {
        await flowDynamic(
          ' Novedades 2023\n\n https://prosein.com.ve/wp-content/uploads/2023/06/Catálogo-NOVEDADES-2023.pdf '
        );
      } else if (ctx.body == '2') {
        await flowDynamic(
          ' Novedades Brasil\n\n https://prosein.com.ve/wp-content/uploads/2023/05/CATÁLOGO-BRASIL_Novedades-2023.pdf '
        );
      } else if (ctx.body == '3') {
        await flowDynamic(
          ' Vinil\n\n https://prosein.com.ve/wp-content/uploads/2023/01/5.VINIL-LVT_NOVEDADES_2020.pdf '
        );
      } else if (ctx.body == '4') {
        await flowDynamic(
          ' General \n\n https://prosein.com.ve/wp-content/uploads/2021/06/PARTE-1-SERIES_2021-1.pdf '
        );
      } else {
        return fallBack();
      }
    }
  )
  .addAnswer(
    ['¿Deseas cotizar algún producto?', '👉 *1* Si', '👉 *2* No'],
    {
      delay: 1000,
    },
    null,
    [flowTiendas, flowDespedida]
  );

const flowReclamosSugerencias = addKeyword(['6'], {
  sensitive: true,
}).addAnswer(
  ['¿En qué podemos ayudarte?'],
  { capture: true },
  async (ctx, { fallBack, flowDynamic, state }) => {
    const horaActual = new Date().getHours();
    if (horaActual >= 7 && horaActual < 17) {
      await flowDynamic([
        {
          body: 'Estimado cliente, lamentamos su experiencia.\n\n Entendemos su frustración y nos disculpamos por cualquier inconveniente que haya tenido.\n\n En minutos será atendido.',
        },
      ]);
    } else if (horaActual >= 17) {
      await flowDynamic([
        {
          body: 'Estimado cliente, lamentamos su experiencia.\n\n Entendemos su frustración y nos disculpamos por cualquier inconveniente que haya tenido.\n\n Actualmente nos encontramos cerrados. Próximamente recibirá atención personalizada.',
        },
      ]);
    } else {
      fallBack();
    }
  }
);

const flowString = addKeyword('asd').addAnswer(
  'Este mensaje envia tres botones',
  {
    buttons: [{ body: 'Boton 1' }, { body: 'Boton 2' }, { body: 'Boton 3' }],
  }
);

const saludoRegex = `/^(buenos dias|buenas tardes|buenas noches|buen dia|hola|ola)$/i`;

const flowPrincipal = addKeyword('hola')
  .addAnswer('¡Gracias por contactar a *Prosein*! 🙌🏼.')
  .addAnswer(
    'Indíquenos tu Nombre y Apellido',
    { capture: true },
    (ctx, { fallBack, flowDynamic, state }) => {
      state.update({ nombre: ctx.body });
      const myState = state.getMyState();
    }
  )
  .addAnswer(
    'Indíquenos tu Correo',
    { capture: true },
    (ctx, { fallBack, flowDynamic, state }) => {
      if (ctx.body.includes('@')) {
        state.update({ correo: ctx.body });
        const myState = state.getMyState();
        flowDynamic(
          `Gracias ${myState.nombre} ${myState.correo} por tu informacion!`
        );
      }
    }
  )
  .addAnswer(
    [
      'Cuéntanos, ¿cómo podemos ayudarte? Escriba el número de la opción que desee:',
      '👉 *1* Información: Horarios y Ubicaciones',
      '👉 *2* Catálogo',
      '👉 *3* Cotizar productos',
      '👉 *4* Promociones',
      '👉 *5* Disponibilidad de un Producto',
      '👉 *6* Reclamos y Sugerencias',
    ],
    { capture: true },
    (ctx, { state }) => {
      state.update({ motivo: ctx.body });
    },
    [flowCatalogo, flowTiendas, flowReclamosSugerencias, flowString]
  );

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([flowPrincipal]);

  const adapterProvider = createProvider(TwilioProvider, {
    accountSid: 'AC520009ca0a7a922be37ef85be3670a16',
    authToken: '6485106d2888c1fa26b3e70edfa12d95',
    vendorNumber: '+14155238886',
  });

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
};

main();
