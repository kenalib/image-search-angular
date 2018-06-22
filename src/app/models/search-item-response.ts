import { Picture } from './picture';
import { PicInfo } from './pic-info';

export class SearchItemResponse {
  SearchItemResponse: {
    requestId: string;
    success: boolean;
    message: string;
    code: number;
    auctions: Picture[];
    head: object;
    picInfo: PicInfo;
  };
}
