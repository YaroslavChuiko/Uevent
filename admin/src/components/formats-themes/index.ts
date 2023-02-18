import FormatThemesList from './FormatThemesList';
import { FormatShow, ThemeShow } from './FormatThemeShow';
import FormatThemeCreate from './FormatThemeCreate';
import { FormatEdit, ThemeEdit } from './FormatThemeEdit';

export const formats = {
	list: FormatThemesList,
	show: FormatShow,
	create: FormatThemeCreate,
	edit: FormatEdit,
};

export const themes = {
	list: FormatThemesList,
	show: ThemeShow,
	create: FormatThemeCreate,
	edit: ThemeEdit,
};

