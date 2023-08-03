import { type FC, type HTMLProps } from 'react';
import styles from './Typography.module.css';
import cn from 'classnames';

type TTag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';

type TVariant =
  | 'heading-xl'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'text-xl'
  | 'text-l'
  | 'text-s'
  | 'caption'
  | 'helper-text'
  | 'tag';

export interface ITypographyProps extends HTMLProps<HTMLParagraphElement & HTMLTitleElement> {
  as: TTag;
  variant: TVariant;
  color: 'light' | 'dark';
  fontWeight?: 'medium' | 'bold';
}

const Typography: FC<ITypographyProps> = ({ as, variant, color, fontWeight = 'bold', children, className, ...props }) => {
  const Component = as;

  return (
    <Component
      className={cn(styles.typography, className, {
        [styles[`typography_${variant}`]]: variant,
        [styles[`typography_color_${color}`]]: color,
        [styles[`typography_fontWeight_${fontWeight}`]]: fontWeight,
      })}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Typography;
