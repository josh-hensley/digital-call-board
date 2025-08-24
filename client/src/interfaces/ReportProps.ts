export type rehearsalBreak = { time: string; length: string };

export default interface ReportProps {
    date: string;
    rehearsalStart: string;
    breaks?: rehearsalBreak[];
    rehearsalEnd: string
    present: string[];
    absent?: string[];
    rehearsalNotes?: string;
    costumes?: string;
    lights?: string;
    properties?: string;
    sound?: string;
    scenery?: string;
}