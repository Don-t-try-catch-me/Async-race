export type PageKey = 'garage' | 'winners';

export type LayoutView = {
  root: HTMLElement;
  header: HTMLElement;
  content: HTMLElement;
  footer: HTMLElement;

  garageBtn: HTMLButtonElement;
  winnersBtn: HTMLButtonElement;
};

export type HeaderView = {
  root: HTMLElement;
  garageBtn: HTMLButtonElement;
  winnersBtn: HTMLButtonElement;
};

export type NavButtonParameters = {
  label: string;
  className?: string;
};

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterView = {
  root: HTMLElement;
};

export type GarageView = {
  root: HTMLElement;
};

export type WinnersView = {
  root: HTMLElement;
  tableBody: HTMLTableSectionElement;

  sortWinsBtn: HTMLButtonElement;
  sortTimeBtn: HTMLButtonElement;

  prevBtn: HTMLButtonElement;
  nextBtn: HTMLButtonElement;
  pageLabel: HTMLElement;
};

export type WinnersViewProperties = {
  totalWinners: number;
};

export type CarDto = {
  id: number;
  name: string;
  color: string;
};

export type WinnerDto = {
  id: number;
  wins: number;
  time: number;
};

export type WinnersTableView = {
  root: HTMLElement;
  tbody: HTMLTableSectionElement;
  sortWinsBtn: HTMLButtonElement;
  sortTimeBtn: HTMLButtonElement;
};

export type WinnersTableRow = {
  index: number;
  carId: number;
  name: string;
  color: string;
  wins: number;
  time: number;
};

export type TotalCounterProperties = {
  label: string;
  count: number;
};

export type SortKey = 'wins' | 'time';
export type SortOrder = 'asc' | 'desc';

export type SortState =
  | {
      key: SortKey;
      order: SortOrder;
    }
  | undefined;

export type PaginationView = {
  root: HTMLElement;
  prevBtn: HTMLButtonElement;
  nextBtn: HTMLButtonElement;
  label: HTMLElement;
};

export type PaginationProperties = {
  page: number;
  totalPages: number;
};
