import minimist from 'minimist';
import { BeaconCore } from './backend.js';
import {
  RNClient,
  SessionCommandEvents,
  SessionResultEvents,
} from './RNClient.js';
import { logger } from '#infrastructure/logging/index.js';

const args = minimist(process.argv, {
  alias: {
    storage: 's',
  },
  default: {
    swarm: true,
  },
  boolean: ['ram', 'swarm'],
});

export const beaconBackend = new BeaconCore(args.ram, args.storage, args.swarm);

export { RNClient as Client, SessionCommandEvents, SessionResultEvents };

if (args.storage) {
  logger.info(`Starting Beacon with storage: ${args.storage}`);
  await beaconBackend.start();
}
