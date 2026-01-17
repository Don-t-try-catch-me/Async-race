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
