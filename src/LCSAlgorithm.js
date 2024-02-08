export function getMistakesInText(inputParagraph, fixedParagraph) {
    
    inputParagraph = inputParagraph.replaceAll("۔", "۔ ")
    fixedParagraph = fixedParagraph.replaceAll("۔", "۔ ")
    let inputParagraphArray = trimAndNormalizeUrduText(inputParagraph).split(" ");
    let fixedParagraphArray = trimAndNormalizeUrduText(fixedParagraph).split(" ");


    let index = 0;

    let fixedWords = []

    let wordIndexStart = 0

    while(index < inputParagraphArray.length){

        if(inputParagraphArray[index] != fixedParagraphArray[index]){

            fixedWords.push({
                inputWord: inputParagraphArray[index],
                fixedWord: fixedParagraphArray[index],
                index: index,
                wordIndexStart: wordIndexStart
            })

        }

        wordIndexStart = wordIndexStart + inputParagraphArray[index].length + 1

        index++;
    }

    return fixedWords;

}

export function trimAndNormalizeUrduText(text) {
    // Trim extra spaces from start and end
    text = text.trim();

    // Replace double spaces with single spaces
    text = text.replace(/\s+/g, ' ');

    return text;
}