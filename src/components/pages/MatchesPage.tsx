/* eslint-disable react/jsx-no-bind */
import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import Select from 'react-select';
import { type FormatOptionLabelMeta } from 'react-select/dist/declarations/src/Select';
import { type ClassNamesConfig } from 'react-select/dist/declarations/src/styles';
import { leagues, matches, users } from '../../data/createMockData';
import { type User } from '../../types/User';
import { MatchListing } from '../match/match-listing/MatchListing';
import './matches-page.scss';

type Option = { value: string; data: unknown; label: ReactNode };

const reactSelectClassnames: ClassNamesConfig<Option> = {
  container: () => 'react-select-container',
  control: (state) =>
    `react-select__control ${state.isFocused ? 'focus' : ''} ${state.hasValue ? 'hasValue' : ''}`,
  menu: () => 'react-select__menu',
  menuList: () => 'matches-page__filter-menu-list',
  option: (state) => `react-select__option ${state.isFocused ? 'focus' : ''}`,
  indicatorSeparator: () => 'react-select__indicator-separator',
  placeholder: () => 'react-select__placeholder',
  singleValue: () => 'react-select__single-value',
  input: () => 'react-select__input',
};

function createFormatOptionLabel(label: string) {
  return function formatOptionLabel(
    data: Option,
    formatOptionLabelMeta: FormatOptionLabelMeta<Option>,
  ): ReactNode {
    return formatOptionLabelMeta.context === 'value' ? (
      <>
        <strong>{label}:</strong> {data.label}
      </>
    ) : (
      data.label
    );
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function getFormValuesFromUrl() {
  const urlSearchParameters = new URLSearchParams(window.location.search);
  const player = urlSearchParameters.get('player');
  const opponent = urlSearchParameters.get('opponent');
  const league = urlSearchParameters.get('league');
  const office = urlSearchParameters.get('office');
  return {
    league,
    player,
    opponent,
    office,
  };
}

export function MatchesPage(): JSX.Element {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 24;

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: getFormValuesFromUrl(),
  });

  const playerControl = register('player');
  const opponentControl = register('opponent');
  const leagueControl = register('league');
  const officeControl = register('office');

  const data = useWatch({ control });

  console.log('data', data);

  useEffect(() => {
    setCurrentPage(0);
  }, [data]);

  // add to window popstate event in effect hook and update the form values from the url
  useEffect(() => {
    function onUrlChange(): void {
      // get values from url search params
      const { player, opponent, league, office } = getFormValuesFromUrl();
      // update form values
      setValue('player', player);
      setValue('opponent', opponent);
      setValue('league', league);
      setValue('office', office);
    }
    // listen to popstate event
    window.addEventListener('popstate', onUrlChange);
    return () => {
      window.removeEventListener('popstate', onUrlChange);
    };
  }, []);

  useEffect(() => {
    const parameters = new URLSearchParams(window.location.search);
    // update params with data
    for (const [key, value] of Object.entries(data)) {
      if (value) {
        parameters.set(key, value);
      } else {
        parameters.delete(key);
      }
    }
    // update url with new params and push to history, but only if the search params have changed
    if (parameters.toString() !== window.location.search.slice(1)) {
      window.history.pushState({}, '', `${window.location.pathname}?${parameters.toString()}`);
    }
  }, [data]);

  const filteredMatches = matches.filter((match) => {
    // if player is set, find matches where the player is either of the participants
    if (
      data.player &&
      !match.participants.some((participant) => participant.user.id === data.player)
    ) {
      return false;
    }
    // do the same for opponent, league and office
    if (
      data.opponent &&
      !match.participants.some((participant) => participant.user.id === data.opponent)
    ) {
      return false;
    }
    if (data.league && match.league.id !== data.league) {
      return false;
    }
    if (data.office && match.league.office !== data.office) {
      return false;
    }
    return true;
  });
  const totalPages = Math.ceil(filteredMatches.length / itemsPerPage);
  const visibleMatches = filteredMatches.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  const userOptions = useMemo(
    () =>
      [...users]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((userItem) => ({
          value: userItem.id,
          data: userItem,
          label: userItem.name,
        })),
    [],
  );

  const leagueOptions = useMemo(
    () =>
      [...leagues]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((leagueItem) => ({
          value: leagueItem.id,
          data: leagueItem,
          label: (
            <>
              {leagueItem.name} – <small className="text-muted">{leagueItem.office}</small>
            </>
          ),
        })),
    [],
  );

  // extract unique list of office from leagues
  const officeOptions = useMemo(
    () =>
      [...leagues]
        .map((leagueItem) => leagueItem.office ?? '')
        .filter((officeItem, index, self) => self.indexOf(officeItem) === index)
        .sort((a, b) => a.localeCompare(b))
        .map((officeItem) => ({
          value: officeItem,
          data: officeItem,
          label: officeItem,
        })),
    [],
  );

  const playerLabelFormatter = useMemo(() => createFormatOptionLabel('Player'), []);
  const opponentLabelFormatter = useMemo(() => createFormatOptionLabel('Opponent'), []);
  const leagueLabelFormatter = useMemo(() => createFormatOptionLabel('League'), []);
  const officeLabelFormatter = useMemo(() => createFormatOptionLabel('Office'), []);

  return (
    <div className="matches-page pt-5 pb-5">
      <h1>Matches</h1>
      <div>
        <div className="row">
          <div className="col">
            <Select<Option>
              isClearable
              options={userOptions}
              classNames={reactSelectClassnames}
              placeholder="Player"
              formatOptionLabel={playerLabelFormatter}
              name={playerControl.name}
              value={
                data.player ? userOptions.find((option) => option.value === data.player) : null
              }
              onChange={(option): void => {
                setValue(playerControl.name, option?.value ?? null);
              }}
              onBlur={playerControl.onBlur}
              ref={playerControl.ref}
            />
          </div>
          <div className="col">
            <Select<Option>
              isClearable
              options={userOptions}
              classNames={reactSelectClassnames}
              placeholder="Opponent"
              formatOptionLabel={opponentLabelFormatter}
              name={opponentControl.name}
              value={
                data.opponent ? userOptions.find((option) => option.value === data.opponent) : null
              }
              onChange={(option): void => {
                setValue(opponentControl.name, option?.value ?? null);
              }}
              onBlur={opponentControl.onBlur}
              ref={opponentControl.ref}
            />
          </div>
          <div className="col">
            <Select<Option>
              isClearable
              options={leagueOptions}
              classNames={reactSelectClassnames}
              placeholder="League"
              formatOptionLabel={leagueLabelFormatter}
              name={leagueControl.name}
              value={
                data.league ? leagueOptions.find((option) => option.value === data.league) : null
              }
              onChange={(option): void => {
                setValue(leagueControl.name, option?.value ?? null);
              }}
              onBlur={leagueControl.onBlur}
              ref={leagueControl.ref}
            />
          </div>
          <div className="col">
            <Select<Option>
              isClearable
              options={officeOptions}
              classNames={reactSelectClassnames}
              placeholder="Office"
              formatOptionLabel={officeLabelFormatter}
              name={officeControl.name}
              value={
                data.office ? officeOptions.find((option) => option.value === data.office) : null
              }
              onChange={(option): void => {
                setValue(officeControl.name, option?.value ?? null);
              }}
              onBlur={officeControl.onBlur}
              ref={officeControl.ref}
            />
          </div>
        </div>
      </div>
      <div className="my-4">
        <MatchListing matches={visibleMatches} onlyListing amount="all" />
      </div>
      <Pagination>
        {Array.from({ length: totalPages }).map((_, index) => (
          <Pagination.Item
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            active={index === currentPage}
            // eslint-disable-next-line react/jsx-no-bind
            onClick={(): void => {
              setCurrentPage(index);
            }}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
}
