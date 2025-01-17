import styles from "./Note.module.css"


function Note(props) {
    return (
      <div className={styles.note}>
        <h1>{props.title}</h1>
        <p>{props.txt}</p>
      </div>
    )
}

export default Note;