import type { ReactNode } from 'react';

type IBackgroundProps = {
  children: ReactNode;
  color: string;
};

export const Background = (props: IBackgroundProps) => (
  <div className={props.color}>{props.children}</div>
);
