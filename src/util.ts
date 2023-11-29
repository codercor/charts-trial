import { ItemType } from "./Chart/type";

export const uploadFile = (file: File | undefined,cb: (data:ItemType[])=>void)=>{
    if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result
            if (typeof result == 'string') {
                try {
                    const data = JSON.parse(result)
                    if (Array.isArray(data)) {
                       cb(data) 
                    }
                } catch (error) {
                    console.log("error", error);
                }
            }
        }
        reader.readAsText(file)
}