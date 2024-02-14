import { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from './components/Button/Button';
import { Row } from './components/Layout/Row/Row';
import { ProgressBar } from './components/ProgressBar/ProgressBar';
import { ProgressBarContainer } from './SolutionStyle';

const REQUEST_DURATION_SECONDS = 15;
const STUCK_REQUEST_AT_PERCENTAGE = 90;
const PROGRESS_STEP_INCREMENT_PER_SECOND = STUCK_REQUEST_AT_PERCENTAGE / REQUEST_DURATION_SECONDS;

export const Solution = () => {
  const [requestProgress, setRequestProgress] = useState(0);
  const increaseProgressIntervalRef = useRef<null | NodeJS.Timeout>(null);
  const stopRequestTimeoutRef = useRef<null | NodeJS.Timeout>(null);

  const startRequest = useCallback(() => {
    setRequestProgress(0);
    if (!increaseProgressIntervalRef.current) {
      const intervalId = setInterval(() => {
        setRequestProgress((previousProgress) => {
          if (previousProgress >= STUCK_REQUEST_AT_PERCENTAGE) {
            return previousProgress;
          }
          return previousProgress + PROGRESS_STEP_INCREMENT_PER_SECOND;
        });
      }, 1000);

      increaseProgressIntervalRef.current = intervalId;
    }
  }, []);

  const [isStopingRequest, setIsStopingRequest] = useState(false);
  const stopRequest = useCallback(() => {
    setIsStopingRequest(true);/* This is needed so that the "FINISH REQUEST" button gets disabled right away
    instead of waiting for the timeout to finish which results in a bad user experience*/

    if (!!increaseProgressIntervalRef.current) {
      clearInterval(increaseProgressIntervalRef.current);
    }

    if (!stopRequestTimeoutRef.current) {
      const timeoutId = setTimeout(() => {
        setRequestProgress(100);
        setIsStopingRequest(false);

        //At this point both the interval and timeout have been cleared, so it is safe to set their corresponding refs to their initial value
        stopRequestTimeoutRef.current = null;
        increaseProgressIntervalRef.current = null;
      }, 1000);
      stopRequestTimeoutRef.current = timeoutId;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (!!increaseProgressIntervalRef.current) {
        clearInterval(increaseProgressIntervalRef.current);
      }
      if (!!stopRequestTimeoutRef.current) {
        clearTimeout(stopRequestTimeoutRef.current);
      }
    }
  }, []);

  const loading = requestProgress < 100 && increaseProgressIntervalRef.current !== null;
  const showProgressBar = requestProgress < 100;
  return <>
    {<ProgressBarContainer>
      <ProgressBar progress={requestProgress} show={showProgressBar} fadeOut />
    </ProgressBarContainer>}
    <Row $gap={16}>
      <Button disabled={loading} color={'green'} onClick={startRequest}>{loading ? 'LOADING...' : 'START REQUEST'}</Button>
      <Button disabled={!loading || isStopingRequest} color={'red'} onClick={stopRequest}>FINISH REQUEST</Button>
    </Row>
  </>;
};