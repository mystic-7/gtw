const delays = 4000
const delays_f = 1500
const {
  addKeyword,
} = require('@bot-whatsapp/bot');
const {flowTiendas} = require('./cities')
const {flowCatalogo} = require('./catalogs')
const { airtablePost} = require("./http-service");

const flowReclamosSugerencias = addKeyword(['6'], {
    sensitive: true , delay:delays,
  }).addAnswer(
    ['¿En qué podemos ayudarte?'],
    { capture: true },
    async (ctx, { fallBack, flowDynamic, state }) => {
      const horaActual = new Date().getHours();
      if (horaActual >= 7 && horaActual < 17) {
        await flowDynamic([
          {
            body: 'Estimado cliente, lamentamos su experiencia.\n\nEntendemos su frustración y nos disculpamos por cualquier inconveniente que haya tenido.\n\nEn minutos será atendido.',
          },
        ]);
      } else if (horaActual >= 17) {
        await flowDynamic([
          {
            body: 'Estimado cliente, lamentamos su experiencia.\n\nEntendemos su frustración y nos disculpamos por cualquier inconveniente que haya tenido.\n\nActualmente nos encontramos cerrados. Próximamente recibirá atención personalizada.',
          },{
            delay:delays_f
          },
        ]);
      } else {
        fallBack();
      }
    }
  );
  
const saludoRegex = `/^(buenos dias|buenas tardes|buenas noches|buen dia|hola|ola)$/i`;
  
  
const flowRegistro = addKeyword('USUARIOS_NO_REGISTRADOS')
  .addAnswer('Veo que es tu primera vez por aqui')
  .addAnswer(
    'Indíquenos tu Nombre Completo',
    { capture: true },
    (ctx, { state }) => {
      state.update({ nombre: ctx.body });
      const myState = state.getMyState();
    }
  ).addAnswer(
    'Indíquenos tu Correo',
    { capture: true },
    async (ctx, {flowDynamic, state,gotoFlow }) => {
      if (ctx.body.includes('@')) {
        state.update({ correo: ctx.body });
        const myState = state.getMyState();
        flowDynamic(
          `Gracias ${myState.nombre} por tu informacion!`
        );
      }
      const myState = state.getMyState();
      airtablePost(myState,ctx)
      return await gotoFlow(flowOpciones)
    }
  )
  
const flowOpciones = addKeyword('LISTA_DE_TIENDASSS').addAnswer(
    [
      'Cuéntanos , ¿cómo podemos ayudarte? Escriba el número de la opción que desee:',
      '👉 *1* Información: Horarios y Ubicaciones',
      '👉 *2* Catálogo',
      '👉 *3* Cotizar productos',
      '👉 *4* Promociones',
      '👉 *5* Disponibilidad de un Producto',
      '👉 *6* Reclamos y Sugerencias',
    ],
    { capture: true,delay: delays },
    (ctx, { state,fallBack,flowDynamic }) => {
      if (ctx.body === '1' || ctx.body === '2' || ctx.body === '3' || ctx.body === '4' || ctx.body === '5' || ctx.body === '6') {
        state.update({ motivo: ctx.body });
      } else {
        flowDynamic([
          {
            body: `Disculpa, elige una de las opciones para poder ayudarte.`
            ,
          },{
            delay:delays_f
          },
        ]);
        fallBack();
      }
    },
    [flowCatalogo, flowTiendas, flowReclamosSugerencias]
  );
  

const flowDespedida = addKeyword(['2'], { sensitive: true , delay:delays }).addAnswer([
    'Gracias por contactarnos, desde Prosein siempre buscamos ofrecerle la mejor solución',
    'Recuerda que siempre estamos para ti.',
    'Síguenos en nuestras rede sociales',
    'https://www.instagram.com/proseinvenezuela/?hl=es-la',
    'https://www.tiktok.com/@prosein_venezuela',
    'Y no olvides pasarte por nuestra web',
    'https://prosein.com.ve/',
  ]);

  
const flowgracias = addKeyword(['gracias','grax','gracias!'], { sensitive: true , delay:delays }).addAnswer([
    'Es un placer poder atenderlo',
  ]);


module.exports = {
    flowgracias,
    flowReclamosSugerencias,
    flowDespedida,
    flowOpciones,
    flowRegistro
  };