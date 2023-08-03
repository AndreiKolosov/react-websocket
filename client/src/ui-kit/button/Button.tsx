import { type FC, type HTMLProps } from 'react';
import styles from './Button.module.css';
import cn from 'classnames';

interface IButtonProps extends HTMLProps<HTMLButtonElement> {
  htmlType: 'submit' | 'button' | 'reset';
  className?: string;
  color: 'bright' | 'dark' | 'accent' | 'contrast' | 'error';
  variant: 'outline' | 'fill';
  big?: boolean;
  fullWidth?: boolean;
}

const Button: FC<IButtonProps> = ({
  children,
  htmlType, 
  disabled,
  onClick,
  variant,
  color,
  big = false,
  fullWidth = false,
  className,
  title,
  onMouseEnter,
  onMouseLeave,
  
}) => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles[`button_${variant}`]]: variant,
        [styles[`button_${color}`]]: color,
        [styles.button_big]: big,
        [styles.button_fullWidth]: fullWidth,
      })}
      type={htmlType}
      disabled={disabled} 
      onClick={onClick}
      title={title}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </button>
  );
};

export default Button;