export interface Book {
    title?: String;
    authors?: String[];
    publisher?: String;
    publisherDate?: String;
    description?: String;
    previewLink?: String;
    thumbnail?: ImageLinks;
}

export interface VolumeInfo{
    title: String;
    authors: String[];
    publisher: String;
    publisherDate: String;
    description: String;
    industryIdentifiers: IndustryIdentifier[];
    pageCount: number;
    dimensions: Dimensions;
    printType: String;
    mainCategory: String;
    categories: String[];
    averageRating: number;
    ratingsCount: number;
    contentVersion: String;
    imageLinks: ImageLinks;
    language: String;
    infoLink: String;
    canonicalVolumeLink: String;
}

export interface IndustryIdentifier {
    type: String;
    identifier: String;
}

export interface Dimensions {
    height: String;
    width: String;
    thickness: String;
}

export interface ImageLinks {
    smallThumb: String;
    thumbnail: String;
    small: String;
    medium: String;
    large: String;
    extraLarge: String;
}

export interface SaleInfo {
    country: String;
    saleability: String;
    isEbook: boolean;
    listPrice: Price;
    retailPrice: Price;
    buyLink: String;
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
    epub: Epub;
    pdf: Pdf;
    accessViewStatus: String;
}

export interface Epub{
    isAvailable: boolean;
    acsTokenLink: string;
}

export interface Pdf{
    isAvailable: boolean;
}

export interface Item{
    VolumeInfo: VolumeInfo;
}

export interface LivrosResultado{
    items: Item[];
    totalItems: number;
}