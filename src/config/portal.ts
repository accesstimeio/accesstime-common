import { SUPPORTED_SORT_TYPE, UploadMaxSizes } from "../types";

export class Portal {
    public static defaultSortType: SUPPORTED_SORT_TYPE = "weekly_popular";
    public static sortTypes: SUPPORTED_SORT_TYPE[] = ["weekly_popular", "top_rated", "newest"];

    public static categories: number[] = []; // to-do
    public static socialTypes: number[] = []; // to-do

    public static uploadMaxSizes: UploadMaxSizes = {
        avatar: 1024 * 300, // to-do
        content: 1024 * 300, // to-do
        packageBackground: 1024 * 300, // to-do
        packageContent: 1024 * 300 // to-do
    };
}