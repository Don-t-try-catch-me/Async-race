export interface LayoutView {
  root: HTMLElement;
  header: HTMLElement;
  content: HTMLElement;
  footer: HTMLElement;

  garageBtn: HTMLButtonElement;
  winnersBtn: HTMLButtonElement;
}
export interface HeaderView {
  root: HTMLElement;
  garageBtn: HTMLButtonElement;
  winnersBtn: HTMLButtonElement;
}
export interface NavButtonParameters {
  label: string;
  className?: string;
}
export interface FooterLink {
  label: string;
  href: string;
}
export interface FooterView {
  root: HTMLElement;
}
export interface GarageView {
  root: HTMLElement;

  nameInput: HTMLInputElement;
  colorInput: HTMLInputElement;
  createBtn: HTMLButtonElement;
  generateBtn: HTMLButtonElement;

  carListContainer: HTMLElement;

  prevBtn: HTMLButtonElement;
  nextBtn: HTMLButtonElement;
  pageLabel: HTMLElement;

  raceControls: RaceControls;

  total: {
    root: HTMLElement;
    change: (n: number) => void;
  };
}
export interface WinnersView {
  root: HTMLElement;
  tableBody: HTMLTableSectionElement;

  sortIdBtn: HTMLButtonElement;
  sortWinsBtn: HTMLButtonElement;
  sortTimeBtn: HTMLButtonElement;

  prevBtn: HTMLButtonElement;
  nextBtn: HTMLButtonElement;
  pageLabel: HTMLElement;

  total: {
    root: HTMLElement;
    change: (n: number) => void;
  };
}
export interface WinnersViewProperties {
  totalWinners: number;
}
export interface CarDto {
  id: number;
  name: string;
  color: string;
}
export interface WinnerDto {
  id: number;
  wins: number;
  time: number;
}
export interface WinnersTableView {
  root: HTMLElement;
  tbody: HTMLTableSectionElement;
  sortIdBtn: HTMLButtonElement;
  sortWinsBtn: HTMLButtonElement;
  sortTimeBtn: HTMLButtonElement;
}
export interface WinnersTableRow {
  index: number;
  carId: number;
  name: string;
  color: string;
  wins: number;
  time: number;
}
export interface TotalCounterProperties {
  label: string;
  count: number;
}

export type SortKey = 'id' | 'wins' | 'time';
export type SortOrder = 'asc' | 'desc';
export interface PaginationView {
  root: HTMLElement;
  prevBtn: HTMLButtonElement;
  nextBtn: HTMLButtonElement;
  label: HTMLElement;
}
export interface PaginationProperties {
  page: number;
  totalPages: number;
}
export interface GarageViewProperties {
  totalCars: number;
}
export interface TextInputProperties {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  value?: string;
}
export interface TextInputView {
  root: HTMLElement;
  input: HTMLInputElement;
}
export interface ColorPickerProperties {
  id: string;
  name: string;
  label: string;
  value?: string;
}
export interface ColorPickerView {
  root: HTMLElement;
  input: HTMLInputElement;
}
export interface CarCardProperties {
  id: number;
  name: string;
  color: string;
}
export interface CarCardListProperties {
  cars: CarDto[];
}
export interface CarCardList {
  root: HTMLElement;
}

export type ButtonVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'danger'
  | 'ghost';

export type ButtonSize = 'sm' | 'md' | 'l';
export interface ButtonProperties {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: 'button';
  disabled?: boolean;
  ariaLabel?: string;
  dataset?: Record<string, string>;
}
export interface UIButton {
  root: HTMLButtonElement;
}
export interface RaceControls {
  root: HTMLElement;
  raceBtn: HTMLButtonElement;
  resetBtn: HTMLButtonElement;
  startCountDown: () => Promise<void>;
  message: InfoMessageView;
}
export interface CreateElementOptions {
  className?: string;
  textContent?: string;
  attrs?: Record<string, string>;
  dataset?: Record<string, string>;
  children?: Array<Node>;
}

export type EngineStatus = 'started' | 'stopped';

export interface EngineDto {
  velocity: number;
  distance: number;
}

export interface DriveDto {
  status: boolean;
}

export const Route = {
  Garage: '#/',
  Winners: '#/winners',
  Error: '#/error',
} as const;

export type Route = (typeof Route)[keyof typeof Route];

export interface ErrorPageView {
  root: HTMLElement;
  goGarageBtn: HTMLButtonElement;
}

export interface RaceTrafficLight {
  root: HTMLElement;
  startCountDown: () => Promise<void>;
}

export type LampColor = 'red' | 'yellow' | 'green';

export type InfoMessageVariant = 'loading' | 'winner' | 'error';

export interface InfoMessageProperties {
  text: string;
  variant?: InfoMessageVariant;
}

export interface InfoMessageView {
  root: HTMLElement;
  setText: (text: string) => void;
  setVariant: (variant: InfoMessageVariant) => void;
}
