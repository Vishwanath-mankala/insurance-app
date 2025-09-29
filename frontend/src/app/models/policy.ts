export class Policy {
    constructor(
    public _id: string,
    public createdAt: Date,
    public description: string,
    public code: string,
    public title: string,
    public premium: number,
    public termMonths: number,
    public minSumInsured: number,
    ){ }
}

