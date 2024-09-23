import * as S from './styles';

type IconButtonProps = {
  /**
   * The content to be displayed inside the button.
   *
   */
  children?: React.ReactNode;

  /**
   * If true, the button will be disabled, preventing user interaction.
   *
   */
  disabled?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

const IconButton = (props: IconButtonProps) => {
  return (
    <S.IconButton {...props}>
      {props.children}
    </S.IconButton>
  );
};

export default IconButton;