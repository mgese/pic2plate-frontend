import React, { useCallback, useMemo, useState } from 'react';
import './fileUpload.scss';
import { Button, FileInput } from '@chayns-components/core';
import { loadRecipes, uploadImage } from '../../redux-modules/recipes/actions';
import { useAppDispatch } from '../../hooks/redux';

const FileUpload = () => {
    const dispatch = useAppDispatch();

    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const handleButtonClick = useCallback(() => {
        void dispatch(loadRecipes(imageUrls));
    }, [dispatch, imageUrls]);

    const handleAdd = useCallback(
        (file: File[] | string[]) => {
            const newFile = file[0];

            if (typeof newFile === 'string') {
                return;
            }

            void dispatch(uploadImage(newFile)).then((imageUrl) => {
                if (!imageUrl) {
                    return;
                }

                setImageUrls((prevImageUrl) => [...prevImageUrl, imageUrl]);
            });
        },
        [dispatch]
    );

    return useMemo(
        () => (
            <div className="file-upload">
                <FileInput
                    fileSelectionPlaceholder="Bild hochladen"
                    onAdd={handleAdd}
                />
                <div className="file-upload__button">
                    <Button
                        onClick={handleButtonClick}
                        isDisabled={imageUrls.length === 0}
                    >
                        Generieren
                    </Button>
                </div>
            </div>
        ),
        [handleAdd, handleButtonClick, imageUrls.length]
    );
};

FileUpload.displayNAme = 'FileUpload';

export default FileUpload;
