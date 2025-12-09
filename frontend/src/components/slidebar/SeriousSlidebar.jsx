import "./SeriousSlidebar.css"

function SeriousSlidebar({value,onChange}){
    return(
        <div className="slidebar-control">
            <p>リアリティ：</p>
            <input
                type = "range"
                min = "0"
                max = "1"
                step = "0.1"
                value = {value}
                onChange= {(e) => onChange(Number(e.target.value))}
            />
        </div>
    )
}
export default SeriousSlidebar