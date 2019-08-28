class Concert {
    public date: string;
    public name: string;
    public location: string;
    public playerNumber: number;
    public spectatorNumber: number;
    public length: number;
    public concertSheets: ConcertSheets[];
}

class ConcertSheets {
    public id: number;
    public title: string;
    public author: string;
}

export { Concert, ConcertSheets };