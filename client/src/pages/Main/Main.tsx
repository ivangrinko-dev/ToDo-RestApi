import style from './style.module.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { iTask } from '../interfaces';


export default function Main() {
    const [inp, setInp] = useState({ title: '', description: '' });
    const [activeCheckbox, setactiveCheckbox] = useState({});
    const [array, setArray] = useState<iTask[]>([]);


    function changeInput(event: any) {
        setInp({ ...inp, [event.target.name]: event.target.value });
    };

    async function isShow() {
        const result = await axios.post('http://localhost:3000/task', inp);
        console.log(result);
    }

    async function getAllTask() {
        const data = await axios.get('http://localhost:3000/task');
        console.log(data.data);
        const listTaskCheck = data.data.map((el: iTask) => {
            return { ...el, isCheck: false }
        })
        setArray(listTaskCheck);
    }

    useEffect(() => {
        getAllTask();
    })

    return (
        <div className={style.wrapper}>
            <h1>TODO LIST</h1>
            <div className={style.inpCreat}>
                <input type="text" name='title' onChange={changeInput} placeholder='Create note...' />
                <input type="text" name='description' onChange={changeInput} placeholder='Create description note...' />
                <button onClick={isShow}>CREATE</button>
            </div>

            {array.map((el: iTask) => <div className={style.inpTask1}>
                <input type="checkbox" ></input>
                <h2>{el.title}</h2>
                <p>{el.description}</p>
                <div className={style.imgMain}>
                    <div className={style.imgPencil}></div>
                    <div className={style.imgBasket}></div>
                </div>
            </div>)}
        </div>
    )
}