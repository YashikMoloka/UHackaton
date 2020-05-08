import {MenuChildItem} from './menu-child-item';

export class MenuItem {
  title = '';
  description = '';
  link: string | any[] = '/';
  children: Array<MenuChildItem> = [];
  anchor = '';
  min_width: number | 'auto';
}

export class FooterMenuItem {
  children: Array<MenuChildItem>;
  description: string;
  link: string | any;
  title: string;
  width: number;
  anchor: string;
  isHref?: boolean;
}
