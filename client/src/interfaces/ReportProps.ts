export default interface ReportProps {
    date: string;
    rehearsalStart: string;
    break1?: string;
    breakLength1?: string;
    break2?: string;
    breakLength2?: string;
    rehearsalEnd: string
    rehearsalTime: string;
    attendance: string[];
    rehearsalNotes?: string;
    costumes?: string;
    lights?: string;
    properties?: string;
    sound?: string;
    scenery?: string;
}