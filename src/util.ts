import { ItemType } from "./components/Chart/type";
// this function is using to upload file and get data to render chart
export const uploadFile = (file: File | undefined,cb: (data:ItemType[])=>void)=>{
    if (!file) return;
    // read file
        const reader = new FileReader();
        // when file is loaded
        reader.onload = (e) => {
            const result = e.target?.result
            if (typeof result == 'string') {
                try {
                    // parse data to json
                    const data = JSON.parse(result)
                    // if data is array, call callback function
                    if (Array.isArray(data)) {
                       cb(data) // callback function is actually setChartData function in Chart component
                    }
                } catch (error) {
                    console.log("error", error);
                }
            }
        }
        reader.readAsText(file)
}