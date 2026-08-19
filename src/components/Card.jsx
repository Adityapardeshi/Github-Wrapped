import './Card.css'
import { Commits } from './Cards/Commits'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Streak } from './Streak'


export function Card(){

    const data = [
        {
            "title" : "THE NUMBERS",
            "heading" : "2,450",
            "desc" : "Total Commits in 2026",
            "data" : [
                {
                "1" :"143k",
                "2": "Additions"},
                {
                 "1" : "84k",
                  "2" : "Deletions"
                }
            ]
        }
    ]

    return(
        <>  
        <div className="flex flex-col items-center justify-center mt-28" >
            <Commits data = {data}/>
            <Streak/>

            <div className="mt-5 flex items-center justify-center gap-4">
                <button className="rounded-full border border-white/80 bg-white/20 px-4 py-2 text-sm font-medium text-(--neutral) backdrop-blur-sm transition hover:bg-white/30 mx-14">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button className="rounded-full bg-(--primary) px-5 py-2 text-sm font-medium text-white shadow-lg transition hover:opacity-90 mx-14 hover:bg-pink-300 hover:text-pink-500">
                    Next
                </button>
            </div>
        </div>
        
        
        </>
    )
}
