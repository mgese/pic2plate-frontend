import React, { useCallback, useMemo } from 'react';
import './fileUpload.scss';
import { FileInput } from '@chayns-components/core';
import { loadRecipes, uploadImage } from '../../redux-modules/recipes/actions';
import { useAppDispatch } from '../../hooks/redux';

const FileUpload = () => {
    const dispatch = useAppDispatch();

    const onFileAdd = useCallback(
        (imageUrl: string) => {
            void dispatch(loadRecipes(imageUrl));
        },
        [dispatch]
    );

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

                onFileAdd(imageUrl);
            });
        },
        [dispatch, onFileAdd]
    );

    return useMemo(
        () => (
            <div className="file-upload">
                <FileInput
                    maxFiles={1}
                    fileSelectionPlaceholder="Bild hochladen"
                    onAdd={handleAdd}
                />
            </div>
        ),
        [handleAdd]
    );
};

FileUpload.displayNAme = 'FileUpload';

export default FileUpload;
