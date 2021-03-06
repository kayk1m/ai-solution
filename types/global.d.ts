// Declarations for global interfaces & types
type ImageInfo = {
  uri: string;
  aspectRatio: number;
};

type Details = {
  title: string;
  description: string;
  exampleImages: ImageInfo[];
  descriptionImages: ImageInfo[];
};

type Augmentation = {
  variant: 'augmentation';
  name: string;
  details: Details;
};

type Preprocess = {
  variant: 'preprocess';
  name: string;
  details: Details;
};

type DataProcessItem = Augmentation | Preprocess;

interface UserInfo {
  id: string;
  name: string;
  profile: string | null;
}

interface BrowseItem {
  title: string;
  description: string;
  task: string;
  createdBy: string;
}
