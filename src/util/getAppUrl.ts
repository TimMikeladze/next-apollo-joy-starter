import isDev from './is/isDev';
import isBrowser from './is/isBrowser';

const getAppUrl = (path = ``, noHttp?: boolean, noPort?: boolean) => {
  if (isDev()) {
    return `${noHttp ? `` : `http://`}${
      isBrowser() ? window.location.hostname : `localhost`
    }${noPort ? `` : `:3000`}${path}`;
  } else {
    if (isBrowser()) {
      return `${
        noHttp
          ? ``
          : `http${
              [`production`, `preview`].includes(
                process.env.NEXT_PUBLIC_VERCEL_ENV,
              )
                ? `s`
                : ``
            }://`
      }${window.location.hostname}${path}`;
    } else {
      return `${noHttp ? `` : `https://`}${
        process.env.NEXT_PUBLIC_VERCEL_URL
      }${path}`;
    }
  }
};

export default getAppUrl;
