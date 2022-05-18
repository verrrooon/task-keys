import { IItem } from './index';
import { useState, useEffect } from 'react';

interface IProps {
    initialData: IItem[];
    sorting: 'ASC' | 'DESC';
}

function Key(props: { item: IItem }) {
    const [value, setValue] = useState(props.item.name);
    const [isEdit, setIsEdit] = useState(false);
    const [newValue, setNewValue] = useState(value);

    return isEdit ? (
        <input
            key={props.item.id}
            value={newValue}
            type="text"
            autoFocus
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    setValue(newValue);
                    setIsEdit(false);
                }
                if (event.key === 'Escape') {
                    setNewValue(value);
                    setIsEdit(false);
                }
            }}
            onChange={(event) => {
                setNewValue(event.target.value);
            }}
        />
    ) : (
        <div key={props.item.id} onClick={() => setIsEdit(true)}>
            {value}
        </div>
    );
}

export function Keys({ initialData, sorting }: IProps) {
    const [sortedData, setSortedData] = useState<Array<IItem>>([]);

    useEffect(() => {
        if (sorting === 'ASC')
            setSortedData([...initialData].sort((a, b) => a.id - b.id));

        if (sorting === 'DESC')
            setSortedData([...initialData].sort((a, b) => b.id - a.id));
    }, [initialData, sorting]);

    return (
        <>
            {sortedData.map((item) => {
                return <Key key={item.id} item={item} />;
            })}
        </>
    );
}
