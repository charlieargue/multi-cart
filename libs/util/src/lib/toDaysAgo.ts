import { formatDistanceToNow } from "date-fns";

export const toDaysAgo = (d: string): string => {
    if (typeof d === "string") {
        return formatDistanceToNow(new Date(d), { addSuffix: true }); 
    }
    return "";
}