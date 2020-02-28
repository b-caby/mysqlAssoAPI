import Sheet from "./sheet";

class Concert {
    public date: string;
    public name: string;
    public location: string;
    public playerNumber: number;
    public spectatorNumber: number;
    public length: number;
    public concertSheets: Sheet[];
}

export default Concert;