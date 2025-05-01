export interface RawBang {
  c: string; // category;
  d: string; // domain;
  r: string;
  s: string; // site;
  sc: string; // site category;
  t: string; // command;
  u: string; // url;
}

export type BangsArray = RawBang[];
