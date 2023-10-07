interface DetailObject {
  loc: [string, number];
  msg: string;
  type: string;
}
type Detail = DetailObject[] | string[];
export type ApiValidationError = {
  detail: Detail;
};

export interface GetManyParams {
  limit?: number;
  skip?: number;
}

export interface GetManyEventsParams extends GetManyParams {
  search_title?: string;
  search_location?: string;
  search_organizer?: string;
}
