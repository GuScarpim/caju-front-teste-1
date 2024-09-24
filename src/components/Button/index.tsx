import LoadingScreen from '../Loading';
import * as S from './styles';

type IconButtonProps = {
  /**
   * Optional React nodes (e.g., text or icons) to display inside the button.
   *
   * @optional
   */
  children?: React.ReactNode;

  /**
   * Indicates whether the button is in a loading state.
   *
   * @optional
   * @default false
   */
  isLoading?: boolean;

  /**
   * Type of button.
   *
   * @optional
   * @default `button`
   *
   */
  type?: "button" | "submit" | "reset" | undefined

  /**
   * Change disabled state of the button
   *
   * @optional
   * @default false
   *
   */
  disabled?: boolean
} & React.HTMLAttributes<HTMLButtonElement>;

const Button = (props: IconButtonProps) => {
  return (
    <S.Button type={props.type} disabled={props.disabled} {...props}>
      {props.isLoading
        ? <LoadingScreen fullScreen={false} />
        : props.children
      }
    </S.Button>
  );
};

export default Button;