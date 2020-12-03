export type HorizontalPosition = 'left' | 'right' | 'center';
export type VerticalPosition = 'top' | 'bottom';

export interface ToastOptions {

  /**
   * Self-defined class names to pass through. There are 3 pre-defined classes: et-info, et-warn,et-alert, to toast with different background color.
   */
  className?: string | string[];

  /**
   * Position horizontal of toast. There are 3 pre-defined positions: left, right and center
   */
  horizontalPosition?: HorizontalPosition;

  /**
   * Position vertical of toast. There are 2 pre-defined positions: top and bottom
   */
  verticalPosition?: VerticalPosition;

  /**
   * The duration one toast will last, in milliseconds
   */
  duration?: number;

  /**
   * Built-in transitions: fade, slide-[up/down/left/right]. See also Transitions
   */
  transition?: string;
}
