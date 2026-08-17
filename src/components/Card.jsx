import './Card.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export function Card(){
    return(
        <>  
        <div className="flex flex-col items-center justify-center mt-28">
            <div className="glass-card card items-center justify-content-center">
                <div className="card card-title text-sm" style={{color: 'var(--secondary)'}}>
                    THE NUMBERS
                </div>
                <div className="card-body text-6xl" style={{color: 'var(--primary)'}}>
                    2,450
                </div>
                <div className="card-body font-normal text-sm" style={{color: 'var(--neutral)'}}>
                    <p>Total Commits in 2026</p>
                </div>
                <div className="metric-item grid grid-cols-[40px_1fr] items-center gap-2 mt-5 p-2">
                    <div
                        style={{
                            background: 'var(--tertiary)',
                            color: 'white',
                            width: '33px',
                            height: '33px',
                            borderRadius: '9999px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px',
                            fontWeight: 300,
                            lineHeight: 1,
                        }}
                    >
                        +
                    </div>
                    <div>
                        <p style={{ color: 'var(--tertiary)', margin: 0, fontWeight: 700 }}>143k</p>
                        <p className="text-xs" style={{ color: 'var(--muted)', margin: 0 }}>Additions</p>
                    </div>
                </div>
                <div className="metric-item grid grid-cols-[40px_1fr] items-center gap-2 mt-5 p-2">
                    <div
                        style={{
                            color: 'red',
                            width: '33px',
                            height: '33px',
                            borderRadius: '9999px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px',
                            fontWeight: 300,
                            lineHeight: 1,
                            background: '#FFD8E8'
                        }}
                    >
                        -
                    </div>
                    <div>
                        <p style={{ color: 'red', margin: 0, fontWeight: 700 }}>84k</p>
                        <p className="text-xs" style={{ color: 'var(--muted)', margin: 0 }}>Deletions</p>
                    </div>
                </div>
            </div>

            <div className="mt-5 flex items-center justify-center gap-4">
                <button className="rounded-full border border-white/80 bg-white/20 px-4 py-2 text-sm font-medium text-(--neutral) backdrop-blur-sm transition hover:bg-white/30 mx-14">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button className="rounded-full bg-[var(--primary)] px-5 py-2 text-sm font-medium text-white shadow-lg transition hover:opacity-90 mx-14 hover:bg-pink-300 hover:text-pink-500">
                    Next
                </button>
            </div>
        </div>
        
        
        </>
    )
}