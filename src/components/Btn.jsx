export default function Btn({btnClass, content, onClick}) {
    return (
        <button className={btnClass} onClick={onClick}>{content}</button>
    )
}