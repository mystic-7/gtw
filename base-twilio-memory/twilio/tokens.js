const accountSid = 'ACd9e32ec40f49a8c4d98094d7c9db205f';
const authToken = 'c9dccdf4563cc3f6a3ad025c377db6fb';
const client = require('twilio')(accountSid, authToken);

client.sync.v1.services.create().then(service => console.log(service.sid));


let sync_map = client.sync.v1.services('IS87f5254d93c43a9ad115a523cd00b880')
          .syncMaps
          .create()
          .then(sync_map => console.log(sync_map.sid));


process.env['TWILIO_SERVICE_SID'] = 'IS87f5254d93c43a9ad115a523cd00b880';
process.env['SYNC_MAP_SID'] = 'MPbdff9d91cfd5b869cf54986a4a60bd1c';

TWILIO_SERVICE_SID = 'IS87f5254d93c43a9ad115a523cd00b880'
SYNC_MAP_SID = 'MPbdff9d91cfd5b869cf54986a4a60bd1c'