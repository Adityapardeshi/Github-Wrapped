import './Home.css'    
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faTerminal, faCodeCommit, faFileCode, faFile, faLaptopCode, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import {faGithub,faGitAlt} from "@fortawesome/free-brands-svg-icons";

export function Home(){
    return(
        <>
            <div className="candy-background">
                <div className="floating-elements ">
                    <FontAwesomeIcon className="floating-icon icon-1" icon={faCode} />
                    <FontAwesomeIcon icon={faGithub} className="floating-icon icon-2"/>
                    <FontAwesomeIcon icon={faFileCode} className="floating-icon icon-3"/>
                    <FontAwesomeIcon icon={faCodeCommit} className="floating-icon icon-4"/>
                    <FontAwesomeIcon icon={faGitAlt} className="floating-icon icon-5"/>
                </div>
            </div>

            <div className="pt-30 instrument-font grid place-items-center">
                <p className='pb-5'><FontAwesomeIcon icon={faLaptopCode}/> GitWrapped '26</p>
                <p className='pt-10 text-center text-7xl'>Your year <br></br>in code.</p>
                <p className='pt-5 instrument-font-light text-center'>Discover your top languages, most active repositories, and coding<br></br> habits of 2026.</p>
            </div>

            <div className='text-center flex-col pt-10'>
                <input type='text' className=' shadow-lg bg-white  h-8 row text-center border-2 rounded-2xl w-75' placeholder='@ username'></input>
                <button className='shadow row bg-pink-300 rounded-2xl mx-2 h-8 w-25'>Submit </button>
            </div>
        </>
    )
}