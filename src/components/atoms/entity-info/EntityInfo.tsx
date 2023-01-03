import { type PropsWithChildren } from 'react';
import './entity-info.scss';

export function EntityInfo({ children }: PropsWithChildren): JSX.Element {
  return <div className="entity-info">{children}</div>;
}
