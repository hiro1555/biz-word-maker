import React from "react";
import "./IndustrySelect.css"

const industryList = ["IT","金融","医療","製造"];
function IndustrySelect({value,onChange}){
    return (
        <>
            <label htmlFor="industry-select">業界を選択：</label>
            <select
                id = "industry-select"
                className="industry-select"
                value = {value}
                onChange = {(e) => onChange(e.target.value)}
            >
                {industryList.map((item) => (
                    <option key = {item} value = {item}>
                        {item}
                    </option>
                ))}
            </select>
        </>
    );
}

export default IndustrySelect