export function Commits ({data}) {
    return(
    <div className="glass-card card items-center justify-content-center">
                {data.map((card, index) => (
                    <>
                    <div className="card card-title text-sm" style={{color: 'var(--secondary)'}}>
                        {card.title}
                    </div>
                    <div className="card-body text-6xl" style={{color: 'var(--primary)'}}>
                        {card.heading}
                    </div>
                    <div className="card-body font-normal text-sm" style={{color: 'var(--neutral)'}}>
                        <p>{card.desc}</p>
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
                            <p style={{ color: 'var(--tertiary)', margin: 0, fontWeight: 700 }}>{card.data[0][1]}</p>
                            <p className="text-xs" style={{ color: 'var(--muted)', margin: 0 }}>{card.data[0][2]}</p>
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
                            <p style={{ color: 'red', margin: 0, fontWeight: 700 }}>{card.data[1][1]}</p>
                            <p className="text-xs" style={{ color: 'var(--muted)', margin: 0 }}>{card.data[1][2]}</p>
                        </div>
                    </div>
                    </>
                ))}
            </div>
    )

}