import { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from './components/Button/Button';
import { Row } from './components/Layout/Row/Row';
import { ProgressBar } from './components/ProgressBar/ProgressBar';
import { BreakpointsLabel, ProgressBarContainer } from './SolutionStyle';
import { CheckBox } from './components/CheckBox/Checkbox';

const REQUEST_DURATION_SECONDS = 15;
const STUCK_REQUEST_AT_PERCENTAGE = 90;
const PROGRESS_STEP_INCREMENT_PER_SECOND = STUCK_REQUEST_AT_PERCENTAGE / REQUEST_DURATION_SECONDS;

//V2 Solution
const DEFAULT_BREAKPOINTS = [10, 25, 30, 65, 85];
const THROTTLING_AROUND_BREAKPOINTS = 0.5;
const THROTTLING_RANGE_AROUND_BREAKPOINTS = 7;

export const Solution = () => {
  const [requestProgress, setRequestProgress] = useState(0);
  const [enabledBreakpoints, setEnabledBreakpoints] = useState(false);
  const increaseProgressIntervalRef = useRef<null | NodeJS.Timeout>(null);
  const stopRequestTimeoutRef = useRef<null | NodeJS.Timeout>(null);

  const startRequest = useCallback(() => {
    setRequestProgress(0);
    if (!increaseProgressIntervalRef.current) {
      const intervalId = setInterval(() => {
        if (enabledBreakpoints) {
          setRequestProgress((previousProgress) => progressThrottledWithBreakpointsSetter(previousProgress));
        }
        else {
          setRequestProgress((previousProgress) => progressSetter(previousProgress));
        }
      }, 1000);

      increaseProgressIntervalRef.current = intervalId;
    }
  }, [enabledBreakpoints]);

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

  //V2 Solution
  const handleEnableBreakpointsCheckBoxChange = useCallback(() => {
    setEnabledBreakpoints(!enabledBreakpoints);
  }, [enabledBreakpoints]);

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
    {<>
      <BreakpointsLabel $hidden={!enabledBreakpoints}>Breakpoints at: {DEFAULT_BREAKPOINTS.join(', ')}</BreakpointsLabel>
      <ProgressBarContainer>
        <ProgressBar {...(enabledBreakpoints ? { breakPoints: DEFAULT_BREAKPOINTS } : {})} progress={requestProgress} show={showProgressBar} fadeOut />
      </ProgressBarContainer>
    </>}

    <Row $gap={16} $alignItems='center'>
      <Button disabled={loading} color={'green'} onClick={startRequest}>{loading ? 'LOADING...' : 'START REQUEST'}</Button>
      <Button disabled={!loading || isStopingRequest} color={'red'} onClick={stopRequest}>FINISH REQUEST</Button>
      <CheckBox disabled={loading} label='enabled breakpoints' checked={enabledBreakpoints} onChange={handleEnableBreakpointsCheckBoxChange} />
    </Row>
  </>;
};

//V2 Solution
const isProgressAroundBreakpoints = (progress: number, breakpoints: number[]): boolean => {
  return breakpoints.some(breakpoint =>
    progress >= breakpoint - THROTTLING_RANGE_AROUND_BREAKPOINTS &&
    progress <= breakpoint + THROTTLING_RANGE_AROUND_BREAKPOINTS
  );
}

//V2 Solution
const progressThrottledWithBreakpointsSetter = (previousProgress: number) => {
  if (previousProgress >= STUCK_REQUEST_AT_PERCENTAGE) {
    return previousProgress;
  }

  if (isProgressAroundBreakpoints(previousProgress, DEFAULT_BREAKPOINTS)) {
    return previousProgress + PROGRESS_STEP_INCREMENT_PER_SECOND * THROTTLING_AROUND_BREAKPOINTS;
  }
  return previousProgress + PROGRESS_STEP_INCREMENT_PER_SECOND;
};

const progressSetter = (previousProgress: number) => {
  if (previousProgress >= STUCK_REQUEST_AT_PERCENTAGE) {
    return previousProgress;
  }

  return previousProgress + PROGRESS_STEP_INCREMENT_PER_SECOND;
};