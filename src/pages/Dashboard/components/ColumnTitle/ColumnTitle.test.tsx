import { render, screen } from '@testing-library/react';
import ColumnTitle from './index';
import * as S from './styles';

// Mock the styled-components TitleColumn
jest.mock('./styles', () => ({
  TitleColumn: jest.fn(({ children }) => <div>{children}</div>)
}));

describe('ColumnTitle', () => {
  it('should render the title prop', () => {
    const testStatus = 'test-status';
    const testTitle = 'Test Title';

    render(<ColumnTitle status={testStatus} title={testTitle} />);

    expect(screen.getByText(testTitle)).toBeInTheDocument();
  });

  it('should pass the status prop to the styled component', () => {
    const testStatus = 'test-status';
    const testTitle = 'Test Title';

    render(<ColumnTitle status={testStatus} title={testTitle} />);

    expect(S.TitleColumn).toHaveBeenCalledWith(
      expect.objectContaining({
        status: testStatus
      }),
      {}
    );
  });
});
