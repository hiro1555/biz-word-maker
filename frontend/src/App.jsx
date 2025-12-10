import React from "react";
import { useState } from "react";
import ExportArea from "./components/exportarea/ExportArea";
import { useSendJson } from "./components/sendjson/SendJson";
import IndustrySelect from "./components/industryselect/IndustrySelect";
import SeriousSlidebar from "./components/slidebar/SeriousSlidebar";
import './App.css'

function App(){
    const [selectedIndustry, setSelectedIndustry] = useState("全般");
    const [seriousValue, setSeriousValue] = useState(0.5);

    const sendJson = useSendJson();
    const handleGenerate = () => {
        sendJson.mutate({
            theme:selectedIndustry,
            number:seriousValue
        });
    }
    return (
        <>
            <div className="intro">
                <h2>架空ビジネスワード生成ツール</h2>
                <p>プレゼン資料やネタ作りに。AIがそれっぽい用語を作ります。</p>
            </div>
            <div className="control-row">
                <IndustrySelect value={selectedIndustry} onChange={setSelectedIndustry} />
                <SeriousSlidebar value={seriousValue} onChange={setSeriousValue} />
            </div>
            <div className="control-button">
                <button className="generate-button" onClick = {handleGenerate} disabled = {sendJson.isPending}>
                    生成する
                </button>
            </div>
            <ExportArea
                isLoading={sendJson.isPending}
                result={
                sendJson.data
                    ? `用語: ${sendJson.data.term}\n 説明: ${sendJson.data.description}`
                    : ""
                }
                error={sendJson.error?.message ?? String(sendJson.error ?? "")}
            />
        </>
    )
}

export default App;