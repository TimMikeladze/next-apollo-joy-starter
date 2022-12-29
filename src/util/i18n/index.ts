import i18next, { TFunction } from 'i18next';
import Backend from 'i18next-http-backend';
import getAppUrl from '@/util/getAppUrl';
import isDev from '@/util/is/isDev';

export const getI18n = (): Promise<TFunction> => {
  if (i18next.isInitialized && !isDev()) {
    return Promise.resolve(i18next.t);
  }
  return i18next.use(Backend).init({
    debug: false,
    fallbackLng: `en`,
    lng: `en`,
    ns: `common`,
    defaultNS: `common`,
    backend: {
      loadPath: getAppUrl(`/locales/{{lng}}/{{ns}}.json`),
    },
  });
};
