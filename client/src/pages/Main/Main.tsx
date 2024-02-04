import style from "./style.module.scss";

function Main() {
  return (
    <>
      <div className={style.wrapper}>
        <h1>TODO LIST</h1>

        <div className={style.header}>
          <input type="text" placeholder="enter note..." />
          <input type="text" placeholder="enter description note..." />
          <div>
            <button>CREATE</button>
          </div>
        </div>

        <div className={style.inpTask}>
          <form action="#" className={style.form}>
            <input type="checkbox" checked></input>
            <h2>Note #1</h2>
            <p>DESCRIPTION...</p>
            <div className={style.imgPencil}></div>
            <div className={style.imgBasket}></div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Main;
