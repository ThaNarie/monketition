import classNames from 'clsx';
import { type PropsWithChildren, type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Rules.module.scss';

export type RuleChoiceProps = {
  id: string;
  checked?: boolean;
};
export function RuleChoice({
  id,
  children,
  checked = true,
}: PropsWithChildren<RuleChoiceProps>): JSX.Element {
  return (
    <div className={classNames(styles.category, styles.choice)}>
      <div className="form-check-reverse form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id={id}
          checked={checked}
        />
        <label className="form-check-label" htmlFor={id}>
          {children}
        </label>
      </div>
    </div>
  );
}

export type RuleResultProps = {
  id: string;
  type: 'allowed' | 'disallowed';
  allowed: ReactNode;
  disallowed: ReactNode;
};
export function RuleResult({ id, type, allowed, disallowed }: RuleResultProps): JSX.Element {
  return <div className={styles[type]}>{type === 'allowed' ? allowed : disallowed}</div>;
}

export function RulesPage(): JSX.Element {
  return (
    <div className={classNames(styles.rulesPage, 'pt-4')}>
      <h1>Rules</h1>
      <div className={classNames(styles.introText, 'mb-5')}>
        <p>
          Professional sports leagues are governed by a set of rules that are designed to ensure
          that the game is played fairly and that the outcome is determined by the skill of the
          players. Those rules are often complex and difficult to understand, and they are often
          subject to interpretation.
        </p>
        <p>
          In more recreational settings, the rules are often less formal and have varied from place
          to place. Each region might have different rules for the same game, and new players get
          introduced to the game by learning the rules of the region where they grew up.
        </p>
        <p>
          The enforcement of the rules is also less strict to allow fore more flexibility and fun in
          the game. However, not knowing the rules can lead to confusion and frustration when
          playing with others. Hence the need for a common set of rules that can be used in any
          location.
        </p>
        <p>
          While wanting to allow for the option for each office, or even individual league, to have
          their own set of rules, it is also important to have a common set of rules that can be
          used in any location as a starting point.
        </p>
        <p>
          This page will describe the rules that are as close to the official rules as possible, so
          everyone knows what they are, but also allow for the option to have local rules that can
          be &quot;enabled&quot; for a specific league.
        </p>
      </div>

      <nav className="nav nav-pills nav-justified mb-4">
        <NavLink to="/rules/table-tennis" className="nav-link">
          Table Tennis
        </NavLink>
        <NavLink to="/rules/pool" className="nav-link">
          Pool
        </NavLink>
        <NavLink to="/rules/foosball" className="nav-link">
          Foosball
        </NavLink>
        <NavLink to="/rules/darts" className="nav-link disabled">
          Darts
        </NavLink>
      </nav>
      <div>
        <h2>Table Tennis</h2>

        <div className={styles.rules}>
          <div className={styles.category}>
            <h6>Serving Direction</h6>
            <small className="text-muted">How the ball moves over the table</small>
          </div>
          <div>
            <p>
              Each player&apos;s side of the table has a white dividing line in the middle. This
              line only plays a role while serving during doubles play. In singles play, the line is
              ignored.
            </p>
            <p>
              This means the middle line, when playing 1v1, doesn&apos;t dictate which side of the
              table you serve from, nor does it dictate the direction of the serve.
            </p>
            <p className={styles.official}>
              The official rules allow you to serve from any side to either direction; straight or
              diagonally.
            </p>
          </div>
          <RuleChoice id="table-tennis-serving-side" checked>
            Allow serving from any side
          </RuleChoice>
          <RuleResult
            id="table-tennis-serving-side"
            type="allowed"
            allowed="It is allowed to serve from any side of the table, both right and left."
            disallowed="It is only allowed to serve from the side that you hold your bat in."
          ></RuleResult>
          <RuleChoice id="table-tennis-serving-direction" checked={false}>
            Allow straight and diagonal serves
          </RuleChoice>
          <RuleResult
            id="table-tennis-serving-direction"
            type="disallowed"
            allowed="It is allowed to serve the ball both straight and diagonally."
            disallowed="It is not allowed to serve straight, only diagonally is allowed."
          ></RuleResult>
        </div>
        <div className={styles.rules}>
          <div className={styles.category}>
            <h6>Hitting the net while serving</h6>
            <small className="text-muted">It&apos;s called a &quot;let&quot; serve</small>
          </div>
          <div>
            <p>
              A &quot;let&quot; serve is when during a serve, the ball hits the net between touching
              the table on the server&apos;s and the receiver&apos;s side. It&apos;s called a
              &quot;non-counting point&quot; serve, and the server gets to serve again.
            </p>
            <p>
              If the ball hits the server&apos;s side of the table after touching the net (i.e. the
              ball bounces back), it&apos;s a point for the receiver. If the ball doesn&apos;t hit
              the table at all after touching the net, it&apos;s a point for the receiver following
              to the normal point rules.
            </p>
            <p className={styles.official}>
              The official rules allow an infinite amount of let serves.
            </p>
          </div>
          <RuleChoice id="table-tennis-let-serve" checked>
            Allow unlimited let serves
          </RuleChoice>
          <RuleResult
            id="table-tennis-serving-side"
            type="allowed"
            allowed="The server can re-serve any amount of let serve."
            disallowed="The server is only allowed to have one free let serve per point."
          ></RuleResult>
        </div>
      </div>
    </div>
  );
}
