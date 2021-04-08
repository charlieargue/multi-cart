import { formatDistanceToNow } from "date-fns";

export const toDaysAgo = (d: string): string => {
    if (typeof d === "string") {
        return formatDistanceToNow(new Date(d), { addSuffix: true }); 
        
        // for POSTGRE RAW TIMESTAMP:
        // return formatDistanceToNow(parseInt(d), { addSuffix: true }); 
    }
    return "";
}