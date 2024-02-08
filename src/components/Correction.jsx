

export const Correction = ({correction, setCorrections, acceptCorrection, index}) => {

    return(
        <div className="Correction" id={"correction_"+correction.index} >
            <i className="fa-duotone fa-shield-halved CorrectionSheild"></i>
            <p>{correction.inputWord} &nbsp; &nbsp; <i className="fa-solid fa-arrow-right "></i> {correction.fixedWord}</p>
            <i 
                className="fa-solid fa-check CorrectionTick"
                onClick={e => acceptCorrection(correction)}
            ></i>
            
        </div>
    )

}