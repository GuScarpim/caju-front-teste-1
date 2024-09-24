import { render, screen, fireEvent } from '@testing-library/react';
import { DashboardProvider, DashboardContext } from './index';
import { useContext } from 'react';

describe('DashboardContext', () => {
  const TestComponent = () => {
    const context = useContext(DashboardContext);
    return (
      <div>
        <p data-testid="isLoading">{context.isLoading.toString()}</p>
        <p data-testid="query">{context.query}</p>
        <button onClick={() => context.setIsLoading(!context.isLoading)}>Toggle Loading</button>
        <button onClick={() => context.setQuery('new query')}>Set Query</button>
      </div>
    );
  };

  it('should provide default context values', () => {
    render(
      <DashboardProvider>
        <TestComponent />
      </DashboardProvider>
    );

    expect(screen.getByTestId('isLoading')).toHaveTextContent('false');
    expect(screen.getByTestId('query')).toHaveTextContent('');
  });

  it('should update context values when functions are called', () => {
    render(
      <DashboardProvider>
        <TestComponent />
      </DashboardProvider>
    );

    expect(screen.getByTestId('isLoading')).toHaveTextContent('false');
    expect(screen.getByTestId('query')).toHaveTextContent('');

    fireEvent.click(screen.getByText('Toggle Loading'));
    expect(screen.getByTestId('isLoading')).toHaveTextContent('true');

    fireEvent.click(screen.getByText('Set Query'));
    expect(screen.getByTestId('query')).toHaveTextContent('new query');
  });
});
