import { useState } from "react";
import { Correction } from "./Correction";
import { trimAndNormalizeUrduText } from "../LCSAlgorithm";


export const Corrections = ({corrections, setCorrections, isAPIFetching }) => {


    const acceptCorrection = (correction) => {

        const textbox = document.getElementById("textboxInput");
        let textboxTextContent = trimAndNormalizeUrduText(textbox.innerText);
        let textboxTextContentArray = textboxTextContent.split(" ");
        textboxTextContentArray[correction.index] = correction.fixedWord.trim()
        textbox.innerText = textboxTextContentArray.join(" ");

        const correctionElement = document.getElementById("correction_"+correction.index);
        correctionElement.classList.add("AnimationFadeAndSlideOut");

        setTimeout(() => {
            correctionElement.classList.remove("AnimationFadeAndSlideOut");

            let correctionCopy = [];

            corrections.forEach(element => {

                let finalElement =  element

                if(element.index > correction.index){
                    finalElement.wordIndexStart += (correction.fixedWord.length - correction.inputWord.length)
                }

                correctionCopy.push(finalElement);

            })

            setCorrections(correctionCopy.filter(_correction => _correction.index !== correction.index));
            
        }, 400);

    }

    return(
        <div className="Corrections">
            <h1>Corrections {isAPIFetching && <i className="fa-solid fa-arrows-rotate"></i>}</h1>
            {corrections.length != 0 && !isAPIFetching ? <div className="CorrectionsList">
                {corrections.map((correction, index) => { return <Correction key={index} index={index} correction={correction} setCorrections={setCorrections} acceptCorrection={acceptCorrection} /> })}
            </div> : 
            <div className="NoCorrections">
                <i className="fa-solid fa-arrow-trend-up"></i>
                <h1>You're doing good!!</h1>
            </div>}
        </div>
    )
}