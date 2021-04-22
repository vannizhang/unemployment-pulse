import {
    THEME_COLOR_BLUE,
    THEME_COLOR_ORANGE,
    SEPARATOR_COLOR,
    PANEL_BACKGROUND,
} from '../../constants/style';

export const MARGIN = {
    top: 15,
    right: 15,
    bottom: 25,
    left: 30,
};

// The inner padding determines the ratio of the range that is reserved for blank space between bands. must be within [0, 1]
export const SCALE_BAND_PADDING_INNER = 0.9;

export const BAR_COLOR = THEME_COLOR_ORANGE;

export const LINE_COLOR = THEME_COLOR_BLUE;
export const LINE_WIDTH = 2;

export const REF_LINE_COLOR = SEPARATOR_COLOR;
export const REF_LINE_STROKE = 0.5;

export const TOOLTIP_BACKGROUND_COLOR = PANEL_BACKGROUND;
export const TOOLTIP_TEXT_COLOR = '#fff';
export const TOOLTIP_BOXSHADOW_COLOR = '#rgba(0,0,0,.25)';
export const TOOLTIP_PADDING = '.5rem';

export const AXIS_TEXT_COLOR = THEME_COLOR_BLUE;
export const AXIS_LINE_COLOR = SEPARATOR_COLOR;
