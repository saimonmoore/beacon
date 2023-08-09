import Corestore from 'corestore';
import Hyperswarm from 'hyperswarm';
import Autobase from 'autobase';
import Hyperbee from 'hyperbee';
import ram from 'random-access-memory';
// @ts-ignore
// import { AutobaseManager } from '@lejeunerenard/autobase-manager';

import { UserUseCase } from '#User/application/usecases/UserUseCase/index.js';
import { SessionUseCase } from '#Session/application/usecases/SessionUseCase/index.js';
// import { sessionRequiredInterceptor } from '#Session/application/usecases/SessionRequiredUseCase/SessionRequiredInterceptor.js';
// import { sha256 } from '#Shared/infrastructure/helpers/hash.js';
import { logger } from '#infrastructure/logging/index.js';

// import {
//   indexFriends,
//   indexUsers,
// } from '#User/application/indices/Users/users.index.js';
// import { OPERATIONS } from '#config/constants.js';

import type { User } from '#User/domain/entities/user.js';
// import type { BeeBatch, HypercoreStream, PeerInfo } from '#Types/global.d.ts';

// TODO:
// - add tests

// const SWARM_TOPIC = 'org.beacon.swarm';
const DEFAULT_STORAGE = 'beacon';

class BeaconCore {
  store: Corestore;
  swarm: Hyperswarm | null;
  autobase: Autobase | null;
  bee: Hyperbee | null;
  sessionUseCase: SessionUseCase;
  userUseCase: UserUseCase;
  enableSwarm: boolean;

  constructor(useRam: boolean, storage: string, enableSwarm: boolean) {
    this.store = new Corestore(useRam ? ram : storage || DEFAULT_STORAGE);
    this.enableSwarm = enableSwarm;
    this.swarm = null;
    this.autobase = null;
    this.bee = null;
  }

  async start() {
    logger.info('Starting Beacon...');
    // const writer = this.store.get({ name: 'writer' });
    // const viewOutput = this.store.get({ name: 'view' });
    //
    // await writer.ready();
    // logger.debug('Writer ready');
    //
    // // @ts-ignore
    // this.autobase = new Autobase({
    //   inputs: [writer],
    //   localInput: writer,
    //   outputs: [viewOutput],
    //   localOutput: viewOutput,
    // });
    //
    // await this.autobase.ready();
    // logger.debug('Autobase ready');

    // const manager = new AutobaseManager(
    //   this.autobase,
    //   () => true,
    //   this.store.get.bind(this.store),
    //   this.store.storage
    // );
    // await manager.ready();
    // logger.debug('Autobase manager ready');

    // if (this.enableSwarm) {
    //   const topic = Buffer.from(sha256(SWARM_TOPIC), 'hex');
    //   logger.debug('Starting to swarm...');
    //
    //   this.swarm = new Hyperswarm();
    //   this.swarm.on('update', (a, b) => {
    //     logger.info('Swarm update', { a, b });
    //   });
    //   this.swarm.on(
    //     'connection',
    //     (socket: HypercoreStream, peerInfo: PeerInfo) => {
    //       // @ts-ignore
    //       logger.info(
    //         'Peer connected! ======> ',
    //         peerInfo.publicKey.toString('hex')
    //       );
    //       const stream = this.store.replicate(socket);
    //
    //       manager.attachStream(stream);
    //     }
    //   );
    //   const discovery = this.swarm.join(topic, { server: true, client: true });
    //   // The flushed promise will resolve when the topic has been fully announced to the DHT
    //   await discovery.flushed();
    //   logger.debug('Server ready for topic: ' + SWARM_TOPIC);
    //
    //   try {
    //     await this.swarm.flush();
    //   } catch (error) {
    //     logger.error('Swarm error', { error });
    //   }
    //
    //   logger.debug('Joining swarm topic: ' + SWARM_TOPIC);
    //
    //   logger.debug('Swarm ready');
    //   // @ts-ignore
    //   process.once('SIGINT', () => this.swarm.destroy()); // for faster restarts
    // }

    this.info();

    // const self = this;
    // this.autobase.start({
    //   unwrap: true,
    //   async apply(batch: BeeBatch) {
    //     if (!self.bee) {
    //       throw new Error('Bee not initialized');
    //     }
    //
    //     const batchedBeeOperations = self.bee.batch({ update: false });
    //
    //     // @ts-ignore
    //     for (const { value } of batch) {
    //       const operation = JSON.parse(value);
    //
    //       if (operation.type === OPERATIONS.CREATE_USER) {
    //         await indexUsers(batchedBeeOperations, operation);
    //       }
    //
    //       if (operation.type === OPERATIONS.ADD_FRIEND) {
    //         await indexFriends(batchedBeeOperations, operation);
    //       }
    //     }
    //
    //     await batchedBeeOperations.flush();
    //   },
    // });
    //
    // this.bee = new Hyperbee(this.autobase.view, {
    //   extension: false,
    //   keyEncoding: 'utf-8',
    //   valueEncoding: 'json',
    // });
    //
    // this.sessionUseCase = new SessionUseCase(this.bee, this.autobase);
    // this.userUseCase = sessionRequiredInterceptor(
    //   new UserUseCase(this.bee, this.autobase, this.sessionUseCase)
    // );
    logger.debug('Beacon ready');
  }

  info() {
    logger.info('hrepl beacon.js ');
    logger.info();
    logger.info('To use another storage directory use --storage ./another');
    logger.info('To disable swarming add --no-swarm');
    logger.info();
  }

  // ENDPOINTS

  // User
  async *users() {
    yield* this.userUseCase.users();
  }

  // async *friends() {
  //   yield* this.userUseCase.friends();
  // }
  //
  // async *friendsByName(text: string) {
  //   yield* this.userUseCase.friendsByName(text);
  // }
  //
  // async *friendsByEmail(text: string) {
  //   yield* this.userUseCase.friendsByEmail(text);
  // }

  async signup(user: User) {
    return this.userUseCase.signup(user);
  }

  // async addFriend(userHash: string) {
  //   return this.userUseCase.addFriend(userHash);
  // }

  // Session
  isLoggedIn() {
    return this.sessionUseCase.isLoggedIn();
  }

  async login(email: string) {
    return this.sessionUseCase.login(email);
  }

  logout() {
    return this.sessionUseCase.logout();
  }
}

export { BeaconCore };
