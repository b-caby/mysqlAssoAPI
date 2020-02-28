import Concert from "./concert";

class Sheet {
    public id: number;
    public title: string;
    public author: string;
    public composer: string;
    public genre: string;
    public type: string;
    public publisher: string;
    public details: string;
    public boxNumber: string;
    public trayNumber: string;
    public recordingDate: string;
    public concerts: Concert;
}

export default Sheet;