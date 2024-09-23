import * as S from './styles';

export type LoadingScreenProps = {
  /**
   * Determines if the loading screen should occupy the full viewport.
   *
   * @optional
   * @default false
   *
   */
  fullScreen?: boolean;

  /**
   * Determines if the height of the loading screen should be adjusted.
   *
   * @optional
   *
   */
  isLoadingHeight?: string;

  /**
   * Determines if the width of the loading screen should be adjusted.
   *
   * @optional
   *
   */
  isLoadingWidth?: string;
};


const LoadingScreen = ({ fullScreen = true, isLoadingHeight, isLoadingWidth }: LoadingScreenProps) => {
  return (
    <S.Container fullScreen={fullScreen} aria-label='Carregando...' data-testid={fullScreen ? '1' : '0'}>
      <S.Spinner isLoadingHeight={isLoadingHeight} isLoadingWidth={isLoadingWidth} aria-label='loading' />
    </S.Container>
  );
};

export default LoadingScreen;
