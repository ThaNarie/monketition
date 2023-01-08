import { useUser } from '../../../data/me';
import { type User } from '../../../types/User';
import {
  getInfoAboutUser,
  type OpponentRecordInfo,
} from '../../../utils/participant/getInfoAboutParticipant';
import { getOpponentRecordsForUser } from '../../../utils/participant/getOpponentRecords';
import { OpponentRecord } from '../opponent-record/OpponentRecord';

export type OpponentStatsProps = {
  user: User;
};

export function OpponentStats({ user }: OpponentStatsProps): JSX.Element {
  const me = useUser();

  const { mostPlayedAgainst, mostWonAgainst, mostLostAgainst } = getOpponentRecordsForUser(user);
  let statsBetweenUs: OpponentRecordInfo | undefined;
  if (me !== user) {
    statsBetweenUs = getInfoAboutUser(user).opponents.get(me);
  }

  return (
    <div>
      <h3>Opponent Stats</h3>
      {statsBetweenUs && (
        <OpponentRecord
          opponent={me}
          title="Record between you"
          statValue={statsBetweenUs.games}
          statClassName="text-primary"
          stats={statsBetweenUs}
        />
      )}
      <OpponentRecord
        opponent={mostPlayedAgainst.opponent}
        title="Most encounters"
        subtitle="Your practise partner"
        statValue={mostPlayedAgainst.games}
        stats={mostPlayedAgainst}
      />
      <OpponentRecord
        opponent={mostWonAgainst.opponent}
        title="Most wins"
        subtitle="Your padawan"
        statValue={Math.round(mostWonAgainst.winRatio * 100)}
        statClassName="text-success"
        stats={mostWonAgainst}
      />
      <OpponentRecord
        opponent={mostLostAgainst.opponent}
        title="Most losses"
        subtitle="Your sensei"
        statValue={Math.round(mostLostAgainst.winRatio * 100)}
        statClassName="text-danger"
        stats={mostLostAgainst}
      />
    </div>
  );
}
