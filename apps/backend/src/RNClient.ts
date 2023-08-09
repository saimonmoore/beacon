import { BeaconCore } from './backend.js';
import { logger } from '#infrastructure/logging/index.js';

type RNMessage = {
  event: string;
  payload: any;
};

type ClientProps = {
  channel: any;
  msg: RNMessage;
  backend: BeaconCore;
};

export enum SessionCommandEvents {
  isLoggedIn = 'org.beacon.session.command.isLoggedIn',
  login = 'org.beacon.session.command.login',
  logout = 'org.beacon.session.command.logout',
}

export enum SessionResultEvents {
  isLoggedIn = 'org.beacon.session.result.isLoggedIn',
  login = 'org.beacon.session.result.login',
  logout = 'org.beacon.session.result.logout',
}

function Session(props: ClientProps) {
  const { channel, msg, backend } = props;
  if (!msg) {
    logger.error('No message received');
    return;
  }

  if (typeof msg !== 'object') {
    logger.error('Message is not an object');
    return;
  }

  if (!msg.event) {
    logger.error('No event received');
    return;
  }

  const { event, payload } = msg;

  if (event === SessionCommandEvents.isLoggedIn) {
    channel.send({
      event: SessionResultEvents.isLoggedIn,
      payload: backend.isLoggedIn(),
    });
  } else if (event === SessionCommandEvents.login) {
    const { email } = payload;

    backend.login(email).then((data: any) => {
      channel.send({ event: SessionResultEvents.login, payload: data });
    });
  } else if (event === SessionCommandEvents.logout) {
    backend.logout();
    channel.send({ event: SessionResultEvents.logout, payload: null });
  }
}

export async function RNClient(props: { channel: any; userDataPath: string }) {
  const { channel, userDataPath } = props;
  const backend = new BeaconCore(false, userDataPath, true);
  await backend.start();

  channel.on('message', async (msg: any) => {
    Session({ channel, msg, backend });
  });
}
