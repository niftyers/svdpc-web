export type TResponseCode =
  | 'Success'
  | 'Failed'
  | 'Error'
  | 'Duplicate'
  | 'NotFound'
  | 'Forbidden'
  | 'Locked'
  | 'Unauthorized'
  | 'Disabled'
  | 'Invalid'
  | 'Expired';

export type TDateFormat =
  | 'DEFAULT'
  | 'DATE'
  | 'DATE-STANDARD'
  | 'DATE-MILITARY'
  | 'TIME'
  | 'TIME-MILITARY';


export type TParamSlug = {
  params: Promise<{
    slug: string;
  }>;
};

export type TParamId = {
  params: Promise<{
    id: string;
  }>;
};

export type TLoginData = {
  id: number;
  name: string;
  username: string;
  photo?: string;
};