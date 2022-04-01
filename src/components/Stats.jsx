import { Icon } from 'semantic-ui-react';
import StatsBox from './StatsBox';
import StatsHistogram from './StatsHistogram';

const Stats = (props) => {
  const { stats } = props;
  return (
    <>
      <StatsBox stats={stats} />
      <StatsHistogram stats={stats} />
      <p></p>
    </>
  );
}

export default Stats;
