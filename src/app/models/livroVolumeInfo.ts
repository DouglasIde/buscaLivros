import { ImageLinks } from "./interfaces";

export class LivroVolumeInfo{
    title?: string;
    authors?: String[];
    publisher?: String;
    publishedDate?: string | Date;
    description?: String;
    previewLink?: String;
    imageLinks?: {
        smallThumb: String;
        thumbnail: String;
    };

    constructor(item){
        this.title = item.volumeInfo?.title;
        this.authors = item.volumeInfo?.authors;
        this.publisher = item.volumeInfo?.publisher;
        this.publishedDate = item.volumeInfo?.publishedDate;
        this.description = item.volumeInfo?.description;
        this.previewLink = item.volumeInfo?.previewLink;
        this.imageLinks = item.volumeInfo?.imageLinks;
    }
}