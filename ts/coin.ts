export abstract class Coin {
    constructor(public value: number) {
    }
    abstract getImageUrl(): string;
}

export class Quarter extends Coin {
    constructor () {
        super(.25);
    }
    getImageUrl (): string {
        return  "img/Quarter.png";
    };
}

export class Dime extends Coin {
    constructor () {
        super(0.10);
    }
    getImageUrl (): string {
        return "img/Dime.png";
    };
}

export class Dollar extends Coin {
    constructor () {
        super(1.00);
    }
    getImageUrl (): string {
        return "img/Dollar.jpg";
    }
}

export class HalfDollar extends Coin {
    constructor () {
        super(0.50);
    }
    getImageUrl (): string {
        return "img/Half.png";
    }
}


