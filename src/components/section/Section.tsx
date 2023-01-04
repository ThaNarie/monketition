import classNames from 'clsx';
import { type PropsWithChildren } from 'react';
import './section.scss';

type SectionProps = {
  className?: string;
  heading?: string;
};

export function Section({
  children,
  heading,
  className,
}: PropsWithChildren<SectionProps>): JSX.Element {
  return (
    <div className={classNames('section', className)}>
      {heading && <h3 className="mb-4">{heading}</h3>}
      {children}
    </div>
  );
}
