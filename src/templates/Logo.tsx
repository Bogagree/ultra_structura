import { useRouter } from 'next/router';

import { AppConfig } from '../utils/AppConfig';

type ILogoProps = {
  xl?: boolean;
};

export const Logo = (props: ILogoProps) => {
  const router = useRouter();
  const height = props.xl ? 48 : 36;
  const width = props.xl ? 78 : 58;

  return (
    <img
      src={`${router.basePath}/assets/images/logo.svg`}
      alt={AppConfig.site_name}
      width={width}
      height={height}
      className="block"
    />
  );
};
