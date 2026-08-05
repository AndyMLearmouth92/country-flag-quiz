export interface CountriesAPIResponse {
  data: {
    meta: {
      count: number;
      duration: number;
      limit: number;
      more: boolean;
      offset: number;
      request_id: string;
      total: number;
    };
    objects: Country[];
  };
}

export interface Country {
  names: CountryNames;
  capitals: Capital[];
  flag: CountryFlag;
  region: string;
  continents: string[];
  languages: Language[];
  population: number;
  _meta: CountryMeta;
}

export interface CountryNames {
  common: string;
  official: string;
  alternates: string[];
}

export interface Capital {
  name: string;
  attributes: CapitalAttributes;
  coordinates: Coordinates;
}

export interface CapitalAttributes {
  administrative: boolean;
  constitutional: boolean;
  executive: boolean;
  judicial: boolean;
  legislative: boolean;
  primary: boolean;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface CountryFlag {
  description: string;
  emoji: string;
  html_entity: string;
  unicode: string;
  url_png: string;
  url_svg: string;
}

export interface Language {
  bcp47: string;
  iso639_1: string;
  iso639_2b: string;
  iso639_2t: string;
  iso639_3: string;
  name: string;
  native_name: string;
}

export interface CountryMeta {
  lastUpdatedTimestamp: number;
}
