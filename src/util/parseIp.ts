import sample from 'lodash/sample';
import { GetServerSidePropsContext } from 'next/types';

const parseIp = (req: GetServerSidePropsContext['req']) => {
  const ip =
    (req.headers?.[`x-forwarded-for`] as string)?.split(`,`).shift() ||
    req.socket?.remoteAddress;

  if (process.env.MOCK_IPS) {
    const ips = process.env.MOCK_IPS.split(`|`);
    return sample(ips);
  }

  if (ip === `::1`) {
    return null;
  }

  return ip;
};

export default parseIp;
