export default function Btn({btnClass, content, onClick}) {
    return (
        <button type="submit" className={btnClass} onClick={onClick}>{content}</button>
    )
}