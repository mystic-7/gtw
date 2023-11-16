const delays = 4000
const delays_f = 1500
const {
  addKeyword,
} = require('@bot-whatsapp/bot');

const {flowTiendas} = require('./cities')
const {flowDespedida} = require('./other_modules')



const flowCatalogoNovedades2023 = addKeyword(['1'], { sensitive: true , delay:delays})
.addAnswer(' General \n\nhttps://prosein.com.ve/wp-content/uploads/2021/06/PARTE-1-SERIES_2021-1.pdf ')
.addAnswer(
  [
    '¿Deseas cotizar algún producto?', 
    '👉 *1* Si', 
    '👉 *2* No',
  ],
  { capture: true,delay: delays },
  (ctx, { state,fallBack,flowDynamic }) => {
    if (ctx.body === '1' || ctx.body === '2') {
      state.update({ motivo: ctx.body });
      state.update({ cotizar: ctx.body });
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
  [flowTiendas, flowDespedida]
);
const flowCatalogoBrasil = addKeyword(['2'], { sensitive: true , delay:delays})
.addAnswer(' Novedades Brasil\n\nhttps://prosein.com.ve/wp-content/uploads/2023/05/CATÁLOGO-BRASIL_Novedades-2023.pdf ')
.addAnswer(
  [
    '¿Deseas cotizar algún producto?', 
    '👉 *1* Si', 
    '👉 *2* No',
  ],
  { capture: true,delay: delays },
  (ctx, { state,fallBack,flowDynamic }) => {
    if (ctx.body === '1' || ctx.body === '2') {
      state.update({ motivo: ctx.body });
      state.update({ cotizar: ctx.body });
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
  [flowTiendas, flowDespedida]
);
const flowCatalogoVinil = addKeyword(['3'], { sensitive: true , delay:delays})
.addAnswer(' Vinil\n\nhttps://prosein.com.ve/wp-content/uploads/2023/01/5.VINIL-LVT_NOVEDADES_2020.pdf ')
.addAnswer(
  [
    '¿Deseas cotizar algún producto?', 
    '👉 *1* Si', 
    '👉 *2* No',
  ],
  { capture: true,delay: delays },
  (ctx, { state,fallBack,flowDynamic }) => {
    if (ctx.body === '1' || ctx.body === '2') {
      state.update({ motivo: ctx.body });
      state.update({ cotizar: ctx.body });
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
  [flowTiendas, flowDespedida]
);
const flowCatalogoGeneral = addKeyword(['4'], { sensitive: true , delay:delays})
.addAnswer(' General \n\nhttps://prosein.com.ve/wp-content/uploads/2021/06/PARTE-1-SERIES_2021-1.pdf ')
.addAnswer(
  [
    '¿Deseas cotizar algún producto?', 
    '👉 *1* Si', 
    '👉 *2* No',
  ],
  { capture: true,delay: delays },
  (ctx, { state,fallBack,flowDynamic }) => {
    if (ctx.body === '1' || ctx.body === '2') {
      state.update({ motivo: ctx.body });
      state.update({ cotizar: ctx.body });
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
  [flowTiendas, flowDespedida]
);

const flowCatalogo = addKeyword(['2'], { sensitive: true , delay:delays })
  .addAnswer(
    [
      '¿Qué catálogo desea ver? Escriba el número de la opción:',
      '1. Novedades 2023',
      '2. Novedades Brasil',
      '3. Vinil',
      '4. General',
    ],
    { capture: true, delay: delays },
    async (ctx, { fallBack, flowDynamic }) => {
      if (ctx.body === '1' || ctx.body === '2' || ctx.body === '3' || ctx.body === '4'
    ) {
      state.update({ catalogo: ctx.body });
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
    [flowCatalogoBrasil, flowCatalogoGeneral,flowCatalogoNovedades2023,flowCatalogoVinil]
  );


module.exports = {
  flowCatalogo,
  flowCatalogoBrasil, 
  flowCatalogoGeneral,
  flowCatalogoNovedades2023,
  flowCatalogoVinil
};