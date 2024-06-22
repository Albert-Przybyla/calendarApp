import { retry } from 'rxjs';

export {};

declare global {
  interface Date {
    getStartOfMonth(): Date;
    getEndOfMonth(): Date;
    getStartOfWeek(): Date;
    getEndOfWeek(): Date;
    getWeek(): number;
    compareTo(date: Date): number;
    setTimeFromDate(date: Date): void;
    addHours(hours: number): Date;
    getTimeString(): string;
    formatNumber(n: number): string;
  }
}

Date.prototype.getStartOfMonth = function (): Date {
  return new Date(this.getFullYear(), this.getMonth(), 1);
};

Date.prototype.getEndOfMonth = function (): Date {
  return new Date(this.getFullYear(), this.getMonth() + 1, 0);
};

Date.prototype.getStartOfWeek = function (): Date {
  const date = new Date(this);
  const day = date.getDay();
  const diffToMonday = (day === 0 ? -6 : 1) - day; // Przesunięcie do poniedziałku (0 -> -6, 1 -> 0, 2 -> -1, ...)
  date.setDate(date.getDate() + diffToMonday);
  date.setHours(0, 0, 0, 0);
  return date;
};

Date.prototype.getEndOfWeek = function (): Date {
  const startOfWeek = this.getStartOfWeek();
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  return endOfWeek;
};

Date.prototype.getWeek = function (): number {
  const date = new Date(this);
  const onejan = new Date(date.getFullYear(), 0, 1);
  const weekNum = Math.ceil(
    ((date.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7
  );
  return weekNum - 1;
};

Date.prototype.compareTo = function (date: Date): number {
  const thisDate = new Date(this);
  if (thisDate.getFullYear() !== date.getFullYear()) {
    return thisDate.getFullYear() > date.getFullYear() ? 1 : -1;
  }
  if (thisDate.getMonth() !== date.getMonth()) {
    return thisDate.getMonth() > date.getMonth() ? 1 : -1;
  }
  if (thisDate.getDate() !== date.getDate()) {
    return thisDate.getDate() > date.getDate() ? 1 : -1;
  }
  return 0;
};

Date.prototype.setTimeFromDate = function (d: Date): void {
  this.setHours(d.getHours());
  this.setMinutes(d.getMinutes());
  this.setSeconds(d.getSeconds());
  this.setMilliseconds(d.getMilliseconds());
};

Date.prototype.addHours = function (hours: number): Date {
  this.setHours(this.getHours() + hours);
  return this;
};

Date.prototype.getTimeString = function (): string {
  return `${this.formatNumber(this.getHours())}:${this.formatNumber(
    this.getMinutes()
  )}`;
};

Date.prototype.formatNumber = function (num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
};
