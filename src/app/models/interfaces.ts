export interface Book {
    title?: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string | Date; 
    description?: string;
    previewLink?: string;
    thumbnail?: ImageLinks | string;
}

export interface VolumeInfo{
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    previewLink: string;
    industryIdentifiers: IndustryIdentifier[];
    pageCount: number;
    dimensions: Dimensions;
    printType: string;
    mainCategory: string;
    categories: string[];
    averageRating: number;
    ratingsCount: number;
    contentVersion: string;
    imageLinks: ImageLinks;
    language: string;
    infoLink: string;
    canonicalVolumeLink: string;
}

export interface IndustryIdentifier {
    type: String;
    identifier: String;
}

export interface Dimensions {
    height: string;
    width: string;
    thickness: string;
}

export interface ImageLinks {
    smallThumbnail: string;
    thumbnail: string;
    small: string;
    medium: string;
    large: string;
    extraLarge: string;
}

export interface SaleInfo {
    country: string;
    saleability: string;
    isEbook: boolean;
    listPrice: Price;
    retailPrice: Price;
    buyLink: string;
}

export interface Price {
    amount: number;
    currencyCode: String;
}

export interface AccessInfo {
    country: String;
    viewability: String;
    embeddable: boolean;
    publicDomain: boolean;
    textoToSpeechPermission: String;
    accessViewStatus: String;
}

export interface Item{
    volumeInfo: VolumeInfo;
}

export interface LivrosResultado{
    totalItems: any;
    items: Item[];
}