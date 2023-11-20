const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
} = require('@bot-whatsapp/bot');
const { flowCatalogo,flowTiendas,flowReclamosSugerencias} = require("./app.js");

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
  

module.exports = {
    flowOpciones
  };