import classes from "./Loader.module.scss";

const Loader = () => {
  return (
    <>
      <div className="d-flex justify-center w-100">
        <div className={`${classes.loader} d-flex justify-center align-center`}>
          <div className={`${classes.core}`}></div>
        </div>
      </div>
    </>
  );
};

export default Loader;
