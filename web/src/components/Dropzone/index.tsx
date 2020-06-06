import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi'

import './styles.css';

interface Props {
    onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({onFileUploaded}) => {

    const [selectedImageFileUrl, setSelectedImageFileUrl] = useState('');

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        
        const fileURL = URL.createObjectURL(file);
        
        setSelectedImageFileUrl(fileURL);

        onFileUploaded(file);
    }, [onFileUploaded])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*' //aceita todos os formatos de imagem 
    })

    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept="image/*" />
            {selectedImageFileUrl
                ? <img src={selectedImageFileUrl} alt="point thumbnail" />
                : (<p>
                    <FiUpload />
                    Imagem do Estabelecimento
                </p>)
            }

        </div>
    )
}

export default Dropzone;