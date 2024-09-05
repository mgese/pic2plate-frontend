import { useSelector } from 'react-redux';
import React, { ChangeEvent, useCallback } from 'react';
import {
    Accordion,
    AccordionContent,
    Checkbox,
    Input,
} from '@chayns-components/core';
import { useAppDispatch } from '../../hooks/redux';
import { selectKeys, selectValue } from '../../redux-modules/recipes/selectors';
import { addKey, removeKey, setValue } from '../../redux-modules/recipes/slice';
import './preferences.scss';

const Preferences = () => {
    const dispatch = useAppDispatch();

    const keys = useSelector(selectKeys);
    const value = useSelector(selectValue);

    const handleCheck = useCallback(
        (isChecked: boolean, key: string) => {
            if (isChecked) {
                dispatch(addKey(key));
            } else {
                dispatch(removeKey(key));
            }
        },
        [dispatch]
    );

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            dispatch(setValue(event.target.value));
        },
        [dispatch]
    );

    return (
        <Accordion title="Präferenzen" key="preferences">
            <AccordionContent>
                <div className="preferences">
                    <div>
                        <b>Unverträglichkeiten</b>
                        <div>
                            <Checkbox
                                onChange={(event) =>
                                    handleCheck(
                                        event.target.checked,
                                        'Laktoseintoleranz'
                                    )
                                }
                                isChecked={keys.includes('Laktoseintoleranz')}
                            >
                                Laktoseintoleranz
                            </Checkbox>
                            <Checkbox
                                onChange={(event) =>
                                    handleCheck(
                                        event.target.checked,
                                        'Fuctoseintoleranz'
                                    )
                                }
                                isChecked={keys.includes('Fuctoseintoleranz')}
                            >
                                Fuctoseintoleranz
                            </Checkbox>
                            <Checkbox
                                onChange={(event) =>
                                    handleCheck(
                                        event.target.checked,
                                        'Glutenintoleranz'
                                    )
                                }
                                isChecked={keys.includes('Glutenintoleranz')}
                            >
                                Glutenintoleranz
                            </Checkbox>
                        </div>
                    </div>
                    <div>
                        <b>Ernährung</b>
                        <div>
                            <Checkbox
                                onChange={(event) =>
                                    handleCheck(
                                        event.target.checked,
                                        'Vegetarisch'
                                    )
                                }
                                isChecked={keys.includes('Vegetarisch')}
                            >
                                Vegetarisch
                            </Checkbox>
                            <Checkbox
                                onChange={(event) =>
                                    handleCheck(event.target.checked, 'Vegan')
                                }
                                isChecked={keys.includes('Vegan')}
                            >
                                Vegan
                            </Checkbox>
                        </div>
                    </div>
                    <div>
                        <b>Zeit</b>
                        <div>
                            <Checkbox
                                onChange={(event) =>
                                    handleCheck(event.target.checked, 'Schnell')
                                }
                                isChecked={keys.includes('Schnell')}
                            >
                                Schnell
                            </Checkbox>
                        </div>
                    </div>
                    <div>
                        <b>Anlass</b>
                        <Input
                            placeholder="Grillparty, ..."
                            value={value}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </AccordionContent>
        </Accordion>
    );
};

Preferences.displayName = 'Preferences';

export default Preferences;
