import { Progress, ProgressContainer, ProgressBarRow, ProgressLabel } from './ProgressBarStyle';

type Props = {
  breakPoints?: number[];
  progress: number;
  fadeOut?: boolean;
  show: boolean;
};

export const ProgressBar = ({ progress, show, fadeOut }: Props) => {
  return (
    <ProgressBarRow $gap={8} $alignItems='center' $show={show} $fadeOut={fadeOut}>
      <ProgressContainer>
        <Progress value={progress} />
      </ProgressContainer>
      <ProgressLabel>{`${progress.toFixed(0)}%`}</ProgressLabel>
    </ProgressBarRow>
  );
};