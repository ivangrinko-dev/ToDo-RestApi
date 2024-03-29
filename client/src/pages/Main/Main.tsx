import style from "./style.module.scss";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { iTask } from "../../interfases/index";

export default function Main() {
  const [inp, setInp] = useState({ title: "", description: "" });
  const [array, setArray] = useState<iTask[]>([]);

  const descriptionRefs = useRef<Array<HTMLParagraphElement | null>>([]);

  function changeInput(event: React.ChangeEvent<HTMLInputElement>) {
    setInp({ ...inp, [event.target.name]: event.target.value });
  }

  function swapFlagCheck(index: number) {
    const newArray = [...array];
    newArray[index].isCheck = !newArray[index].isCheck;
    setArray(newArray);

    if (descriptionRefs.current[index]) {
      descriptionRefs.current[index].style.textDecoration = newArray[index].isCheck
        ? "line-through #a5a5aa"
        : "initial";
        
    }{
      descriptionRefs.current[index].style.color = newArray[index].isCheck
      ? "#a5a5aa"
      : "initial";
    }
  }

  async function getAllTask() {
    const data = await axios.get("http://localhost:3000/task");
    console.log(data.data);
    const listTaskCheck = data.data.map((el: iTask) => {
      return { ...el, isCheck: false };
    });
    setArray(listTaskCheck);
  }

  useEffect(() => {
    getAllTask();
  }, []);

  async function CreateTask() {
    const result = await axios.post(`http://localhost:3000/task`, inp);
    console.log(result);
  }

  async function upDataTask() {
    const data = await axios.put(`http://localhost:3000/task/`);
    console.log(data);
  }

  async function deleteTask(id: string) {
    const data = await axios.delete(`http://localhost:3000/task/${id}`);
    console.log(data);
    const newArray: iTask[] = array.filter((el: any) => el._id !== id);
    setArray(newArray);
  }

  return (
    <div className={style.wrapper}>
      <h1>TODO LIST</h1>
      <div className={style.inpCreat}>
        <input
          type="text"
          name="title"
          onChange={changeInput}
          placeholder="Create note..."
        />
        <input
          type="text"
          name="description"
          onChange={changeInput}
          placeholder="Create description note..."
        />
        <button onClick={CreateTask}>CREATE</button>
      </div>

      {array.map((el: iTask, index) => (
        <div className={style.inpWrap}>
          <div className={style.inpTask}>
            <input name={String(index)} onChange={()=> swapFlagCheck(index)} type="checkbox"></input>
            <h2
              ref={(ref) => (descriptionRefs.current[index] = ref)}
              // className={el.isCheck ? "" : style.active}
            >
              {el.title}
            </h2>
            <p>{el.description}</p>
            <div className={style.imgMain}>
              <button
                onClick={() => {
                  upDataTask();
                }}
                className={style.imgPencil}
              ></button>
              <button
                onClick={() => {
                  deleteTask(el._id);
                }}
                className={style.imgBasket}
              ></button>
            </div>
          </div>
          <div className={style.line}></div>
        </div>
      ))}
    </div>
  );
}
