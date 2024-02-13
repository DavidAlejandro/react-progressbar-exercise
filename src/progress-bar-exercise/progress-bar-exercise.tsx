import { ThemeProvider } from 'styled-components';

import { Solution } from '../core/Solution/Solution';
import { Exercise } from '../core/Exercise';
import theme from '../shared_styles/theme.json';

const ProgressBarExercise = () => {
  return (
    <ThemeProvider theme={{ ...theme }}>
      <div className="progress-bar-exercise">
        <Exercise
          solution={<Solution />}
          specsUrl="https://github.com/futurestay/frontend-challenges/issues/1"
          title="Progress Bar Exercise"
        />
      </div>
    </ThemeProvider >

  );
};

export default ProgressBarExercise;