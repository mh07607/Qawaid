import { useEffect, useState } from 'react'
import './App.css'
import { TextBox } from './components/TextBox'
import { Corrections } from './components/Corrections'
import { getMistakesInText } from './LCSAlgorithm'
import Logo from "./assets/logo.png"

function App() {

	const [corrections, setCorrections] = useState([]);

	const [initialText, setInitialText] = useState("!یہاں لکھنا شروع کرو")

	const [fixedParagraph, setFixedParagraph] = useState("!یہاں لکھنا شروع کرو");
	const [isAPIFetching, setIsAPIFetching] = useState(false)

	useEffect(() => {

		const correctionWords = getMistakesInText(initialText, fixedParagraph);
		setCorrections(correctionWords);

	}, [fixedParagraph])


	return (
		<div className="MainBody">
			<div className="MainLogoImageDiv">
				<img src={Logo} alt="Qawaid" className='MainLogoImage' />
				قواعد
			</div>
			<TextBox
				initialText={initialText}
				setInitialText={setInitialText}
				corrections={corrections} setCorrections={setCorrections}
				fixedParagraph={fixedParagraph}
				setFixedParagraph={setFixedParagraph}
				isAPIFetching={isAPIFetching}
				setIsAPIFetching={setIsAPIFetching}
			/>
			<Corrections
				corrections={corrections}
				setCorrections={setCorrections}
				fixedParagraph={fixedParagraph}
				setFixedParagraph={setFixedParagraph}
				isAPIFetching={isAPIFetching}
				setIsAPIFetching={setIsAPIFetching}

			/>
		</div>
	)
}

export default App
