import { ImageLinks } from "./interfaces";

export class LivroVolumeInfo{
    title?: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string | Date;
    description?: string;
    previewLink?: string;
    imageLinks?: {
        smallThumb: string;
        thumbnail: string;
    };

    constructor(item){
        this.title = item.volumeInfo?.title;
        this.authors = item.volumeInfo?.authors;
        this.publisher = item.volumeInfo?.publisher;
        this.publishedDate = item.volumeInfo?.publishedDate;
        this.description = item.volumeInfo?.description;
        this.previewLink = item.volumeInfo?.previewLink;
        this.imageLinks = item.volumeInfo.imageLinks;
    }
}