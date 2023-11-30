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

    const download = useCallback((data: ItemType[]) => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        const name = prompt("Enter file name", "data")
        downloadAnchorNode.setAttribute("download", name ? `${name}.json` : "data.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }, [])

    const upload = useCallback(() => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = '.json'
        input.click()
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0]
            uploadFile(file, setData)
        }
    }, [])

    const handleDrop = useCallback((e: React.DragEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const file = e.dataTransfer.files?.[0]
        uploadFile(file, setData)
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