import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Card = () => {
    const cardRef = useRef(null);
    
    const sampleNotes = [
        { id: 1, name: "Meeting Notes", date: "15/12/25" },
        { id: 2, name: "Project Ideas", date: "14/12/25" },
        { id: 3, name: "Shopping List", date: "13/12/25" }
    ];

    useGSAP(() => {
        const cards = document.querySelectorAll('.note-card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    scale: 1.05,
                    y: -15,
                    x: 20,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    scale: 1,
                    y: 0,
                    x: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    })

    return (
        <>
            {sampleNotes.map((note) => (
                <div
                    key={note.id}
                    ref={cardRef}
                    className='note-card bg-card/40 backdrop-blur-sm p-4 w-full rounded-xl text-lg font-medium text-foreground shadow-lg flex flex-col gap-8 overflow-visible hover:z-100 transition-z-index hover:bg-card/60'
                >
                    <div>
                        <h3 className='text-foreground text-2xl'>{note.name}</h3>
                    </div>
                    <div>
                        <p className='text-secondary'>{note.date}</p>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Card
