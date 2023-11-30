import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { FaSave as IconSave, FaUpload as IconUpload } from 'react-icons/fa'

import { uploadFile } from '../../util'

import { ItemType } from './type'

type DataActionsProps = {
    data: ItemType[],
    setData: (data: ItemType[]) => void
}

const DataActions = ({ data, setData }: DataActionsProps) => {

        // download the data as json file
    const download = useCallback((data: ItemType[]) => {
        //dataStr is the data in string format
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
        // downloadAnchorNode is the anchor tag which is used to download the file
        const downloadAnchorNode = document.createElement('a');
        // set the href and download attribute of the anchor tag
        downloadAnchorNode.setAttribute("href", dataStr);
        // prompt the user to enter the file name
        const name = prompt("Enter file name", "data")
        // if the user enter the name then set the name as the download attribute of the anchor tag
        downloadAnchorNode.setAttribute("download", name ? `${name}.json` : "data.json");
        // append the anchor tag to the body
        document.body.appendChild(downloadAnchorNode); // required for firefox
        // trigger the click event of the anchor tag
        downloadAnchorNode.click();
        // remove the anchor tag from the body
        downloadAnchorNode.remove();
    }, [])

    const upload = useCallback(() => {
        // create an input element
        const input = document.createElement('input')
        // set the type and accept attribute of the input element
        input.type = 'file'
        input.accept = '.json'
        input.click()
        // when the user select the file then upload the file
        input.onchange = (e) => {
            // get the file from the input element
            const file = (e.target as HTMLInputElement).files?.[0]
            // upload the file
            uploadFile(file, setData)
        }
    }, [])
    // handle the drop event
    const handleDrop = useCallback((e: React.DragEvent<HTMLButtonElement>) => {
        e.preventDefault()
        // get the file from the event
        const file = e.dataTransfer.files?.[0]
        // upload the file
        uploadFile(file, setData)
        // remove the class from the button
        e.currentTarget.classList.remove('drag-enter')
    }, [])

    return <div className="flex gap-2">
        <button
            disabled={data.length == 0}
            onClick={() => download(data)}
            className='data-controls'>
            <IconSave /> <span> Save </span>
        </button>
        <motion.button
            onDragOver={(e) => {
                e.preventDefault()
                e.currentTarget.classList.add('drag-enter')
            }}
            onDragLeave={(e) => {
                e.preventDefault()
                e.currentTarget.classList.remove('drag-enter')
            }}
            onClick={upload}
            onDrop={handleDrop}
            className='data-controls'>
            <IconUpload /> <span> Load </span>
        </motion.button>
        <p className='text-[0.7rem]'> You can drop your file to over the load button </p>
    </div>
}
export default DataActions;