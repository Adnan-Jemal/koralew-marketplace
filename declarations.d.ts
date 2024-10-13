// declarations.d.ts
declare module 'country-list' {
    export function getNames(): string[];
    export function getCode(countryName: string): string | undefined;
    export function getName(countryCode: string): string | undefined;
    export function overwrite(countries: Record<string, string>): void;
    export function setCustomList(countries: Record<string, string>): void;
  }
  