import { type PropsWithChildren } from 'react';
import './section.scss';

export function Section({ children }: PropsWithChildren): JSX.Element {
  return <div className="section">{children}</div>;
}
