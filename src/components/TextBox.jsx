import { useEffect, useState } from "react";


export const TextBox = ({ 
    corrections, 
    initialText, 
    setInitialText,
    fixedParagraph,
    setFixedParagraph,
    setIsAPIFetching
}) => {

    const [listenToTextChange, setListenToTextChange] = useState()

    function highlightSpellingMistake(correction, i) {
        var textarea = document.getElementById("textboxInput");
        var text = textarea.innerHTML;
        var startIndex = correction.wordIndexStart  + 38 * i;
        var endIndex = correction.wordIndexStart + correction.inputWord.length + 38 * i;
        var prefix = text.substring(0, startIndex);
        var highlightedText = text.substring(startIndex , endIndex);
        var suffix = text.substring(endIndex);
        

        var highlightedHTML = `${prefix}<span class="spelling-mistake">${highlightedText}</span>${suffix}`;

        

        textarea.innerHTML = highlightedHTML;
    }

    function trimAndNormalizeUrduText(text) {
        // Trim extra spaces from start and end
        text = text.trim();

        // Replace double spaces with single spaces
        text = text.replace(/\s+/g, ' ');

        return text;
    }

    const handleTextBoxInputChange = () => {
        
        const textBox = document.getElementById("textboxInput");
        setInitialText(textBox.innerText);
        const sentences = textBox.innerText.split("۔");
        let trimmedSentences = []
        sentences.forEach(sentence => trimmedSentences.push(trimAndNormalizeUrduText(sentence)))

        fixGrammerFromAPI(trimmedSentences);
    }

    const fixGrammerFromAPI = async (sentences) => {
        setIsAPIFetching(true);
        let bodyContent = JSON.stringify({
            "InputData": sentences
        });

        let response = await fetch("http://119.63.132.179:5000/api/FixGrammer", {
            method: "PUT",
            body: bodyContent,
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        if(response.status == 200){
            let data = await response.json();
            if(data.status == 200){
                let paragraph = data?.data?.FixedData?.join("۔");
                setFixedParagraph(paragraph);
            }
            
        }
        setIsAPIFetching(false);

    }

    useEffect(() => {
        corrections.forEach((correction, i) => {
            highlightSpellingMistake(correction, i)
        });
        
    }, [corrections])

    return (
        <div
            className="TextBox"
            id="textboxInput"
            contentEditable={true}
            onInput={handleTextBoxInputChange}
        >
            {initialText}
        </div>
    )
}