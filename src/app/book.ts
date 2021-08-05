export class Book {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public pageCount: string,
        public excerpt?: string,
        public publishDate?: string) { }
}