import React from "react";
import './ExportArea.css';

function ExportArea({isLoading,result,error}){
    return (
        <div className ="export-area">
            {isLoading&&<p>用語を生成中...</p>}
            {!isLoading && error && <p>{error}</p>}
            {!isLoading && result && (
                <div className="result-box">
                    <h3 className="result-title">生成結果</h3>
                    <p>{result}</p>
                </div>
            )}
            {!isLoading && !result && !error && <p>ここに架空のビジネス用語が生成されます</p>}
        </div>
    )
}
export default ExportArea