import parseIp from '@/util/parseIp';

describe(`parseIp`, () => {
  it(`should parse ip from x-forwarded-for header`, () => {
    expect(
      parseIp({ headers: { [`x-forwarded-for`]: `192.168.1.1` } } as any),
    ).toBe(`192.168.1.1`);
  });
  it(`should parse ip from req.socket.remoteAddress`, () => {
    expect(parseIp({ socket: { remoteAddress: `192.168.1.1` } } as any)).toBe(
      `192.168.1.1`,
    );
  });
  if (`should return null ip is ::1`) {
    expect(parseIp({ socket: { remoteAddress: `::1` } } as any)).toBeNull();
  }
});
