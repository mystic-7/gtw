require('dotenv').config();

const accountSid = 'ACd9e32ec40f49a8c4d98094d7c9db205f';
const authToken = 'c9dccdf4563cc3f6a3ad025c377db6fb';
const client = require('twilio')(accountSid, authToken);

async function joinconv(context, event, callback) {
  const client = context;

  let participant = await client.sync.v1.services(process.env.TWILIO_SERVICE_SID)
    .syncMaps(process.env.SYNC_MAP_SID)
    .syncMapItems(event.From)
    .fetch()
    .catch(e => null);
  console('participant')
  console(participant)

  if (!participant) {
    subscriber = await client.sync.v1.services(process.env.TWILIO_SERVICE_SID)
      .syncMaps(process.env.SYNC_MAP_SID)
      .syncMapItems
      .create({ key: event.From, data: { name: event.ProfileName } });
    console('NOparticipant')
    console(subscriber)

  } else if (participant.data.name !== event.ProfileName) {
    subscriber = await client.sync.v1.services(process.env.TWILIO_SERVICE_SID)
      .syncMaps(process.env.SYNC_MAP_SID)
      .syncMapItems(event.From)
      .update({ data: { name: event.ProfileName } });
    console('SIparticipant')
    console(subscriber)
  }

  if(event.Body === 'Join the group chat') {
    let twiml = new Twilio.twiml.MessagingResponse();
    twiml.message(`Welcome to the conversation, ${event.ProfileName}!`);
    console('twiml')
    console(twiml)
    return callback(null, twiml);
  }

  return callback(null);
};

joinconv(client)