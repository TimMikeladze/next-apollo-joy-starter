import { Toaster } from 'react-hot-toast';

const AppToaster = () => (
  <Toaster
    position="bottom-center"
    containerStyle={{
      zIndex: 99999,
    }}
  />
);

export default AppToaster;
