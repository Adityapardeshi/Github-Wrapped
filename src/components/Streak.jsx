export function Streak(){
    return(
        <>
            <div className="glass-card card items-center justify-content-center">
                    <div className="card card-title mt-5 text-sm" style={{color: 'var(--secondary)'}}>
                        THE STREAK
                    </div>
                    <div className="card-body text-5xl" style={{color: 'var(--primary)'}}>
                        42 Days
                    </div>
                    <div className="card-body font-normal text-sm" style={{color: 'var(--neutral)'}}>
                        <p>You were on fire&#128293;</p>
                    </div>
                    
                    <div class="grid grid-cols-7 gap-2 mt-5 opacity-80 interactive-selected" data-interactive-reposition="" data-interactive-label="Selected">

                        {/* Row 1 */}
                        <div className="aspect-square rounded bg-pink-200" />
                        <div className="aspect-square rounded bg-pink-300" />
                        <div className="aspect-square rounded bg-pink-400" />
                        <div className="aspect-square rounded bg-pink-500" />
                        <div className="aspect-square rounded bg-pink-500" />
                        <div className="aspect-square rounded bg-pink-600" />
                        <div className="aspect-square rounded bg-pink-500" />

                        {/* Row 2 */}
                        <div className="aspect-square rounded bg-pink-300" />
                        <div className="aspect-square rounded bg-pink-400" />
                        <div className="aspect-square rounded bg-pink-500" />
                        <div className="aspect-square rounded bg-pink-600" />
                        <div className="aspect-square rounded bg-pink-600" />
                        <div className="aspect-square rounded bg-pink-500" />
                        <div className="aspect-square rounded bg-pink-300" />

                        {/* Row 3 */}
                        <div className="aspect-square rounded bg-pink-100" />
                        <div className="aspect-square rounded bg-pink-100" />
                        <div className="aspect-square rounded bg-pink-300" />
                        <div className="aspect-square rounded bg-pink-400" />
                        <div className="aspect-square rounded bg-pink-300" />
                        <div className="aspect-square rounded bg-pink-100" />
                        <div className="aspect-square rounded bg-pink-100" />
                    </div>
                </div>
        </>
    )
}