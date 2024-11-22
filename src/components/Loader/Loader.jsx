import { InfinitySpin } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div style={{ marginInline: 'auto', width: 100 }}>
      <InfinitySpin visible={true} width="150" color="#6699ff" ariaLabel="infinity-spin-loading" />
    </div>
  );
};
export default Loader;
