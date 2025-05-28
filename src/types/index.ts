export interface Mix {
  title: string;
  description?: string; 
  imageUrl?: string;   
  url: string;
  date?: string;
}

export interface Biography {
  name: string;
  age?: number;
  location?: string;
  tagline?: string;
  bio?: string;
  fullBio?: string;
  motto?: string;
  genres?: string[];
  movementName?: string;
  quote?: string;
  socials: {
    instagram: string;
    tiktok: string;
    soundcloud: string;
    twitter: string;
    spotify: string;
    appleMusic: string;
    youtube: string;
  };
  mixes: Mix[];
  photos: {
    light: string[];
    dark: string[];
  };
  artistPhotos: {
    main: string;
    additional: string[];
  };
  designer: {
    name: string;
    twitter: string;
  };
  emails: {
    bookings: string;
    management: string;
  };
  demoLink?: string;
}