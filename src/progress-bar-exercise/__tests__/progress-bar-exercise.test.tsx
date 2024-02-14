import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ProgressBarExercise from '../progress-bar-exercise';

describe('ProgressBarExercise', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  test("The progress bar should start displaying the request's progress when the user clicks on the 'START REQUEST' button", async () => {
    const user = userEvent.setup({ delay: null }); //This is needed for useFakeTimers to work properly
    render(<ProgressBarExercise />);
    const startRequestButton = screen.getByText('START REQUEST');
    expect(startRequestButton).toBeVisible();
    await user.click(startRequestButton);
    jest.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(screen.getByText('LOADING...')).toBeVisible()
    });

    await waitFor(() => {
      expect(screen.getByText('12%')).toBeVisible()
    });
  });

  test("The progress bar hangs at 90% after 15 seconds if the user did not stop the request", async () => {
    const user = userEvent.setup({ delay: null }); //This is needed for useFakeTimers to work properly
    render(<ProgressBarExercise />);
    const startRequestButton = screen.getByText('START REQUEST');
    expect(startRequestButton).toBeVisible();
    await user.click(startRequestButton);
    jest.advanceTimersByTime(15000);

    await waitFor(() => {
      expect(screen.getByText('LOADING...')).toBeVisible()
    });

    await waitFor(() => {
      expect(screen.getByText('90%')).toBeVisible()
    });
  });

  test("When the user clicks on the 'FINISH REQUEST' button the request finishes, the progress bar shows 100% after a second has passed and then it hides", async () => {
    const user = userEvent.setup({ delay: null }); //This is needed for useFakeTimers to work properly
    render(<ProgressBarExercise />);

    const startRequestButton = screen.getByText('START REQUEST');
    expect(startRequestButton).toBeVisible();
    await user.click(startRequestButton);
    jest.advanceTimersByTime(15000);

    const finishRequestButton = screen.getByText('FINISH REQUEST');
    await waitFor(() => {
      expect(finishRequestButton).toBeEnabled()
    });
    await user.click(finishRequestButton);
    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(screen.getByText('100%')).toBeInTheDocument()
    });
    expect(screen.getByText('100%')).not.toBeVisible();
  });

  test("Progress slows down when it is around a breakpoint and the request takes longer when breakpoints are enabled", async () => {
    const user = userEvent.setup({ delay: null }); //This is needed for useFakeTimers to work properly
    render(<ProgressBarExercise />);

    const enabledBreakpointsCheckbox = screen.getByRole('checkbox', { name: 'enabled breakpoints' });
    expect(enabledBreakpointsCheckbox).toBeVisible();
    user.click(enabledBreakpointsCheckbox);
    await waitFor(() => {
      expect(screen.getByText('Breakpoints at: 10, 25, 30, 65, 85')).toBeVisible();
    });

    const startRequestButton = screen.getByText('START REQUEST');
    expect(startRequestButton).toBeVisible();
    await user.click(startRequestButton);
    jest.advanceTimersByTime(15000);

    await waitFor(() => {
      expect(screen.getByText('57%')).toBeInTheDocument()
    });
  });

});
