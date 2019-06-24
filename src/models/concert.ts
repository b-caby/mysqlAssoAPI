class Concert {
    public date: string;
    public name: string;
    public location: string;
    public playerNumber: number;
    public spectatorNumber: number;
    public length: number;
    public concertSheets: ConcertSheets;
}

class ConcertSheets {
    public addedSheets: number[];
    public removedSheets: number[];
}

export { Concert, ConcertSheets };